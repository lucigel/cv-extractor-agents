import requests
import json

# URL API của bạn - điều chỉnh nếu cần
API_URL = "http://localhost:8000/chat"

def test_chat_api():
    # Các câu truy vấn thử nghiệm
    test_queries = [
        "Hiển thị tất cả ứng viên",
        "Tìm ứng viên có kỹ năng Python",
        "Ai có kinh nghiệm nhiều nhất về machine learning?",
        "Liệt kê 5 ứng viên mới nhất"
    ]
    
    # Thử từng câu truy vấn
    for query in test_queries:
        print(f"\n----- Kiểm tra với câu truy vấn: '{query}' -----")
        
        # Chuẩn bị payload
        payload = {"query": query}
        
        try:
            # Gửi request
            response = requests.post(API_URL, json=payload)
            
            # Kiểm tra status code
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                # In kết quả
                result = response.json()
                print("Câu truy vấn: ", result.get("query"))
                print("SQL đã tạo: ", result.get("sql_query"))
                print("Kết quả thô: ", json.dumps(result.get("raw_results"), indent=2)[:200] + "..." if result.get("raw_results") else None)
                print("Phản hồi: ", result.get("response"))
            else:
                print("Lỗi:", response.text)
                
        except Exception as e:
            print(f"Lỗi kết nối: {str(e)}")

if __name__ == "__main__":
    test_chat_api()