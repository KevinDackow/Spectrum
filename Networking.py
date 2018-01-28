import json

import requests
from datetime import datetime, date, time, timedelta

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

################################### API Definitions ############################################
first_groupAPIs = "https://newsapi.org/v2/everything?sources=abc-news,al-jazeera-english,associated-press,bbc-news,bloomberg,breitbart-news,business-insider,cbs-news,cnn,daily-mail,entertainment-weekly,espn,financial-post,financial-times,fortune,fox-news,hacker-news,independent,medical-news-today,msnbc&from={0}&pageSize=100&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=1)).isoformat())

second_groupAPIs = "https://newsapi.org/v2/everything?sources=national-geographic,nbc-news,new-york-magazine,new-york-times,politico,reuters,techcrunch,techradar,the-economist,the-guardian-uk,the-huffington-post,the-telegraph,the-verge,-the-wall-street-journal,the-washington-post,usa-today,vice-news,wired&pageSize=100&from={0}&apiKey=c98f2be3bafc441bb170235cba31516b".format((datetime.utcnow() - timedelta(hours=1)).isoformat())


############################ operational code ################################
hosts = [first_groupAPIs, second_groupAPIs] #, aljazeeraAPI, associatedpressAPI, bbcAPI, bloombergAPI, breitbartAPI, businessinsiderAPI, cbsAPI, cnnAPI, dailymailAPI, entertainmentweeklyAPI, espnAPI, financialpostAPI, financialtimesAPI, fortuneAPI, foxnewsAPI, hackernewsAPI, independentAPI, medicalnewstodayAPI, msnbcAPI, nationalgeographicAPI, nbcAPI, newyorkmagazineAPI, nytimesAPI, politicoAPI, reutersAPI, techcrunchAPI, techradarAPI, economistAPI, guardianAPI, huffpostAPI, telegraphAPI, vergeAPI, wsjAPI, washpostAPI, usatodayAPI, viceAPI, wiredAPI]

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

def firebase_send(json_info): 
    # if it doesn't work, don't do it!
    if not json_info['status'] == 'ok':
        print(json_info)
        return
    #get source -> name from JSON
    source = json_info['articles'][0]["source"]["name"]
    for article in json_info['articles']:
        i = 0
        for doc in db.collection("raw").where('title', '==', article['title']).get():
            i += 1
        if i == 0:
            doc_ref = db.collection("raw").add(article)
        else:
            print("Already in db")
# Retrieves all JSON objects from list of news APIs and sends them to firebase
# List<String> -> ()
def main():
    for api in hosts:
        firebase_send(get_json(api))

main()
