// 저작권 만료(사후 70년 경과) 세계 명화 100점 카탈로그 데이터셋
// 도슨트 스토리텔링 및 난이도별 그리드 포함

import { Painting } from '../types';

export const MASTERPIECES: Painting[] = [
  {
    id: 'starry-night',
    title: '별이 빛나는 밤',
    painter: {
      name: '빈센트 반 고흐',
      birthYear: 1853,
      deathYear: 1890,
      bioShort: '네덜란드 출신 후기 인상주의 거장. 강렬한 색채와 격정적인 붓터치로 영혼을 울리는 작품을 남김.'
    },
    year: '1889년',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    styleTag: '후기 인상주의',
    museum: '뉴욕 현대미술관 (MoMA)',
    isFeatured: true,
    docentStory: '고흐가 프랑스 생레미의 정신병원에 머물 당시, 병실 동쪽 창문을 통해 새벽녘에 바라본 밤하늘 풍경입니다. 꿈틀거리는 사이프러스 나무는 죽음과 영원을 상징하며, 맹렬하게 소용돌이치는 11개의 별빛과 노란 초승달은 고통 속에서도 예술을 향해 타올랐던 그의 불멸의 영혼을 보여줍니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'pearl-earring',
    title: '진주 귀걸이를 한 소녀',
    painter: {
      name: '요하네스 페르메이르',
      birthYear: 1632,
      deathYear: 1675,
      bioShort: '네덜란드 황금기의 빛의 마술사. 일상의 고요함과 투명한 빛의 입자를 포착함.'
    },
    year: '1665년경',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
    styleTag: '네덜란드 황금기',
    museum: '헤이그 마우리츠하위스 미술관',
    isFeatured: true,
    docentStory: '‘북유럽의 모나리자’로 불리는 이 걸작은 특정 인물의 초상화가 아닌, 이국적인 터번을 쓴 인물을 상상해 그린 ‘트로니(Tronie)’ 장르입니다. 깊은 어둠 속에서 살포시 뒤돌아보는 소녀의 눈빛과 반짝이는 커다란 진주 귀걸이는 단 두 번의 물방울 모양 붓질로 완성된 경이로운 빛의 결정체입니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'the-kiss',
    title: '키스',
    painter: {
      name: '구스타프 클림트',
      birthYear: 1862,
      deathYear: 1918,
      bioShort: '오스트리아 빈 분리파의 거장. 황금빛 장식성과 에로티시즘의 화려한 결합.'
    },
    year: '1907-1908년',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    styleTag: '아르누보 / 상징주의',
    museum: '비엔나 벨베데레 오스트리아 갤러리',
    isFeatured: true,
    docentStory: '꽃이 흐드러지게 핀 벼랑 끝에서 황금빛 아우라에 둘러싸인 연인의 지고지순한 사랑의 순간입니다. 클림트는 비잔틴 모자이크에서 영감을 받아 실제 금박을 캔버스에 붙였으며, 남성의 옷에는 각진 직사각형 문양, 여성의 옷에는 부드러운 동심원 꽃무늬를 배치하여 남성과 여성의 신비로운 조화를 상징했습니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'water-lilies',
    title: '수련 연못',
    painter: {
      name: '클로드 모네',
      birthYear: 1840,
      deathYear: 1926,
      bioShort: '인상파의 창시자이자 빛의 추적자. 시시각각 변화하는 자연의 빛을 포착.'
    },
    year: '1899년',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    styleTag: '인상주의',
    museum: '런던 내셔널 갤러리 / 시카고 미술관',
    isFeatured: false,
    docentStory: '지베르니에 직접 정원을 가꾸었던 모네는 일본식 초록색 아치 다리와 그 아래 흐르는 수련 연못을 250여 점이나 그렸습니다. 물 위에 떠 있는 꽃과 수면에 비친 하늘, 버드나무의 반영이 경계 없이 뒤섞여 관람객으로 하여금 마치 물속을 들여다보는 듯한 고요한 힐링을 안겨줍니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'mona-lisa',
    title: '모나리자',
    painter: {
      name: '레오나르도 다 빈치',
      birthYear: 1452,
      deathYear: 1519,
      bioShort: '르네상스를 대표하는 만능 천재. 해부학과 광학을 그림에 투영한 거장.'
    },
    year: '1503-1519년경',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    styleTag: '르네상스',
    museum: '파리 루브르 박물관',
    isFeatured: false,
    docentStory: '경계선을 안개처럼 부드럽게 번지게 하는 ‘스푸마토(Sfumato)’ 기법으로 완성된 불멸의 미소입니다. 입꼬리와 눈꼬리를 살짝 흐려 놓았기 때문에, 관람자가 그림의 어디를 바라보느냐에 따라 때로는 미소 짓고 때로는 침묵하는 듯한 신비로운 감정을 자아냅니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'great-wave',
    title: '가나가와 해변의 높은 파도 아래',
    painter: {
      name: '카츠시카 호쿠사이',
      birthYear: 1760,
      deathYear: 1849,
      bioShort: '일본 에도 시대 우키요에 판화의 대가. 모네, 고흐 등 서양 인상파 화가들에게 거대한 충격을 안김.'
    },
    year: '1831년경',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
    styleTag: '우키요에 (Ukiyo-e)',
    museum: '도쿄 국립박물관 / 메트로폴리탄 미술관',
    isFeatured: false,
    docentStory: '독일에서 수입된 프러시안 블루 안료를 사용해 거대한 파도가 마치 발톱을 세운 괴물처럼 배들을 집어삼킬 듯 솟구치는 순간을 포착했습니다. 격렬한 파도 저 멀리 고요하게 버티고 서 있는 후지산의 작고 변함없는 실루엣이 자연의 위압감과 영원함을 극적으로 대비시킵니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'sunday-afternoon',
    title: '그랑드 자트 섬의 일요일 오후',
    painter: {
      name: '조르주 쇠라',
      birthYear: 1859,
      deathYear: 1891,
      bioShort: '신인상주의 창시자. 무수한 순수 색상의 점으로 형태와 빛을 구축한 점묘법의 대가.'
    },
    year: '1884-1886년',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg',
    styleTag: '점묘주의 / 신인상주의',
    museum: '시카고 미술관',
    isFeatured: false,
    docentStory: '물감을 팔레트에서 섞지 않고 캔버스 위에 수백만 개의 순수 색점(Dot)을 찍어, 보는 사람의 눈에서 광학적으로 색이 혼합되도록 한 불후의 명작입니다. 완성하는 데만 2년이 걸렸으며, 파리 센 강변 섬에서 휴일을 즐기는 다양한 계층의 사람들을 마치 정지된 영원의 조각상처럼 엄숙하고 평화롭게 묘사했습니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  },
  {
    id: 'birth-of-venus',
    title: '비너스의 탄생',
    painter: {
      name: '산드로 보티첼리',
      birthYear: 1445,
      deathYear: 1510,
      bioShort: '초기 르네상스 피렌체 화파의 거장. 우아한 곡선과 신화적 서정성의 극치.'
    },
    year: '1485년경',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    styleTag: '초기 르네상스',
    museum: '피렌체 우피치 미술관',
    isFeatured: false,
    docentStory: '바다 거품에서 태어난 사랑과 미의 여신 비너스가 조개껍데기 위에 서서 서풍의 신 제피로스의 따스한 바람을 타고 해변에 도착하는 장면입니다. 당시 기독교적 세계관을 깨고 고대 그리스·로마 신화를 대담하게 부활시킨 르네상스 인문주의의 상징적 걸작입니다.',
    difficulties: [
      { level: '25', gridCols: 5, gridRows: 5, label: '25피스 (입문)' },
      { level: '100', gridCols: 10, gridRows: 10, label: '100피스 (보통)' },
      { level: '400', gridCols: 20, gridRows: 20, label: '400피스 (달인)' }
    ]
  }
];
