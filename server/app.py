from fastapi import FastAPI

from . import api


app = FastAPI(
    title="ITHolodos API",
    description="ITHolodos service",
    version="1.0.0",
)

app.include_router(api.router)
