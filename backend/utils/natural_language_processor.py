import re
from langchain_community.utilities import SQLDatabase
from langchain.chains.sql_database.query import create_sql_query_chain
from langchain_core.prompts.prompt import PromptTemplate
from config.settings import Settings
from sqlalchemy import create_engine

from .gemini_client import LLMService
from .prompt_template import CONVERT_SQL_PROMPT, FORMATTER_SQL_RESULT_PROMPT

settings = Settings()

engine = create_engine(settings.DATABASE_URL)
db = SQLDatabase(engine)

def process_natural_language_query(query: str):

    llm_service = LLMService()
    llm = llm_service.get_model()

    try:
        # Create prompt to convert native lanaguage to sql
        sql_conversion_prompt = PromptTemplate.from_template(
            template=CONVERT_SQL_PROMPT, 
            partial_variables={"table_info": db.get_table_info(), "top_k": "5"}
        )
        chain = create_sql_query_chain(
            llm=llm, 
            db=db, 
            prompt=sql_conversion_prompt, 
        )
        sql_query = chain.invoke({'question': query})
        sql_query = re.sub(r"```(sql)?", "", sql_query).strip()

        results = db.run(sql_query)
        # format prompt 
        format_prompt = PromptTemplate.from_template(FORMATTER_SQL_RESULT_PROMPT)
        format_chain = format_prompt | llm 
        
        results_native = format_chain.invoke({
            "query": query,
            "sql_result": results
        })

        return {
            "query": query,
            "sql_query": sql_query,
            "raw_results": results,
            "response": results_native.content
        }
    except Exception as e:
        return {
            "query": query, 
            "error": str(e)
        }
