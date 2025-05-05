import json
import re
from .gemini_client import LLMService
from typing import Dict, Any
from langchain.prompts import PromptTemplate
from langchain.chains.llm import LLMChain 
from .prompt_template import CV_ANALYZER_PROMPT
from config.settings import get_settings

settings = get_settings()

class CVParser:
    
    def __init__(self):
        llm_service = LLMService()
        self.llm = llm_service.get_model()

    def clean_llm_prefixjson(self, text: str) -> str:
        """Loại bỏ markdown code block tags"""
        return re.sub(r"^```json\s*|\s*```$", "", text.strip(), flags=re.MULTILINE)

    def get_llm_chain(self) -> LLMChain:
        prompt = PromptTemplate(input_variables=['full_text'], template=CV_ANALYZER_PROMPT)
        chain = prompt | self.llm
        return chain 
    
    def process_cv_text(self, full_text: str) -> Dict[str, Any]:
        chain = self.get_llm_chain()
        result = chain.invoke({'full_text': full_text})
        result = str(result.content)
        result = self.clean_llm_prefixjson(result)
        try:
            candidate_data = json.loads(result)
            return candidate_data
        except json.JSONDecodeError as e:
            raise ValueError(f"lỗi khi parse JSON từ LLM: {e}\nOutput:\n{result}") 
        
cv_parser = CVParser()