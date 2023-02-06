"""Config of the server part"""
import os

from dotenv import load_dotenv

from loguru import logger


if not load_dotenv("app/.env"):
    logger.critical("Add .env file to the directory")
    if not load_dotenv("server/.env"):
        logger.critical("Add .env file to the directory 2")
    else:
        logger.success("OK 2")
else:
    logger.success("OK 1")


SPOONCULAR_KEY = os.getenv("SPOONCULAR_KEY")
