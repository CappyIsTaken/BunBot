from instagrapi import Client
from instagrapi.exceptions import LoginRequired
import os
import sys
import requests

def login_user():
    cl = Client()
    session = cl.load_settings("session.json")
    login_via_session = False
    login_via_pw = False

    if session:
        try:
            cl.set_settings(session)
            cl.login(os.getenv("INSTA_USERNAME"), os.getenv("INSTA_PASSWORD"))
            try:
                cl.get_timeline_feed()
            except LoginRequired:
                old_session = cl.get_settings()
                cl.set_settings({})
                cl.set_uuids(old_session["uuids"])
                cl.login(os.getenv("INSTA_USERNAME", "INSTA_PASSWORD"))
            login_via_session = True
        except Exception as e:
            print(e)
            return
    if not login_via_session:
        try:
            if cl.login(os.getenv("INSTA_USERNAME"), os.getenv("INSTA_PASSWORD")):
                login_via_pw = True
        except Exception as e:
            print(e)
            return
    
    if not login_via_pw and not login_via_session:
        print("Couldn't login into account!")
        return
    return cl

def main():
    try:
        url = sys.argv[1]
        cl = login_user()
        if cl:
            video_url = cl.media_info(cl.media_pk_from_url(url)).video_url
            print(video_url)
    except IndexError:
        print("No url found!")

main()