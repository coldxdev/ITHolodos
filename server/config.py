"""Config of the server part"""
import os

from dotenv import load_dotenv

from loguru import logger


if not load_dotenv():
    logger.critical("Add .env file to the directory")


SPOONCULAR_KEY = os.getenv("SPOONCULAR_KEY")
