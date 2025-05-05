# utils/test_nl_processor.py

from utils.natural_language_processor import process_natural_language_query

def test_query():
    # Các câu truy vấn ví dụ để test
    test_queries = [
        "tôi có thể liên lạc với bạn nguyên ngọc duy bằng cách nào",
        # "Ai đã từng làm việc tại Google?",
        # "Cho tôi danh sách ứng viên có bằng đại học",
        # "Tôi có thể liên lạc với ứng viên Nguyễn Minh Hải bằng cách nào?"
    ]

    # Thực hiện từng câu truy vấn và in kết quả
    for query in test_queries:
        print(f"\n--- Testing query: '{query}' ---")
        
        result = process_natural_language_query(query)
        
        print("SQL Query:", result.get("sql_query"))
        print("\nRaw Results:", result.get("raw_results"))
        print("\nFormatted Response:", result.get("response"))
        
        if "error" in result:
            print("\nERROR:", result.get("error"))
        
        print("\n" + "-"*50)

if __name__ == "__main__":
    test_query()