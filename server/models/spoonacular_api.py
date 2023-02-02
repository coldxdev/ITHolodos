"""Schema for API models"""
from pydantic import BaseModel


class Message404JsonSchema(BaseModel):
    """
    Json schema of informational object
    """
    status: str
    code: str
    message: str
