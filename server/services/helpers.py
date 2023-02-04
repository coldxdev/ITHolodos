""" Helper functions for services"""
from typing import List
from urllib.parse import urlparse

from loguru import logger
from pydantic.types import Json

from ..models.spoonacular_api import Message404JsonSchema


def filter_keys(keys: List[str], target: Json) -> dict:
    """
    Filters dict from unnecessary keys
    :param keys: Listr[str] keys which we want to remain
    :param target:
    :return:
    """
    return {key: target[key] for key in keys}


def check_404_message_json(obj: Json) -> bool:
    """
    Checks if a JSON is a valid Message404JsonSchema
    :param obj: Json which we want to check
    :return: bool
    """
    try:
        Message404JsonSchema.parse_obj(obj.json())
        return True
    except Exception as ex:
        logger.debug(ex)
        return False


def is_url(url: str) -> bool:
    """
    Checks if a string is valid url
    :param url: str
    :return: bool
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False


def update_img_link(img_name: str,
                    img_link_pattern: str) -> str:
    """
    Updates image link by image
    name and img_link_pattern
    :param img_link_pattern: pattern for url
    :param img_name: Image name
    :return: Image url
    """
    return img_link_pattern.format(img_name=img_name)
