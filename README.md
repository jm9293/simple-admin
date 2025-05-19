# Simple Admin - 사전과제

Next.js, TypeScript, Tailwind CSS를 활용한 사용자 정보 조회 사전과제입니다.

## 프로젝트 개요

이 프로젝트는 사용자 정보를 서버에서 가져와 보여주고 수정, 삭제 할 수 있는 기능을 제공합니다.

## 주요 기능

### 사용자 목록 조회 (/users)

- 이름, 이메일, ID 검색 타입과 검색어, 활성 상태 필터링
- 페이지당 표시 항목 수 조절 가능
- 초기 로딩은 서버 컴포넌트로 SEO 최적화
- 이후 상호작용은 클라이언트에서 axios를 통한 프록시 라우트 활용
- 하이브리드 렌더링 방식으로 SEO와 사용자 경험 모두 최적화

### 사용자 상세 조회 (/users/[id]) ㅇ
- 사용자 목록에서 해당하는 사용자 ROW에 상세보기 버튼으로 접근
- 서버 컴포넌트로 구현하여 빠른 데이터 로딩 및 SEO 최적화

### 사용자 수정 및 삭제 (/users/[id]/edit)

- 사용자 상세 페이지에서 수정 및 삭제 버튼으로 접근
- 클라이언트 컴포넌트로 구현
- 삭제 시 확인 모달로 삭제의사 확인 후 API 요청 처리

### 기술 스택

- **프레임워크**: Next.js
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **테스트**: Storybook
- **API 통신**: Fetch API, Axios

## 프로젝트 구조

```
src/
├── api/                # API 클라이언트 및 서버 관련 코드
│   ├── client/         # 클라이언트 사이드 API 호출
│   └── server/         # 서버 사이드 API 처리
├── app/                # Next.js 앱 라우터
│   ├── layout.tsx      # 레이아웃 컴포넌트
│   ├── page.tsx        # 메인 페이지
│   └── users/          # 사용자 관련 페이지
│       ├── page.tsx    # 사용자 목록 페이지
│       └── [id]/       # 동적 라우트 (사용자 ID)
│           ├── page.tsx  # 사용자 상세 정보 페이지
│           └── edit/     # 사용자 정보 수정 페이지
├── components/         # 컴포넌트
│   ├── layout/         # 레이아웃 관련 컴포넌트
│   ├── ui/             # UI 기본 컴포넌트
│   │   ├── Button/     # 버튼 컴포넌트
│   │   ├── Card/       # 카드 컴포넌트
│   │   ├── Input/      # 입력 컴포넌트
│   │   ├── Modal/      # 모달 컴포넌트
│   │   ├── Pagination/ # 페이지네이션 컴포넌트
│   │   └── Table/      # 테이블 컴포넌트
│   └── users/          # 사용자 관련 컴포넌트
├── hooks/              # 커스텀 훅
├── lib/                # 유틸리티 함수
└── types/              # 타입 정의
```

## 설치 및 실행 방법

### 의존성 설치

```bash
# 의존성 설치
npm install
```

### 개발 모드 실행

```bash
# 개발 서버 실행
npm run dev
```

애플리케이션은 기본적으로 [http://localhost:3000](http://localhost:3000)에서 접근할 수 있습니다.

### MOCK 서버 실행

```bash
# 개발 서버 실행
npm run mock-server
```

JSON 파일 기반 MOCKUP 서버로 [http://localhost:3001](http://localhost:3000)에서 접근할 수 있습니다.
.env.local에 키가 없을 경우 서버는 http://localhost:3001에서 데이터를 접근하려 합니다.

### 스토리북 실행

```bash
# 스토리북 실행
npm run storybook
```

스토리북은 [http://localhost:6006](http://localhost:6006)에서 접근할 수 있습니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build
```

## API 연동

API 키와 인증 키는 환경 변수로 관리됩니다.

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# BASE 설정
BASE_URL=http://localhost:3000

# 인증 관련
FABRICATE_API_KEY=your-api-key
FABRICATE_AUTH_KEY=your-auth-key
```

> 참고: `.env.local` 파일은 Git에 커밋되지 않으며, 로컬 개발 환경에서만 사용됩니다.
