"""Schema for Ingredient models"""
from typing import List

from pydantic import (
    BaseModel,
    HttpUrl,
    Field,
)


class IngredientShortInfo(BaseModel):
    """
    Json schema of ingredient shorten info
    """
    id: int
    name: str
    image: HttpUrl


class IngredientExtendedInfo(BaseModel):
    """
    Json schema of ingredient extended info
    """
    id: int
    name: str
    units: List[str] = Field(alias="possibleUnits")
    categories: List[str] = Field(alias="categoryPath")
    image: HttpUrl
