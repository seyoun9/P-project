import pandas as pd
from tensorflow import keras
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, TFBertModel

# 1️⃣ Parquet 파일 불러오기
def load_embeddings(file_path):
    """Parquet 파일에서 임베딩을 불러옵니다."""
    try:
        df = pd.read_parquet(file_path)
        print(f"✅ Parquet 파일이 정상적으로 불러와졌습니다. 데이터 수: {len(df)}")
    except FileNotFoundError:
        print(f"❌ '{file_path}' 파일이 없습니다. 파일 경로를 확인하세요.")
        return None
    except Exception as e:
        print(f"❌ 오류가 발생했습니다: {e}")
        return None
    return df

# 2️⃣ BERT 모델 및 토크나이저 로드
def load_bert_model():
    """BERT 모델과 토크나이저를 로드합니다."""
    print("🔄 BERT 모델과 토크나이저 로드 중...")
    tokenizer = BertTokenizer.from_pretrained("bert-base-multilingual-cased")
    bert_model = TFBertModel.from_pretrained("bert-base-multilingual-cased")
    print("✅ BERT 모델과 토크나이저 로드 완료!")
    return tokenizer, bert_model

# 3️⃣ BERT 임베딩 생성 함수
def get_bert_embedding(text, tokenizer, bert_model):
    """주어진 텍스트의 BERT 임베딩을 반환합니다. [CLS] 벡터만 반환합니다."""
    if pd.isna(text) or text.strip() == '':
        return np.zeros((768,))
    inputs = tokenizer(text, return_tensors="tf", padding=True, truncation=True, max_length=128)
    outputs = bert_model(inputs)
    cls_embedding = outputs.last_hidden_state[:, 0, :].numpy()  # [CLS] 벡터
    return cls_embedding[0]  # (1, 768) -> (768,)

# 4️⃣ 유사도 계산 및 책 추천
def recommend_books(user_input, df, tokenizer, bert_model, top_n=3):
    """입력된 문장과 유사한 책을 추천합니다."""
    print("🔄 입력 문장의 임베딩 생성 중...")
    user_embedding = get_bert_embedding(user_input, tokenizer, bert_model).reshape(1, -1)

    # 모든 책의 임베딩을 리스트로 변환
    book_embeddings = np.vstack(df['embedding'].values)

    # 코사인 유사도 계산
    similarities = cosine_similarity(user_embedding, book_embeddings)[0]

    # 상위 top_n개의 책 추천
    df['similarity'] = similarities
    recommendations = df.sort_values(by='similarity', ascending=False).head(top_n)
    return recommendations[['TITLE_NM', 'AUTHR_NM', 'similarity']]

# 5️⃣ 메인 실행 함수
def main():
    """전체 추천 시스템을 실행합니다."""
    # 1. Parquet 파일 경로 지정
    file_path = '/filtered_book_embeddings.parquet' ##<- filtered_book_embeding.parquet파일 주소 넣는 코드

    # 2. 데이터 불러오기
    df = load_embeddings(file_path)
    if df is None:
        return

    # 3. BERT 모델과 토크나이저 로드
    tokenizer, bert_model = load_bert_model()

    # 4. 사용자 입력 받기
    user_input = input("📘 어떤 책을 찾고 계신가요? (예: 따뜻한 감동을 주는 이야기, 흥미진진한 미스터리 등): ")
    
    # 5. 책 추천
    recommendations = recommend_books(user_input, df, tokenizer, bert_model)

    # 6. 추천 결과 출력
    print("\n🎉 추천된 책 목록:")
    print(recommendations)

# 6️⃣ 메인 함수 실행
if __name__ == "__main__":
    main()
