from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from utils.natural_language_processor import process_natural_language_query 


chat_router = APIRouter()

class ChatRequest(BaseModel):
    query: str 

class ChatResponse(BaseModel):
    query: str
    sql_query: Optional[str] = None
    raw_results: Optional[Any] = None
    response: Optional[str] = None
    error: Optional[str] = None

@chat_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest = Body(...)):
    result = process_natural_language_query(request.query)
    return result