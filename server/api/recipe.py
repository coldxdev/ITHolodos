"""Introduce recipe routers"""

from fastapi import APIRouter

router = APIRouter(
    prefix='/recipes',
    tags=['recipes'],
)

