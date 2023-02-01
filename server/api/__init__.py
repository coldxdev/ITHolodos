from fastapi import APIRouter

from . import (
    ingredient,
)


router = APIRouter()
router.include_router(ingredient.router)
