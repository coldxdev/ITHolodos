from fastapi import APIRouter


router = APIRouter(
    prefix='/ingredients',
    tags=['ingredients'],
)


@router.get("/")
def get_ingredients(key_words: str):
    return {"key_words": key_words}
