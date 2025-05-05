from pydantic.v1 import BaseSettings, Field
from functools import lru_cache 


class Settings(BaseSettings):
    # PostgreSQL 
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    # Gemini API 
    GEMINI_API_KEY: str = Field(..., env="GEMINI_API_KEY")
    GEMINI_MODEL: str = Field(..., env="GEMINI_MODEL")
    # amazon s3
    AWS_ACCESS_KEY_ID : str = Field(..., env="AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: str = Field(..., env="AWS_SECRET_ACCESS_KEY")
    AWS_S3_BUCKET_NAME: str = Field(..., env="S3_BUCKET_NAME")
    AWS_DEFAULT_REGION: str = Field(default='', env="AWS_DEFAULT_REGION")

    # Cấu hình khác 
    TESSERACT_PATH: str = Field(..., env="TESSERACT_PATH")
    DEBUG: bool = Field(default=True)

    class Config:
        env_file = ".env"

@lru_cache
def get_settings():
    return Settings()

settings_obj = Settings()