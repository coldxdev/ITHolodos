from pydantic import BaseModel


class MessageJsonSchema(BaseModel):
    """
    Json schema of informational object
    """
    status: str
    code: str
    message: str
