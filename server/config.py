"""Config of the server part"""
import os
from itertools import count

from dotenv import load_dotenv
from loguru import logger
import requests


if not load_dotenv("app/.env"):
    logger.critical("Add .env file to the directory")
    if not load_dotenv("server/.env"):
        logger.critical("Add .env file to the directory 2")
    else:
        logger.success("OK 2")
else:
    logger.success("OK 1")


SPOONCULAR_KEY = os.getenv("SPOONCULAR_KEY")


def generate_api_keys():
    api_keys = []
    while True:
        for i in count(1):
            key = os.getenv(f"SPOONCULAR_KEY_{i}")
            if key:
                api_keys.append(key)
            else:
                return iter(api_keys)


def get_api_key():
    keys = generate_api_keys()
    while True:
        try:
            api_key = next(keys)
        except StopIteration as ex:
            return None

        response = requests.get("https://api.spoonacular.com/"
                                "food/ingredients/search?query=apple"
                                f"&number=1&apiKey={api_key}")
        if response.status_code == 200:
            global SPOONCULAR_KEY
            SPOONCULAR_KEY = api_key
            return SPOONCULAR_KEY
        else:
            continue
