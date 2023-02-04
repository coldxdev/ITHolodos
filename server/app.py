"""Init FastApi application"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import api

origins = ["*"]

app = FastAPI(
    title="ITHolodos API",
    description="ITHolodos service",
    version="1.0.0",
)

app.include_router(api.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
