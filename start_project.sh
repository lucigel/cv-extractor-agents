@echo off
echo Starting CV Extractor project...

start cmd /k "cd backend && cv_extractor\Scripts\activate && uvicorn main:app --reload --port 5000"
start cmd /k "cd frontend && npm start"

echo Project started successfully!