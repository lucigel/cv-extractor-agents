from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from api.chat_routes import chat_router
from db import Base, engine

app = FastAPI(
    title="CV Extractor Agent",
    description="Upload CV, extract info using Gemini, save to PostgreSQL + S3",
    version="1.0.0"
)

# CORS cho phép frontend truy cập (React ở port khác)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # sau có thể giới hạn bằng domain cụ thể
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tự động tạo bảng DB nếu chưa có (chỉ dùng dev)
Base.metadata.create_all(bind=engine)

# Mount router
app.include_router(router)
app.include_router(chat_router)
