import boto3
from uuid import uuid4
from config.settings import get_settings

settings = get_settings()

s3_client = boto3.client(
    "s3",
    aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key= settings.AWS_SECRET_ACCESS_KEY, 
    region_name = settings.AWS_DEFAULT_REGION,
)

def upload_file_to_s3(file_data: bytes, filename:str, content_type: str) -> str:
    key = f"cv/{uuid4()}_{filename}"

    # upload file 
    s3_client.put_object(
        Bucket=settings.AWS_S3_BUCKET_NAME, 
        Key=key, 
        Body=file_data, 
        ContentType=content_type, 
    )

    file_url = f"https://{settings.AWS_S3_BUCKET_NAME}.s3.{settings.AWS_DEFAULT_REGION}.amazonaws.com/{key}"

    return file_url

