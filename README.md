# 온라인 쇼핑 플랫폼

이 프로젝트는 풀 스택 온라인 쇼핑 플랫폼으로, 백엔드와 프론트엔드가 포함되어 있습니다. 사용자는 제품을 검색하고 장바구니를 관리하며 결제를 처리할 수 있으며, 관리자는 제품 및 사용자 관리를 수행할 수 있습니다.

## 디렉토리 구조

### 백엔드 (`/backend`)

- **환경 설정**: `.env`
- **패키지 관리**: `package.json`, `package-lock.json`
- **소스 코드**: `src/index.js`
- **미들웨어**: `auth.js`
- **모델**: `Payment.js`, `Product.js`, `User.js`
- **라우트**: `products.js`, `users.js`
- **업로드**: 제품 이미지 저장 디렉토리

### 프론트엔드 (`/frontend`)

- **설정**: `.env`
- **컴포넌트**: 재사용 가능한 UI 컴포넌트
- **페이지**: `CartPage`, `DetailProductPage`, `HistoryPage`, `LandingPage`, `LoginPage`, `RegisterPage`, `QnAPage`, `ReviewPage`
- **스토어**: Redux 관련 파일
- **레이아웃**: `Footer`, `Navbar`
- **유틸리티**: Axios 설정 및 유틸리티 함수

### 관리자 프론트엔드 (`/frontend_admin`)

- **설정**: `.env`
- **컴포넌트**: 관리자용 UI 컴포넌트
- **페이지**: `UploadProductPage`, `DetailProductPage`, `HistoryPage`, `LandingPage`, `RegisterPage`
- **스토어**: Redux 관련 파일

## 설정 방법

### 백엔드

1. `backend` 디렉토리로 이동
2. `npm install` 실행
3. `.env.example`을 참고하여 `.env` 파일 설정
4. `npm start` 명령으로 서버 시작

### 프론트엔드

1. `frontend` 디렉토리로 이동
2. `npm install` 실행
3. `.env.example`을 참고하여 `.env` 파일 설정
4. `npm start` 명령으로 개발 서버 시작

### 관리자 프론트엔드

1. `frontend_admin` 디렉토리로 이동
2. `npm install` 실행
3. `.env.example`을 참고하여 `.env` 파일 설정
4. `npm start` 명령으로 개발 서버 시작

## 주요 기능

- **사용자 인증**: JWT를 사용한 안전한 로그인 및 회원가입
- **제품 관리**: 제품 검색, 필터링 및 관리
- **장바구니**: 제품 추가 및 관리
- **주문 내역**: 이전 주문 확인
- **관리자 기능**: 제품 및 사용자 쿼리 관리를 위한 관리자 전용 페이지

## 기술 스택

- **백엔드**: Node.js, Express.js, MongoDB
- **프론트엔드**: React, Redux
- **인증**: JWT
- **기타**: Axios, Mongoose

---

# Naver 쇼핑 제품 스크래퍼 및 AI 설명 생성기

이 Python 스크립트는 Naver 쇼핑에서 상품을 검색하고, 해당 상품의 정보를 스크래핑한 후 AI를 사용하여 상품 설명을 생성합니다.

## 주요 기능

1. Naver 쇼핑에서 사용자 입력 키워드로 상품 검색
2. 검색된 상품의 정보 (제목, 가격, 세부 정보) 추출
3. 한국어 텍스트를 영어로 번역
4. 상품 이미지 다운로드
5. OpenAI GPT-3.5를 사용하여 상품 설명 생성
6. 생성된 설명을 텍스트 파일로 저장

## 사용된 라이브러리

- `BeautifulSoup`: HTML 파싱
- `requests`: 웹 요청 처리
- `openai`: OpenAI GPT-3.5 API 사용
- `googletrans`: 한국어-영어 번역

## 설치 방법

1. 필요한 라이브러리 설치:
    ```bash
    pip install beautifulsoup4 requests openai googletrans
    ```
2. OpenAI API 키를 코드 내 `openai.api_key = "YOUR OPENAI API KEY"` 부분에 입력

## 사용 방법

1. 스크립트를 실행합니다.
2. 검색하고자 하는 상품명을 입력합니다 (한국어 권장).
3. 스크립트가 자동으로 상품 정보를 검색하고 AI 설명을 생성합니다.
4. 생성된 정보는 지정된 경로에 이미지와 텍스트 파일로 저장됩니다.

## 주요 기능 설명

- `translate_korean_to_english()`: 한국어 텍스트를 영어로 번역
- 웹 스크래핑: Naver 쇼핑에서 상품 정보 추출
- 이미지 다운로드: 상품 이미지를 로컬에 저장
- AI 설명 생성: OpenAI GPT-3.5를 사용하여 상품 설명 생성
