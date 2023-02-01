"""Introduce ingredient routers"""

from fastapi import APIRouter

from ..spoonacular_services import get_list_ingredients

router = APIRouter(
    prefix='/ingredients',
    tags=['ingredients'],
)


@router.get("/")
def get_ingredients(key_word: str):
    return get_list_ingredients(key_word)
