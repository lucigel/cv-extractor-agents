import os, sys
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAI
from config.settings import get_settings
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

settings = get_settings()

class LLMService:
     def __init__(self):
        self.model_name = settings.GEMINI_MODEL
        self.api_key = settings.GEMINI_API_KEY
        
        try:
            self.chat_model = ChatGoogleGenerativeAI(
                model=self.model_name, 
                temperature=0, 
                max_tokens=None,
                timeout=None,
                max_retries=2,
                google_api_key=self.api_key, 
            )
        except Exception as e:
            print(f"Error initializing Gemini model: {e}")
            raise

     def get_model(self):
        """Return the initialized chat model."""
        return self.chat_model
     
llm = LLMService()