from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db import SessionLocal
from utils.s3 import upload_file_to_s3
from utils.parser import text_extractor
from utils.cv_analyzer import cv_parser
from models.candidate import Candidates

router = APIRouter()

# Dependency get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/hello")
async def root():
    print("🔥 Đã gọi route GET /")
    return {"message": "Server đang chạy"}

# encpoint upload file cv pdf
@router.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    print("✅ Bắt đầu đọc file")
    file_bytes = await file.read()
    print("✅ Uploading to S3...")
    s3_url = upload_file_to_s3(file_bytes, file.filename, file.content_type)
    print("✅ Extracting text from PDF")
    cv_text = text_extractor.extract_from_pdf_bytes(file_bytes)
    print("✅ Parsing extracted text")
    info = cv_parser.process_cv_text(cv_text)
    print("🧾 Parsed info:", info)
    if "error" in info:
        return {"error": "Không trích xuất được thông tin từ CV."}

    # Lưu thông tin vào PostgreSQL
    candidate = Candidates(
        name=info.get("name"),
        email=info.get("email"),
        phone=info.get("phone"),
        skills=", ".join(info.get("skills", [])),
        education=info.get("education"),
        experience=info.get("experience"),
        cv_url=s3_url
    )
    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return {
        "message": "CV uploaded & processed successfully",
        "candidate_id": candidate.id,
        "info": info
    }

# endpoint take candidate
@router.get("/candidates")
def get_candidates(db: Session = Depends(get_db)):
    candidates = db.query(Candidates).all()
    return candidates

@router.get("/candidates/{candidate_id}")
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    candidate = db.query(Candidates).filter(Candidates.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate


