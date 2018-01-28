import pymysql.cursors
import json
import requests
from datetime import datetime, date, time, timedelta
################################### API Definitions ############################################
hours_to_refresh = 24

first_groupAPIs = "https://newsapi.org/v2/everything?sources=abc-news,al-jazeera-english,associated-press,bbc-news,bloomberg,breitbart-news,business-insider,cbs-news,cnn,daily-mail,entertainment-weekly,espn,financial-post,financial-times,fortune,fox-news,hacker-news,independent,medical-news-today,msnbc&from={0}&pageSize=100&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=hours_to_refresh)).isoformat())

second_groupAPIs = "https://newsapi.org/v2/everything?sources=national-geographic,nbc-news,new-york-magazine,new-york-times,politico,reuters,techcrunch,techradar,the-economist,the-guardian-uk,the-huffington-post,the-telegraph,the-verge,-the-wall-street-journal,the-washington-post,usa-today,vice-news,wired&pageSize=100&from={0}&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=hours_to_refresh)).isoformat())


############################ operational code ################################

hosts = [second_groupAPIs]

db=pymysql.connect(user="root",password="hack@brown",host="35.227.79.121",database="articles")
c=db.cursor()

# () -> URL (Str)
# output = a website's JSON
def get_json(api):
    response = requests.get(api)
    x = 2
    i = response.json()["totalResults"]
    master_list = response.json()
    while i > 100:
        master_list["articles"] += requests.get(api + "&page={0}".format(x)).json()["articles"]
        i += -100
        x += 1
    return master_list

def sanitize(stri):
    if stri is None:
        return None
    else:
        return stri.encode("utf-8")

def sql_send(json_info):
    if not json_info['status'] == 'ok':
        print(json_info)
        return
    #get source -> name from JSON
    source = json_info['articles'][0]["source"]["name"]
    for article in json_info['articles']:
        sql = """INSERT IGNORE INTO articles.documents (author, description, publishedAt, sourceName, title, url, urlToImage) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        data = [sanitize(article['author']), sanitize(article['description']), sanitize(article['publishedAt']), sanitize(article['source']['name']), sanitize(article['title']), sanitize(article['url']), sanitize(article['urlToImage'])]
        c.execute(sql, data)
        db.commit()


# Retrieves all JSON objects from list of news APIs and sends them to firebase
# List<String> -> ()
def main():
    for api in hosts:
        sql_send(get_json(api))
    c.close()
    db.close()
main()
