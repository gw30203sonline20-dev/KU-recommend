const courses = [
  {
    id: 1,
    name: "우주의 이해",
    code: "GENT121",
    professor: "김은하 교수",
    credit: 3,
    category: "자연과학",
    rating: 4.8,
    description: "우주의 탄생부터 현대 우주론까지, 광활한 우주의 신비를 과학적이고 직관적으로 탐구합니다.",
    tags: ["조별과제없음", "시험없음", "오전수업", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT121&cour_cls=00"
  },
  {
    id: 2,
    name: "현대사회와 심리학",
    code: "GENT141",
    professor: "박마음 교수",
    credit: 3,
    category: "철학",
    rating: 4.5,
    description: "다양한 심리학 이론을 통해 현대인의 심리 상태와 대인 관계 갈등을 분석하고 해결책을 모색합니다.",
    tags: ["조별과제있음", "절대평가", "저녁수업"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT141&cour_cls=00"
  },
  {
    id: 3,
    name: "대중음악의 역사와 이해",
    code: "GENT152",
    professor: "이선율 교수",
    credit: 2,
    category: "예술",
    rating: 4.9,
    description: "20세기 재즈부터 현대 K-POP까지 대중음악의 변천사를 듣고 분석하며 감상하는 즐거운 교양 수업입니다.",
    tags: ["조별과제없음", "시험없음", "저녁수업", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT152&cour_cls=00"
  },
  {
    id: 4,
    name: "창의적 글쓰기 워크숍",
    code: "GENT105",
    professor: "최문학 교수",
    credit: 3,
    category: "인문",
    rating: 4.2,
    description: "에세이, 시, 소설 등 다양한 장르의 글을 직접 창작하고 합평하며 나만의 문체를 다듬어 나갑니다.",
    tags: ["조별과제없음", "절대평가", "1교시"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT105&cour_cls=00"
  },
  {
    id: 5,
    name: "기초 파이썬 프로그래밍",
    code: "GENT231",
    professor: "정코딩 교수",
    credit: 3,
    category: "컴퓨터공학",
    rating: 4.7,
    description: "비전공자를 대상으로 코딩의 기본 개념부터 간단한 데이터 분석까지 쉽고 재미있게 실습합니다.",
    tags: ["조별과제없음", "절대평가", "시험없음", "오전수업"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT231&cour_cls=00"
  },
  {
    id: 6,
    name: "글로벌 비즈니스 영어",
    code: "GENT112",
    professor: "Sarah Evans 교수",
    credit: 2,
    category: "외국어",
    rating: 4.4,
    description: "실제 비즈니스 현장에서 사용되는 이메일 작성법, 프레젠테이션 기법 등을 실무 중심으로 배웁니다.",
    tags: ["조별과제있음", "1교시", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT112&cour_cls=00"
  },
  {
    id: 7,
    name: "생활 속의 화학 물질",
    code: "GENT203",
    professor: "강원소 교수",
    credit: 3,
    category: "자연과학",
    rating: 4.1,
    description: "일상생활에서 흔히 접하는 세제, 화장품, 식품첨가물 속의 화학 원리를 이해하고 안전한 사용법을 학습합니다.",
    tags: ["조별과제없음", "오전수업", "절대평가"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT203&cour_cls=00"
  },
  {
    id: 8,
    name: "동양 철학의 산책",
    code: "GENT161",
    professor: "임노장 교수",
    credit: 3,
    category: "철학",
    rating: 4.6,
    description: "공자, 노자, 장자 등 동양 철학자들의 사상을 통해 바쁜 현대 삶을 성찰하고 마음의 여유를 찾습니다.",
    tags: ["조별과제없음", "시험없음", "1교시", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT161&cour_cls=00"
  },
  {
    id: 9,
    name: "영화 속의 현대 역사",
    code: "GENT182",
    professor: "한필름 교수",
    credit: 3,
    category: "인문",
    rating: 4.7,
    description: "세계사의 주요 사건들을 다룬 명작 영화들을 감상하고 당시 시대상과 역사적 쟁점을 비판적으로 토론합니다.",
    tags: ["조별과제있음", "절대평가", "저녁수업", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT182&cour_cls=00"
  },
  {
    id: 10,
    name: "생활 법률과 권리 구제",
    code: "GENT191",
    professor: "정정의 교수",
    credit: 2,
    category: "인문",
    rating: 4.3,
    description: "부동산 계약, 근로 계약, 저작권 등 일상에서 반드시 알아야 할 법률 지식과 권리 침해 시 대처법을 배웁니다.",
    tags: ["조별과제없음", "시험없음", "저녁수업"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT191&cour_cls=00"
  },
  {
    id: 11,
    name: "알고리즘과 문제 해결",
    code: "GENT244",
    professor: "오배움 교수",
    credit: 3,
    category: "컴퓨터공학",
    rating: 4.8,
    description: "다양한 알고리즘 기법을 이해하고 실생활의 복잡한 문제들을 컴퓨터 프로그래밍을 통해 효과적으로 해결합니다.",
    tags: ["조별과제있음", "시험없음", "오전수업", "명강"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT244&cour_cls=00"
  },
  {
    id: 12,
    name: "서양 미술의 이해",
    code: "GENT155",
    professor: "홍화가 교수",
    credit: 2,
    category: "예술",
    rating: 4.6,
    description: "르네상스부터 현대미술까지 서양 미술사의 흐름과 거장들의 작품 세계를 깊이 있게 감상합니다.",
    tags: ["조별과제없음", "절대평가", "오전수업", "시험없음"],
    link: "https://sugang.korea.ac.kr/syllabus.jsp?year=2026&term=1R&cour_cd=GENT155&cour_cls=00"
  }
];

if (typeof window !== 'undefined') {
  window.courses = courses;
}
