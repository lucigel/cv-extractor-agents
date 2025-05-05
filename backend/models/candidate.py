from sqlalchemy import Column, String, Integer, Text
from db import Base

class Candidates(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    skills = Column(Text)
    education = Column(Text)
    experience = Column(Text)
    cv_url = Column(String)
    
