import re
import os
import pytesseract
import logging
import tempfile
from typing import BinaryIO, Dict, Any
from pdf2image import convert_from_path, convert_from_bytes
from config.settings import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# Cấu hình đường dẫn Tesseract nếu có
if settings.TESSERACT_PATH:
    pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_PATH

class TextExtractor:
    """Trích xuất văn bản từ CV sử dụng Tesseract OCR"""
    
    def __init__(self):
        logger.info("Khởi tạo CV extractor")
    
    def _process_images(self, images):
        """Xử lý các hình ảnh và trích xuất văn bản"""
        full_text = ""
        for i, image in enumerate(images):
            logger.info(f"Xử lý trang {i+1}")
            text = pytesseract.image_to_string(image)
            full_text += f"\n--- Page {i+1} ---\n{text}"
        return full_text
    
    def extract_from_pdf(self, pdf_path: str) -> str:
        """Trích xuất văn bản từ file PDF"""
        try:
            images = convert_from_path(pdf_path)
            return self._process_images(images)
        except Exception as e:
            logger.error(f"Lỗi khi xử lý PDF: {e}")
            raise
    
    def extract_from_pdf_bytes(self, pdf_bytes: bytes) -> str:
        """Trích xuất văn bản từ PDF dạng bytes"""
        try:
            images = convert_from_bytes(pdf_bytes)
            return self._process_images(images)
        except Exception as e:
            logger.error(f"Lỗi khi xử lý PDF bytes: {e}")
            raise
    
    def extract_from_file(self, file: BinaryIO, filename: str) -> str:
        """Trích xuất văn bản từ file upload"""
        temp_path = None
        try:
            # Lưu file tạm
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(filename)[1]) as temp_file:
                temp_file.write(file.read())
                temp_path = temp_file.name
            
            # Trích xuất văn bản
            if filename.lower().endswith('.pdf'):
                text = self.extract_from_pdf(temp_path)
            else:
                # Giả định là file hình ảnh
                text = pytesseract.image_to_string(temp_path)
            
            return self.preprocess_text(text)
        
        except Exception as e:
            logger.error(f"Lỗi khi xử lý file: {e}")
            raise
        finally:
            # Dọn dẹp file tạm
            if temp_path and os.path.exists(temp_path):
                os.unlink(temp_path)
    
    def preprocess_text(self, text: str) -> str:
        """Làm sạch và xử lý văn bản đã trích xuất"""
        if not text:
            return ""
        
        # Định dạng lại dấu trang
        text = text.replace("--- Page", "\n--- Page")
        
        # Sửa các vấn đề OCR phổ biến
        text = text.replace("•", "* ")
        
        # Loại bỏ dòng trống thừa
        while "\n\n\n" in text:
            text = text.replace("\n\n\n", "\n\n")
        
        return text.strip()
    
text_extractor = TextExtractor()
    
    
