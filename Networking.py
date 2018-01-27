import json

import requests
import datetime

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#from google.cloud import firestore
#import google.cloud.exceptions

# Gameplan
# 1. Setup list of hostnames
# 2.
# 3. Scan through sites
# 4. Add to database:
#   - if there, update info
#   - if not there, add
#   - if something's there that's no longer hosted, delete it

################################### API Definitions ############################################
abcnewsAPI = "https://newsapi.org/v2/everything?sources=abc-news,cnn&apiKey=c98f2be3bafc441bb170235cba31516b"

aljazeeraAPI = "https://newsapi.org/v2/everything?sources=al-jazeera-english&apiKey=c98f2be3bafc441bb170235cba31516"

associatedpressAPI = "https://newsapi.org/v2/everything?sources=associated-press&apiKey=c98f2be3bafc441bb170235cba31516b"

bbcAPI = "https://newsapi.org/v2/everything?sources=bbc-news&apiKey=c98f2be3bafc441bb170235cba31516b"

bloombergAPI = "https://newsapi.org/v2/everything?sources=bloomberg&apiKey=c98f2be3bafc441bb170235cba31516b"

breitbartAPI = "https://newsapi.org/v2/everything?sources=breitbart-news&apiKey=c98f2be3bafc441bb170235cba31516b"

businessinsiderAPI = "https://newsapi.org/v2/everything?sources=business-insider&apiKey=c98f2be3bafc441bb170235cba31516b"

cbsAPI = "https://newsapi.org/v2/everything?sources=cbs-news&apiKey=c98f2be3bafc441bb170235cba31516b"

cnnAPI = "https://newsapi.org/v2/everything?sources=cnn&apiKey=c98f2be3bafc441bb170235cba31516b"

dailymailAPI = "https://newsapi.org/v2/everything?sources=daily-mail&apiKey=c98f2be3bafc441bb170235cba31516b"

entertainmentweeklyAPI = "https://newsapi.org/v2/everything?sources=entertainment-weekly&apiKey=c98f2be3bafc441bb170235cba31516"

espnAPI = "https://newsapi.org/v2/everything?sources=espn&apiKey=c98f2be3bafc441bb170235cba31516b"

financialpostAPI = "https://newsapi.org/v2/everything?sources=financial-post&apiKey=c98f2be3bafc441bb170235cba31516b"

financialtimesAPI = "https://newsapi.org/v2/everything?sources=financial-times&apiKey=c98f2be3bafc441bb170235cba31516b"

fortuneAPI = "https://newsapi.org/v2/everything?sources=fortune&apiKey=c98f2be3bafc441bb170235cba31516b"

foxnewsAPI = "https://newsapi.org/v2/everything?sources=fox-news&apiKey=c98f2be3bafc441bb170235cba31516b"

hackernewsAPI = "https://newsapi.org/v2/everything?sources=hacker-news&apiKey=c98f2be3bafc441bb170235cba31516b"

independentAPI = "https://newsapi.org/v2/everything?sources=independent&apiKey=c98f2be3bafc441bb170235cba31516b"

medicalnewstodayAPI = "https://newsapi.org/v2/everything?sources=medical-news-today&apiKey=c98f2be3bafc441bb170235cba31516b"

msnbcAPI = "https://newsapi.org/v2/everything?sources=msnbc&apiKey=c98f2be3bafc441bb170235cba31516b"

nationalgeographicAPI = "https://newsapi.org/v2/everything?sources=national-geographic&apiKey=c98f2be3bafc441bb170235cba31516b"

nbcAPI = "https://newsapi.org/v2/everything?sources=nbc-news&apiKey=c98f2be3bafc441bb170235cba31516b" 

newyorkmagazineAPI = "https://newsapi.org/v2/everything?sources=new-york-magazine&apiKey=c98f2be3bafc441bb170235cba31516b"

nytimesAPI = "https://newsapi.org/v2/everything?sources=the-new-york-times&apiKey=c98f2be3bafc441bb170235cba31516b"

politicoAPI = "https://newsapi.org/v2/everything?sources=politico&apiKey=c98f2be3bafc441bb170235cba31516b"

reutersAPI = "https://newsapi.org/v2/everything?sources=reuters&apiKey=c98f2be3bafc441bb170235cba31516b"

techcrunchAPI = "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=c98f2be3bafc441bb170235cba31516"

techradarAPI = "https://newsapi.org/v2/everything?sources=techradar&apiKey=c98f2be3bafc441bb170235cba31516b"

economistAPI = "https://newsapi.org/v2/everything?sources=the-economist&apiKey=c98f2be3bafc441bb170235cba31516b"

guardianAPI = "https://newsapi.org/v2/everything?sources=the-guardian-uk&apiKey=c98f2be3bafc441bb170235cba31516b"

huffpostAPI = "https://newsapi.org/v2/everything?sources=the-huffington-post&apiKey=c98f2be3bafc441bb170235cba31516b"

telegraphAPI = "https://newsapi.org/v2/everything?sources=the-telegraph&apiKey=c98f2be3bafc441bb170235cba31516b"

vergeAPI = "https://newsapi.org/v2/everything?sources=the-verge&apiKey=c98f2be3bafc441bb170235cba31516b"

wsjAPI = "https://newsapi.org/v2/everything?sources=the-wall-street-journal&apiKey=c98f2be3bafc441bb170235cba31516b"

washpostAPI = "https://newsapi.org/v2/everything?sources=the-washington-post&apiKey=c98f2be3bafc441bb170235cba31516b"

usatodayAPI = "https://newsapi.org/v2/everything?sources=usa-today&apiKey=c98f2be3bafc441bb170235cba31516b"

viceAPI = "https://newsapi.org/v2/everything?sources=vice-news&apiKey=c98f2be3bafc441bb170235cba31516b"

wiredAPI = "https://newsapi.org/v2/everything?sources=wired&apiKey=c98f2be3bafc441bb170235cba31516b"

############################ operational code ################################
hosts = [abcnewsAPI] #, aljazeeraAPI, associatedpressAPI, bbcAPI, bloombergAPI, breitbartAPI, businessinsiderAPI, cbsAPI, cnnAPI, dailymailAPI, entertainmentweeklyAPI, espnAPI, financialpostAPI, financialtimesAPI, fortuneAPI, foxnewsAPI, hackernewsAPI, independentAPI, medicalnewstodayAPI, msnbcAPI, nationalgeographicAPI, nbcAPI, newyorkmagazineAPI, nytimesAPI, politicoAPI, reutersAPI, techcrunchAPI, techradarAPI, economistAPI, guardianAPI, huffpostAPI, telegraphAPI, vergeAPI, wsjAPI, washpostAPI, usatodayAPI, viceAPI, wiredAPI]

# initializes firebase
cred = credentials.Certificate('hack-2018-5b7b359358e7.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# () -> URL (Str)
# output = a website's JSON
def get_json(api):
    response = requests.get(api)
    return response.json()

def firebase_send(json_info): 
    # if it doesn't work, don't do it!
    if not json_info['status'] == 'ok':
        print(json_info)
        return
    #get source -> name from JSON
    source = json_info['articles'][0]["source"]["name"]
    for article in json_info['articles']:
        if db.collection(source).where('title', '==', article['title']).get():
            doc_ref = db.collection("raw").add(article)
        else: 
            print("article already in db") 

# Retrieves all JSON objects from list of news APIs and sends them to firebase
# List<String> -> ()
def main():
    for api in hosts:
        firebase_send(get_json(api))

main()
