"""Schema for Ingredient models"""
from typing import List

from pydantic import (
    BaseModel,
    HttpUrl,
    Field,
)


class IngredientBaseInfo(BaseModel):
    """
    Json schema of ingredient shorten info
    """
    id: int
    name: str
    image: HttpUrl


class IngredientExtendedInfo(IngredientBaseInfo):
    """
    Json schema of ingredient extended info
    """
    units: List[str] = Field(alias="possibleUnits")
    categories: List[str] = Field(alias="categoryPath")
