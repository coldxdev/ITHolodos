from fastapi import APIRouter

from . import (
    ingredient,
    recipe
)


router = APIRouter()
router.include_router(ingredient.router)
router.include_router(recipe.router)
