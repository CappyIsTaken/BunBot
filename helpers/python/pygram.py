from instagrapi import Client
from dotenv import load_dotenv
import os
import sys
import requests
load_dotenv()

def main():
    try:
        url = sys.argv[1]
        cl = Client()
        cl.login(os.getenv("INSTA_USERNAME"), os.getenv("INSTA_PASSWORD"))
        video_url = cl.media_info(cl.media_pk_from_url(url)).video_url
        print(video_url)
    except IndexError:
        print("No url found!")

main()