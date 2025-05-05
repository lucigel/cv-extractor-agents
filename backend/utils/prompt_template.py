CV_ANALYZER_PROMPT = """
Trích xuất thông tin từ CV dưới đây và trả về duy nhất một JSON object. Không thêm bất kỳ giải thích, markdown, tiêu đề hay văn bản nào.

Cấu trúc JSON cần trả về:
{{
    "name": "Tên ứng viên",
    "email": "Email",
    "phone": "Số điện thoại",
    "skills": ["Kỹ năng 1", "Kỹ năng 2", ...],
    "education": "Thông tin tóm tắt về học vấn",
    "experience": "Thông tin tóm tắt về kinh nghiệm"
}}

CV cần phân tích:
-----
{full_text}
-----

CHÚ Ý QUAN TRỌNG: 
1. Chỉ trả về JSON object, không bao gồm ``` hoặc ```json
2. Không thêm bất kỳ văn bản nào trước hoặc sau JSON
3. Đảm bảo trường skills là một mảng các chuỗi
"""

CONVERT_SQL_PROMPT = """
Bạn là một chuyên gia chuyển đổi ngôn ngữ tự nhiên thành truy vấn SQL đang thực hiện trên postgresql. 
Hãy chuyển đổi câu truy vấn ngôn ngữ tự nhiên sau thành một truy vấn SQL chính xác.
Chỉ trả về câu lệnh SQL, **không thêm giải thích hay tiền tố như "sql:"**.  
Dùng cú pháp SQL chuẩn (PostgreSQL/MySQL).

Thông tin về các bảng:
{table_info}

Chỉ hiển thị tối đa {top_k} kết quả cho mỗi truy vấn SELECT.

Câu truy vấn ngôn ngữ tự nhiên: {input}

Ví dụ:
Câu truy vấn: "Tôi có thể liên lạc với ứng viên nguyễn ngọc duy bằng cách nào?"
Kết quả:
SELECT email, phone FROM candidates WHERE LOWER(name) LIKE '%nguyễn ngọc duy%' LIMIT {top_k};
"""

FORMATTER_SQL_RESULT_PROMPT = """
Bạn là một trợ lý AI thân thiện, có nhiệm vụ trình bày kết quả truy vấn SQL thành câu trả lời ngôn ngữ tự nhiên bằng tiếng Việt dễ hiểu, tự nhiên, giống cách con người nói chuyện.

Dưới đây là nội dung đầu vào:
- Câu truy vấn ban đầu của người dùng: "{query}"
- Kết quả từ truy vấn SQL (dưới dạng danh sách các dòng dữ liệu): {sql_result}

Hãy phản hồi kết quả này bằng tiếng Việt, rõ ràng và thân thiện.  
Nếu không có kết quả, hãy nói một cách lịch sự rằng không tìm thấy thông tin phù hợp.

Ví dụ:
---
Câu truy vấn: "Tôi có thể liên lạc với ứng viên nguyễn ngọc duy bằng cách nào?"
Kết quả: [{{"email": "duy.nguyen@example.com", "phone": "0901234567"}}]

Phản hồi: 
"Bạn có thể liên lạc với ứng viên Nguyễn Ngọc Duy qua email duy.nguyen@example.com hoặc số điện thoại 0901234567."
---
"""



