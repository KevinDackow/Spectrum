import json

import requests
from datetime import datetime, date, time, timedelta

################################### API Definitions ############################################
hours_to_refresh = 4

first_groupAPIs = "https://newsapi.org/v2/everything?sources=abc-news,al-jazeera-english,associated-press,bbc-news,bloomberg,breitbart-news,business-insider,cbs-news,cnn,daily-mail,entertainment-weekly,espn,financial-post,financial-times,fortune,fox-news,hacker-news,independent,medical-news-today,msnbc&from={0}&pageSize=100&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=hours_to_refresh)).isoformat())

second_groupAPIs = "https://newsapi.org/v2/everything?sources=national-geographic,nbc-news,new-york-magazine,new-york-times,politico,reuters,techcrunch,techradar,the-economist,the-guardian-uk,the-huffington-post,the-telegraph,the-verge,-the-wall-street-journal,the-washington-post,usa-today,vice-news,wired&pageSize=100&from={0}&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=hourss_to_refresh)).isoformat())


############################ operational code ################################
hosts = [first_groupAPIs, second_groupAPIs]

# initializes firebase
cred = credentials.Certificate('hack-2018-5b7b359358e7.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

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

def sql_send(json_info): 
    if not json_info['status'] == 'ok':
        print(json_info)
        return
    #get source -> name from JSON
    source = json_info['articles'][0]["source"]["name"]
    for article in json_info['articles']:
        i = 0
        #TODO check with sql
        for doc in db.collection("raw").where('title', '==', article['title']).get():
            i += 1
        if i == 0:
            #TODO send to SQL
            doc_ref = db.collection("raw").add(article)
        else:
            print("Already in db")
# Retrieves all JSON objects from list of news APIs and sends them to firebase
# List<String> -> ()
def main():
    for api in hosts:
        sql_send(get_json(api))

main()
