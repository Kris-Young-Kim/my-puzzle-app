// 저작권 만료(사후 70년 경과) 세계 명화 100점 카탈로그 데이터셋
// 도슨트 스토리텔링 및 난이도별 그리드 포함

import { Painting } from '../types';

export const MASTERPIECES: Painting[] = [
  {
    "id": "starry-night",
    "title": "별이 빛나는 밤",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "네덜란드 출신 후기 인상주의 거장. 강렬한 색채와 격정적인 붓터치로 영혼을 울리는 작품을 남김."
    },
    "year": "1889년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "뉴욕 현대미술관 (MoMA)",
    "isFeatured": true,
    "docentStory": "고흐가 프랑스 생레미의 정신병원에 머물 당시, 병실 동쪽 창문을 통해 새벽녘에 바라본 밤하늘 풍경입니다. 꿈틀거리는 사이프러스 나무는 죽음과 영원을 상징하며, 맹렬하게 소용돌이치는 11개의 별빛과 노란 초승달은 고통 속에서도 예술을 향해 타올랐던 그의 불멸의 영혼을 보여줍니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "pearl-earring",
    "title": "진주 귀걸이를 한 소녀",
    "painter": {
      "name": "요하네스 페르메이르",
      "birthYear": 1632,
      "deathYear": 1675,
      "bioShort": "네덜란드 황금기의 빛의 마술사. 일상의 고요함과 투명한 빛의 입자를 포착함."
    },
    "year": "1665년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg",
    "styleTag": "네덜란드 황금기",
    "museum": "헤이그 마우리츠하위스 미술관",
    "isFeatured": true,
    "docentStory": "‘북유럽의 모나리자’로 불리는 이 걸작은 특정 인물의 초상화가 아닌, 이국적인 터번을 쓴 인물을 상상해 그린 ‘트로니(Tronie)’ 장르입니다. 깊은 어둠 속에서 살포시 뒤돌아보는 소녀의 눈빛과 반짝이는 커다란 진주 귀걸이는 단 두 번의 물방울 모양 붓질로 완성된 경이로운 빛의 결정체입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-kiss",
    "title": "키스",
    "painter": {
      "name": "구스타프 클림트",
      "birthYear": 1862,
      "deathYear": 1918,
      "bioShort": "오스트리아 빈 분리파의 거장. 황금빛 장식성과 에로티시즘의 화려한 결합."
    },
    "year": "1907-1908년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/960px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    "styleTag": "아르누보 / 상징주의",
    "museum": "비엔나 벨베데레 오스트리아 갤러리",
    "isFeatured": true,
    "docentStory": "꽃이 흐드러지게 핀 벼랑 끝에서 황금빛 아우라에 둘러싸인 연인의 지고지순한 사랑의 순간입니다. 클림트는 비잔틴 모자이크에서 영감을 받아 실제 금박을 캔버스에 붙였으며, 남성의 옷에는 각진 직사각형 문양, 여성의 옷에는 부드러운 동심원 꽃무늬를 배치하여 남성과 여성의 신비로운 조화를 상징했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "water-lilies",
    "title": "수련 연못",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1840,
      "deathYear": 1926,
      "bioShort": "인상파의 창시자이자 빛의 추적자. 시시각각 변화하는 자연의 빛을 포착."
    },
    "year": "1899년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    "styleTag": "인상주의",
    "museum": "런던 내셔널 갤러리 / 시카고 미술관",
    "isFeatured": false,
    "docentStory": "지베르니에 직접 정원을 가꾸었던 모네는 일본식 초록색 아치 다리와 그 아래 흐르는 수련 연못을 250여 점이나 그렸습니다. 물 위에 떠 있는 꽃과 수면에 비친 하늘, 버드나무의 반영이 경계 없이 뒤섞여 관람객으로 하여금 마치 물속을 들여다보는 듯한 고요한 힐링을 안겨줍니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "mona-lisa",
    "title": "모나리자",
    "painter": {
      "name": "레오나르도 다 빈치",
      "birthYear": 1452,
      "deathYear": 1519,
      "bioShort": "르네상스를 대표하는 만능 천재. 해부학과 광학을 그림에 투영한 거장."
    },
    "year": "1503-1519년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    "styleTag": "르네상스",
    "museum": "파리 루브르 박물관",
    "isFeatured": false,
    "docentStory": "경계선을 안개처럼 부드럽게 번지게 하는 ‘스푸마토(Sfumato)’ 기법으로 완성된 불멸의 미소입니다. 입꼬리와 눈꼬리를 살짝 흐려 놓았기 때문에, 관람자가 그림의 어디를 바라보느냐에 따라 때로는 미소 짓고 때로는 침묵하는 듯한 신비로운 감정을 자아냅니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "great-wave",
    "title": "가나가와 해변의 높은 파도 아래",
    "painter": {
      "name": "카츠시카 호쿠사이",
      "birthYear": 1760,
      "deathYear": 1849,
      "bioShort": "일본 에도 시대 우키요에 판화의 대가. 모네, 고흐 등 서양 인상파 화가들에게 거대한 충격을 안김."
    },
    "year": "1831년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
    "styleTag": "우키요에",
    "museum": "도쿄 국립박물관 / 메트로폴리탄 미술관",
    "isFeatured": false,
    "docentStory": "독일에서 수입된 프러시안 블루 안료를 사용해 거대한 파도가 마치 발톱을 세운 괴물처럼 배들을 집어삼킬 듯 솟구치는 순간을 포착했습니다. 격렬한 파도 저 멀리 고요하게 버티고 서 있는 후지산의 작고 변함없는 실루엣이 자연의 위압감과 영원함을 극적으로 대비시킵니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "sunday-afternoon",
    "title": "그랑드 자트 섬의 일요일 오후",
    "painter": {
      "name": "조르주 쇠라",
      "birthYear": 1859,
      "deathYear": 1891,
      "bioShort": "신인상주의 창시자. 무수한 순수 색상의 점으로 형태와 빛을 구축한 점묘법의 대가."
    },
    "year": "1884-1886년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
    "styleTag": "신인상주의",
    "museum": "시카고 미술관",
    "isFeatured": false,
    "docentStory": "물감을 팔레트에서 섞지 않고 캔버스 위에 수백만 개의 순수 색점(Dot)을 찍어, 보는 사람의 눈에서 광학적으로 색이 혼합되도록 한 불후의 명작입니다. 완성하는 데만 2년이 걸렸으며, 파리 센 강변 섬에서 휴일을 즐기는 다양한 계층의 사람들을 마치 정지된 영원의 조각상처럼 엄숙하고 평화롭게 묘사했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "birth-of-venus",
    "title": "비너스의 탄생",
    "painter": {
      "name": "산드로 보티첼리",
      "birthYear": 1445,
      "deathYear": 1510,
      "bioShort": "초기 르네상스 피렌체 화파의 거장. 우아한 곡선과 신화적 서정성의 극치."
    },
    "year": "1485년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    "styleTag": "르네상스",
    "museum": "피렌체 우피치 미술관",
    "isFeatured": false,
    "docentStory": "바다 거품에서 태어난 사랑과 미의 여신 비너스가 조개껍데기 위에 서서 서풍의 신 제피로스의 따스한 바람을 타고 해변에 도착하는 장면입니다. 당시 기독교적 세계관을 깨고 고대 그리스·로마 신화를 대담하게 부활시킨 르네상스 인문주의의 상징적 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-scream",
    "title": "절규",
    "painter": {
      "name": "에드바르 뭉크",
      "birthYear": 1863,
      "deathYear": 1944,
      "bioShort": "노르웨이 표현주의의 선구자. 인간 내면의 실존적 불안과 전율을 화폭에 담아냄."
    },
    "year": "1893년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/960px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/960px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    "styleTag": "표현주의",
    "museum": "오슬로 노르웨이 국립미술관",
    "isFeatured": false,
    "docentStory": "해질녘 피오르드 난간을 걷던 뭉크가 핏빛으로 물든 하늘을 보며 자연을 관통하는 거대하고 끝없는 절규를 온몸으로 느낀 순간을 표현했습니다. 물결치는 붉은 하늘과 소용돌이치는 대지 속에서 양손으로 귀를 감싼 해골 형상의 인물은 현대인의 실존적 공포를 완벽하게 형상화했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "cafe-terrace-at-night",
    "title": "밤의 카페 테라스",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "강렬한 색채와 감성적 터치로 밤의 빛을 예찬한 후기 인상주의 거장."
    },
    "year": "1888년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg/960px-Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg/960px-Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg",
    "styleTag": "후기 인상주의",
    "museum": "오테를로 크뢸러 뮐러 미술관",
    "isFeatured": false,
    "docentStory": "고흐가 프랑스 아를의 포룸 광장에서 야외에 직접 이젤을 펼치고 밤 풍경을 그린 역사적인 작품입니다. 검은색을 단 한 방울도 쓰지 않고도 짙은 군청색 밤하늘과 눈부신 유황빛 카페 가스등의 보색 대비만으로 따스하고 낭만적인 남프랑스의 밤을 마법처럼 빚어냈습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "wanderer-sea-of-fog",
    "title": "안개 바다 위의 방랑자",
    "painter": {
      "name": "카스파르 다비트 프리드리히",
      "birthYear": 1774,
      "deathYear": 1840,
      "bioShort": "독일 낭만주의 회화의 거두. 숭고한 대자연과 고독한 인간의 내면 탐구."
    },
    "year": "1818년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/960px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/960px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
    "styleTag": "낭만주의",
    "museum": "함부르크 미술관",
    "isFeatured": false,
    "docentStory": "깎아지른 바위산 정상에서 소용돌이치는 안개 바다를 굽어보는 방랑자의 뒷모습입니다. 관람자로 하여금 방랑자의 시선과 일치되어 장엄하고 미지의 세계를 함께 마주하게 만드는 독일 낭만주의 ‘숭고미(Sublime)’의 정점입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "creation-of-adam",
    "title": "아담의 창조",
    "painter": {
      "name": "미켈란젤로 부오나로티",
      "birthYear": 1475,
      "deathYear": 1564,
      "bioShort": "르네상스 3대 거장 중 하나인 조각가이자 화가. 시스티나 성당 천장화의 영웅적 신체 표현."
    },
    "year": "1511-1512년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
    "styleTag": "르네상스",
    "museum": "바티칸 시스티나 성당",
    "isFeatured": false,
    "docentStory": "하느님이 흙으로 빚은 첫 인간 아담에게 생명의 불꽃을 불어넣는 그 찰나의 순간입니다. 신과 인간의 닿을 듯 말 듯한 손끝 사이의 미세한 간격은 인류 미술사를 통틀어 가장 긴장감 넘치고 성스러운 찰나로 평가받습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "bedroom-in-arles",
    "title": "아를의 침실",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "강렬한 원색과 굵은 윤곽선으로 영혼의 쉼터를 갈망한 고흐의 대표작."
    },
    "year": "1888년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "암스테르담 반 고흐 미술관",
    "isFeatured": false,
    "docentStory": "남프랑스 아를의 ‘노란 집’에서 고갱을 기다리며 꾸민 고흐 자신의 소박한 침실입니다. 가구의 단순한 형태와 뚜렷한 색채는 그가 꿈꾸었던 절대적인 휴식과 평온을 상징합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "sunflowers",
    "title": "해바라기 (열다섯 송이)",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "태양의 노란빛을 향한 꺼지지 않는 열정을 쏟아낸 고흐의 영원한 상징."
    },
    "year": "1888년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/960px-Vincent_Willem_van_Gogh_127.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/960px-Vincent_Willem_van_Gogh_127.jpg",
    "styleTag": "후기 인상주의",
    "museum": "런던 내셔널 갤러리",
    "isFeatured": false,
    "docentStory": "친구 고갱과의 공동 작업을 환영하기 위해 그린 연작 중 하나로, 노란색의 무한한 변주를 통해 생명의 환희와 사그라드는 슬픔을 동시에 화폭에 담았습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "almond-blossoms",
    "title": "꽃피는 아몬드 나무",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "새 생명의 탄생을 축복하며 봄날의 푸른 하늘을 수놓은 따스한 서정성."
    },
    "year": "1890년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "암스테르담 반 고흐 미술관",
    "isFeatured": false,
    "docentStory": "동생 테오의 아들(조카)이 태어났다는 소식을 듣고 축복의 선물로 그린 작품입니다. 봄을 가장 먼저 알리는 아몬드 꽃가지가 푸른 하늘을 가득 채우며 희망을 노래합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "wheatfield-with-crows",
    "title": "까마귀가 나는 밀밭",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1853,
      "deathYear": 1890,
      "bioShort": "고흐 생애 마지막 나날들의 격렬한 감정과 고독을 담아낸 걸작."
    },
    "year": "1890년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Wheatfield_with_crows_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "암스테르담 반 고흐 미술관",
    "isFeatured": false,
    "docentStory": "폭풍우가 몰려오는 짙푸른 하늘 아래 세 갈래로 뻗은 붉은 흙길과 휘몰아치는 금빛 밀밭 위로 검은 까마귀 떼가 날아오르며 고흐 내면의 비장한 심연을 보여줍니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "woman-with-parasol",
    "title": "양산을 쓴 여인",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1840,
      "deathYear": 1926,
      "bioShort": "빛과 바람의 찰나를 캔버스에 영원히 정지시킨 인상파의 상징."
    },
    "year": "1875년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/960px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/960px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "워싱턴 국립 미술관",
    "isFeatured": false,
    "docentStory": "모네의 첫 아내 카미유와 어린 아들 장이 언덕 위에서 부드러운 바람을 맞고 서 있는 순간입니다. 햇살에 투과된 초록 양산과 흩날리는 드레스가 여름날의 생기를 전합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "impression-sunrise",
    "title": "인상, 해돋이",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1840,
      "deathYear": 1926,
      "bioShort": "‘인상주의’라는 미술사조의 이름을 탄생시킨 역사적인 기념비적 걸작."
    },
    "year": "1872년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg",
    "styleTag": "인상주의",
    "museum": "파리 마르모탕 모네 미술관",
    "isFeatured": false,
    "docentStory": "프랑스 르아브르 항구의 붉은 아침 해와 바다에 비친 주황빛 태양 광선, 안개 낀 항만의 실루엣을 빠른 붓터치로 포착하여 미술계에 혁명적인 인상파 시대를 열었습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "rouen-cathedral",
    "title": "루앙 대성당 (서쪽 파사드)",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1840,
      "deathYear": 1926,
      "bioShort": "시간과 날씨에 따라 시시각각 분해되고 재조합되는 빛의 연금술."
    },
    "year": "1894년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.JPG/960px-Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.JPG",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.JPG/960px-Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.JPG",
    "styleTag": "인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "견고한 고딕 대성당의 석조 건축물조차 쏟아지는 아침과 정오, 일몰의 햇살 속에서 어떻게 녹아내리고 영롱하게 빛나는지 30여 점의 연작으로 집대성했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "moulin-de-la-galette",
    "title": "물랭 드 라 갈레트의 무도회",
    "painter": {
      "name": "피에르 오귀스트 르누아르",
      "birthYear": 1841,
      "deathYear": 1919,
      "bioShort": "나뭇잎 사이로 부서지는 햇살과 파리 시민들의 행복한 일상을 노래한 화가."
    },
    "year": "1876년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/1280px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/1280px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg",
    "styleTag": "인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "몽마르트르 언덕 야외 무도장에서 춤추고 담소를 나누는 청춘들의 찬란한 순간입니다. 아카시아 나뭇잎을 투과해 사람들의 옷과 얼굴에 얼룩덜룩 떨어지는 햇살 표현이 압권입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "boating-party",
    "title": "보트 파티에서의 오찬",
    "painter": {
      "name": "피에르 오귀스트 르누아르",
      "birthYear": 1841,
      "deathYear": 1919,
      "bioShort": "센 강변의 상쾌한 바람과 우정의 온기를 담아낸 인상파의 걸작."
    },
    "year": "1881년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg/1280px-Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg/1280px-Pierre-Auguste_Renoir_-_Luncheon_of_the_Boating_Party_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "워싱턴 필립스 컬렉션",
    "isFeatured": false,
    "docentStory": "센 강변 푸르네즈 레스토랑 테라스에서 친구들과 식사를 즐기는 활기찬 장면입니다. 테이블 위의 반짝이는 와인병과 햇살 가득한 인물들의 표정이 따스한 행복감을 선사합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "girls-at-the-piano",
    "title": "피아노 치는 소녀들",
    "painter": {
      "name": "피에르 오귀스트 르누아르",
      "birthYear": 1841,
      "deathYear": 1919,
      "bioShort": "우아한 파스텔 톤과 감미로운 음악의 선율이 흐르는 듯한 명화."
    },
    "year": "1892년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg/960px-Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg/960px-Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "프랑스 정부가 뤽상부르 미술관 소장을 위해 공식 의뢰한 작품으로, 피아노 앞에 나란히 앉아 악보를 넘기며 연습하는 두 소녀의 다정하고 온화한 분위기를 그렸습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "ballet-class",
    "title": "발레 수업",
    "painter": {
      "name": "에드가 드가",
      "birthYear": 1834,
      "deathYear": 1917,
      "bioShort": "무용수의 역동적인 동세와 무대 뒤편의 진솔한 순간을 포착한 데생의 대가."
    },
    "year": "1874년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/1280px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/1280px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "전설적인 무용 거장 쥘 페로의 지도를 받으며 연습 중인 발레리나들의 모습입니다. 등을 긁거나 하품을 하는 등 무대 뒤 꾸밈없는 인간적인 찰나를 대각선 구도로 담아냈습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "blue-dancers",
    "title": "푸른 무용수들",
    "painter": {
      "name": "에드가 드가",
      "birthYear": 1834,
      "deathYear": 1917,
      "bioShort": "파스텔로 완성된 눈부신 터키석 블루의 화려한 리듬감."
    },
    "year": "1897년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/%D0%94%D0%B5%D0%B3%D0%B0._%D0%93%D0%BE%D0%BB%D1%83%D0%B1%D1%8B%D0%B5_%D1%82%D0%B0%D0%BD%D1%86%D0%BE%D0%B2%D1%89%D0%B8%D1%86%D1%8B.jpg/960px-%D0%94%D0%B5%D0%B3%D0%B0._%D0%93%D0%BE%D0%BB%D1%83%D0%B1%D1%8B%D0%B5_%D1%82%D0%B0%D0%BD%D1%86%D0%BE%D0%B2%D1%89%D0%B8%D1%86%D1%8B.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/%D0%94%D0%B5%D0%B3%D0%B0._%D0%93%D0%BE%D0%BB%D1%83%D0%B1%D1%8B%D0%B5_%D1%82%D0%B0%D0%BD%D1%86%D0%BE%D0%B2%D1%89%D0%B8%D1%86%D1%8B.jpg/960px-%D0%94%D0%B5%D0%B3%D0%B0._%D0%93%D0%BE%D0%BB%D1%83%D0%B1%D1%8B%D0%B5_%D1%82%D0%B0%D0%BD%D1%86%D0%BE%D0%B2%D1%89%D0%B8%D1%86%D1%8B.jpg",
    "styleTag": "인상주의",
    "museum": "모스크바 푸시킨 미술관",
    "isFeatured": false,
    "docentStory": "무대에 오르기 직전 코르사주를 손보며 몸을 조율하는 무용수들의 역동적인 상체 움직임과 빛나는 푸른 튀튀 드레스의 질감이 눈부신 조화를 이룹니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "luncheon-on-the-grass",
    "title": "풀밭 위의 점심식사",
    "painter": {
      "name": "에두아르 마네",
      "birthYear": 1832,
      "deathYear": 1883,
      "bioShort": "고전 미술의 관습을 깨부수고 현대 회화의 문을 활짝 연 모더니즘의 선구자."
    },
    "year": "1863년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg/1280px-Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg/1280px-Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
    "styleTag": "인상주의 / 모더니즘",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "신화나 역사가 아닌 당대 파리의 일상적 숲속에 정장 차림의 신사들과 누드의 여성을 배치하여 당시 보수적인 살롱전에 거대한 충격과 스캔들을 일으킨 현대 미술의 출발점입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-fifer",
    "title": "피리 부는 소년",
    "painter": {
      "name": "에두아르 마네",
      "birthYear": 1832,
      "deathYear": 1883,
      "bioShort": "원근법과 배경을 생략한 과감한 평면성으로 일본 판화의 미학을 접목."
    },
    "year": "1866년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Le_Fifre.JPG/960px-Le_Fifre.JPG",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Le_Fifre.JPG/960px-Le_Fifre.JPG",
    "styleTag": "인상주의 / 모더니즘",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "배경의 경계가 사라진 잿빛 공간 속에 붉은 바지와 검은 재킷을 입은 근위대 소년이 서 있습니다. 단호하고 절제된 붓질과 색면 구성이 현대 그래픽 디자인의 시초를 보여줍니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "bar-at-folies-bergere",
    "title": "폴리베르제르의 바",
    "painter": {
      "name": "에두아르 마네",
      "birthYear": 1832,
      "deathYear": 1883,
      "bioShort": "거울의 반영과 여급의 우수 어린 눈빛을 담은 마네의 마지막 대작."
    },
    "year": "1882년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Edouard_Manet%2C_A_Bar_at_the_Folies-Berg%C3%A8re.jpg/1280px-Edouard_Manet%2C_A_Bar_at_the_Folies-Berg%C3%A8re.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Edouard_Manet%2C_A_Bar_at_the_Folies-Berg%C3%A8re.jpg/1280px-Edouard_Manet%2C_A_Bar_at_the_Folies-Berg%C3%A8re.jpg",
    "styleTag": "인상주의 / 모더니즘",
    "museum": "런던 코톨드 갤러리",
    "isFeatured": false,
    "docentStory": "화려한 카페 콘서트장의 소음 속에서 멍하니 정면을 응시하는 바텐더 쉬종의 모습입니다. 거울에 비친 번잡한 파리 사교계와 그녀의 내면적 고독이 극적으로 대비됩니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "mont-sainte-victoire",
    "title": "생트 빅투아르 산",
    "painter": {
      "name": "폴 세잔",
      "birthYear": 1839,
      "deathYear": 1906,
      "bioShort": "사물의 본질적 기하학 구조를 탐구하여 입체파(피카소)의 아버지가 된 거장."
    },
    "year": "1902-1904년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg/1280px-Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg/1280px-Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "필라델피아 미술관",
    "isFeatured": false,
    "docentStory": "고향 엑상프로방스의 생트 빅투아르 산을 80여 점이나 그리며 자연을 원기둥, 구, 원뿔의 구조적 색면으로 해체하고 재구성했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "apples-and-oranges",
    "title": "사과와 오렌지가 있는 정물",
    "painter": {
      "name": "폴 세잔",
      "birthYear": 1839,
      "deathYear": 1906,
      "bioShort": "다시점(Multiple Perspectives)을 회화에 도입한 정물화의 혁신."
    },
    "year": "1899년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg/1280px-Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg/1280px-Nature_morte_aux_pommes_et_aux_oranges%2C_par_Paul_C%C3%A9zanne.jpg",
    "styleTag": "후기 인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "테이블보 위의 접시와 과일들이 서로 다른 각도에서 바라본 시점으로 배치되어 있습니다. 사과 하나로 파리를 놀라게 하겠다는 세잔의 결심이 빚어낸 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-card-players",
    "title": "카드놀이 하는 사람들",
    "painter": {
      "name": "폴 세잔",
      "birthYear": 1839,
      "deathYear": 1906,
      "bioShort": "농부들의 묵직한 침묵과 기념비적 엄숙함을 조형적으로 구축."
    },
    "year": "1892-1895년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg/1280px-Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg/1280px-Les_Joueurs_de_cartes%2C_par_Paul_C%C3%A9zanne.jpg",
    "styleTag": "후기 인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "소박한 카페 테이블을 사이에 두고 카드를 내려다보는 두 농부의 대칭적 구도입니다. 극도의 침묵과 집중 속에서 마치 성스러운 의식을 치르는 듯한 무게감이 감돕니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "where-do-we-come-from",
    "title": "우리는 어디서 왔는가, 우리는 무엇인가, 우리는 어디로 가는가",
    "painter": {
      "name": "폴 고갱",
      "birthYear": 1848,
      "deathYear": 1903,
      "bioShort": "원시주의와 상징주의의 신비로운 융합으로 인간 실존의 근원을 묻다."
    },
    "year": "1897-1898년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Gauguin_-_D%27ou_venons-nous_Que_sommes-nous_Ou_allons-nous.jpg/1280px-Gauguin_-_D%27ou_venons-nous_Que_sommes-nous_Ou_allons-nous.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Gauguin_-_D%27ou_venons-nous_Que_sommes-nous_Ou_allons-nous.jpg/1280px-Gauguin_-_D%27ou_venons-nous_Que_sommes-nous_Ou_allons-nous.jpg",
    "styleTag": "후기 인상주의 / 상징주의",
    "museum": "보스턴 미술관",
    "isFeatured": false,
    "docentStory": "오른쪽의 갓난아이(과거)에서 중앙의 열매를 따는 청년(현재), 왼쪽의 웅크린 노인(미래)에 이르기까지 인생의 순환과 탄생, 죽음의 철학적 질문을 웅장한 화폭에 담았습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "tahitian-women",
    "title": "타히티의 여인들 (해변에서)",
    "painter": {
      "name": "폴 고갱",
      "birthYear": 1848,
      "deathYear": 1903,
      "bioShort": "원시 열대 낙원의 태양과 묵직한 원색의 이국적 정취."
    },
    "year": "1891년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Paul_Gauguin_%281848-1903%29_-_Two_Nudes_on_a_Tahitian_Beach.jpg/1280px-Paul_Gauguin_%281848-1903%29_-_Two_Nudes_on_a_Tahitian_Beach.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Paul_Gauguin_%281848-1903%29_-_Two_Nudes_on_a_Tahitian_Beach.jpg/1280px-Paul_Gauguin_%281848-1903%29_-_Two_Nudes_on_a_Tahitian_Beach.jpg",
    "styleTag": "후기 인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "모래사장 위에 단정하게 앉아 있는 두 타히티 여성의 고요한 모습입니다. 굵은 검은 윤곽선과 강렬한 빨강, 노랑의 평면적 배치가 서양 회화의 틀을 완전히 벗어납니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "at-the-moulin-rouge",
    "title": "물랭 루주에서",
    "painter": {
      "name": "앙리 드 툴루즈 로트레크",
      "birthYear": 1864,
      "deathYear": 1901,
      "bioShort": "세기말 몽마르트르 밤의 환락과 그 이면의 페이소스를 날카롭게 통찰한 천재."
    },
    "year": "1892-1895년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg/1280px-Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg/1280px-Henri_de_Toulouse-Lautrec_-_At_the_Moulin_Rouge_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "시카고 미술관",
    "isFeatured": false,
    "docentStory": "카바레 물랭 루주의 단골 인사들이 테이블에 둘러앉아 있고, 초록빛 조명을 받은 댄서 메이 밀턴의 괴기스러운 얼굴이 우측 전경에 과감하게 잘려 있어 세기말의 긴장감을 극대화합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-milkmaid",
    "title": "우유를 따르는 여인",
    "painter": {
      "name": "요하네스 페르메이르",
      "birthYear": 1632,
      "deathYear": 1675,
      "bioShort": "소박한 일상의 노동을 성스러운 영원의 순간으로 승화시킨 빛의 거장."
    },
    "year": "1658년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/960px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/960px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
    "styleTag": "네덜란드 황금기",
    "museum": "암스테르담 국립미술관",
    "isFeatured": false,
    "docentStory": "창가에서 흘러드는 부드러운 자연광 아래 묵묵히 우유를 따르는 하녀의 모습입니다. 흘러내리는 하얀 우유 줄기와 빵의 질감 위에 맺힌 작은 점묘의 빛방울들이 경건함을 자아냅니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "view-of-delft",
    "title": "델프트 풍경",
    "painter": {
      "name": "요하네스 페르메이르",
      "birthYear": 1632,
      "deathYear": 1675,
      "bioShort": "물 위에 반사되는 도시의 실루엣과 구름 사이로 비치는 영롱한 햇살."
    },
    "year": "1660-1661년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vermeer-view-of-delft.jpg/1280px-Vermeer-view-of-delft.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vermeer-view-of-delft.jpg/1280px-Vermeer-view-of-delft.jpg",
    "styleTag": "네덜란드 황금기",
    "museum": "헤이그 마우리츠하위스 미술관",
    "isFeatured": false,
    "docentStory": "프루스트가 《잃어버린 시간을 찾아서》에서 세상에서 가장 아름다운 그림이라 극찬한 도시 풍경화로, 수면 위의 잔물결과 붉은 벽돌 지붕에 쏟아지는 햇살이 완벽한 조화를 이룹니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-lacemaker",
    "title": "레이스 뜨는 여인",
    "painter": {
      "name": "요하네스 페르메이르",
      "birthYear": 1632,
      "deathYear": 1675,
      "bioShort": "초밀착 시점으로 포착한 극한의 집중력과 빛의 마이크로 코스모스."
    },
    "year": "1669-1670년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Spitzenkl%C3%B6pplerin_des_Johannes_Vermeer_im_Louvre.jpg/960px-Spitzenkl%C3%B6pplerin_des_Johannes_Vermeer_im_Louvre.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Spitzenkl%C3%B6pplerin_des_Johannes_Vermeer_im_Louvre.jpg/960px-Spitzenkl%C3%B6pplerin_des_Johannes_Vermeer_im_Louvre.jpg",
    "styleTag": "네덜란드 황금기",
    "museum": "파리 루브르 박물관",
    "isFeatured": false,
    "docentStory": "노란 옷을 입은 젊은 여인이 하얀 실을 조심스럽게 조작하는 모습입니다. 손끝의 미세한 움직임과 초점을 맞춘 전경의 붉고 하얀 실타래 처리가 돋보입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-night-watch",
    "title": "야간 순찰 (야경)",
    "painter": {
      "name": "렘브란트 반 레인",
      "birthYear": 1606,
      "deathYear": 1669,
      "bioShort": "빛과 어둠의 극적인 대조(키아로스쿠로)로 인물의 영혼을 꿰뚫어 본 대가."
    },
    "year": "1642년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg",
    "styleTag": "바로크",
    "museum": "암스테르담 국립미술관",
    "isFeatured": false,
    "docentStory": "정적인 단체 초상화의 공식을 깨고, 프란스 바닝 코크 대장의 지휘 아래 출동하는 민병대원들의 박진감 넘치는 행진 순간을 극적인 조명 연출로 살려낸 바로크 미술의 절정입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "return-of-prodigal-son",
    "title": "돌아온 탕자",
    "painter": {
      "name": "렘브란트 반 레인",
      "birthYear": 1606,
      "deathYear": 1669,
      "bioShort": "모든 죄를 용서하는 무조건적인 부성애와 신의 자비를 그린 감동의 극치."
    },
    "year": "1668-1669년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg/960px-Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg/960px-Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
    "styleTag": "바로크",
    "museum": "상트페테르부르크 에르미타시 미술관",
    "isFeatured": false,
    "docentStory": "만신의 상처를 입고 찢어진 신발로 무릎 꿇은 아들을 두 손으로 포근히 감싸 안는 눈먼 아버지의 모습입니다. 아버지의 한 손은 강인한 남성, 한 손은 부드러운 여성의 손으로 그려져 있습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "anatomy-lesson",
    "title": "툴프 박사의 해부학 강의",
    "painter": {
      "name": "렘브란트 반 레인",
      "birthYear": 1606,
      "deathYear": 1669,
      "bioShort": "26세의 렘브란트를 단숨에 암스테르담 최고의 초상화가로 등극시킨 작품."
    },
    "year": "1632년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/1280px-Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/1280px-Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
    "styleTag": "바로크",
    "museum": "헤이그 마우리츠하위스 미술관",
    "isFeatured": false,
    "docentStory": "시신의 팔 근육을 집게로 들어 올리며 설명하는 의사 툴프 박사와 그 곁에서 지적 호기심으로 눈을 반짝이며 귀를 기울이는 제자들의 생생한 표정이 압도적입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "rembrandt-self-portrait-1659",
    "title": "자화상 (1659년)",
    "painter": {
      "name": "렘브란트 반 레인",
      "birthYear": 1606,
      "deathYear": 1669,
      "bioShort": "파산과 비극 속에서도 굴하지 않고 인간의 존엄을 응시한 노년의 눈빛."
    },
    "year": "1659년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Rembrandt_Harmensz._van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/960px-Rembrandt_Harmensz._van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Rembrandt_Harmensz._van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/960px-Rembrandt_Harmensz._van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg",
    "styleTag": "바로크",
    "museum": "워싱턴 국립 미술관",
    "isFeatured": false,
    "docentStory": "부와 명성을 모두 잃고 파산한 노년의 렘브란트가 깊게 패인 주름과 백발에도 불구하고 정면을 묵묵히 응시하며 예술가로서의 위엄과 진실을 전합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "calling-of-saint-matthew",
    "title": "성 마태오의 소명",
    "painter": {
      "name": "카라바조",
      "birthYear": 1571,
      "deathYear": 1610,
      "bioShort": "어둠을 찢고 내리꽂히는 신성한 한 줄기 빛(테네브리즘)의 창시자."
    },
    "year": "1599-1600년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/1280px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/1280px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg",
    "styleTag": "바로크",
    "museum": "로마 산 루이지 데이 프란체시 성당",
    "isFeatured": false,
    "docentStory": "어두운 세관 방 안에서 돈을 세던 세리 마태오를 향해 예수 그리스도의 손끝이 가리키는 순간, 창문을 통해 비쳐 든 대각선의 빛이 마태오의 놀란 가슴을 밝힙니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "judith-beheading-holofernes",
    "title": "유디트와 홀로페르네스",
    "painter": {
      "name": "카라바조",
      "birthYear": 1571,
      "deathYear": 1610,
      "bioShort": "숨 막히는 극적 긴장감과 피비린내 나는 폭력의 사실적 묘사."
    },
    "year": "1598-1599년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Judith_Beheading_Holofernes_-_Caravaggio.jpg/1280px-Judith_Beheading_Holofernes_-_Caravaggio.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Judith_Beheading_Holofernes_-_Caravaggio.jpg/1280px-Judith_Beheading_Holofernes_-_Caravaggio.jpg",
    "styleTag": "바로크",
    "museum": "로마 바르베리니 궁전 국립고대미술관",
    "isFeatured": false,
    "docentStory": "적장 홀로페르네스의 목을 베는 과부 유디트의 결연하면서도 혐오 어린 표정과 침상에서 비명을 지르는 장수의 근육 경련이 어둠 속에서 극명하게 대비됩니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "medusa",
    "title": "메두사",
    "painter": {
      "name": "카라바조",
      "birthYear": 1571,
      "deathYear": 1610,
      "bioShort": "잘려 나간 괴물의 목에서 뿜어져 나오는 원초적 공포의 순간."
    },
    "year": "1597년경",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Caravaggio_-_Medusa_-_Google_Art_Project.jpg/960px-Caravaggio_-_Medusa_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Caravaggio_-_Medusa_-_Google_Art_Project.jpg/960px-Caravaggio_-_Medusa_-_Google_Art_Project.jpg",
    "styleTag": "바로크",
    "museum": "피렌체 우피치 미술관",
    "isFeatured": false,
    "docentStory": "목이 베이는 바로 그 순간 자신의 죽음을 깨닫고 입을 벌린 채 절규하는 메두사의 머리를 볼록한 원형 방패에 그려 생생한 입체감과 전율을 선사합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "las-meninas",
    "title": "시녀들 (라스 메니냐스)",
    "painter": {
      "name": "디에고 벨라스케스",
      "birthYear": 1599,
      "deathYear": 1660,
      "bioShort": "화가들의 화가. 회화 공간의 다층적 시선과 현실의 미학을 완성한 거장."
    },
    "year": "1656년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1280px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1280px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
    "styleTag": "바로크",
    "museum": "마드리드 프라도 미술관",
    "isFeatured": false,
    "docentStory": "마르가리타 공주와 시녀들, 그림을 그리는 벨라스케스 자신, 그리고 거울 속에 비친 국왕 부부까지 캔버스 안팎의 시선이 교차하는 미술사 최고의 수수께끼 명작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "innocent-x",
    "title": "교황 인노첸시오 10세의 초상",
    "painter": {
      "name": "디에고 벨라스케스",
      "birthYear": 1599,
      "deathYear": 1660,
      "bioShort": "교황조차 “너무나 진실하다(Troppo vero)”고 탄식하게 만든 초상화의 정점."
    },
    "year": "1650년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Portrait_of_Pope_Innocent_X_%28by_Circle_of_Diego_Vel%C3%A1zquez%29_-_National_Gallery_of_Art.jpg/960px-Portrait_of_Pope_Innocent_X_%28by_Circle_of_Diego_Vel%C3%A1zquez%29_-_National_Gallery_of_Art.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Portrait_of_Pope_Innocent_X_%28by_Circle_of_Diego_Vel%C3%A1zquez%29_-_National_Gallery_of_Art.jpg/960px-Portrait_of_Pope_Innocent_X_%28by_Circle_of_Diego_Vel%C3%A1zquez%29_-_National_Gallery_of_Art.jpg",
    "styleTag": "바로크",
    "museum": "로마 도리아 팜필리 갤러리",
    "isFeatured": false,
    "docentStory": "붉은 비단 의자에 앉아 냉혹하고 의심 많은 눈빛으로 관람자를 쏘아보는 교황의 내면 심리를 붉은색 계열의 화려한 색채 변주 속에서 무자비할 정도로 사실적으로 묘사했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "descent-from-the-cross",
    "title": "십자가에서 내려지심",
    "painter": {
      "name": "페테르 파울 루벤스",
      "birthYear": 1577,
      "deathYear": 1640,
      "bioShort": "웅장한 스케일과 역동적인 대각선 구도, 풍만한 관능미의 바로크 거장."
    },
    "year": "1612-1614년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Peter_Paul_Rubens_-_Descent_from_the_Cross_-_WGA20212_%28cropped%29.jpg/960px-Peter_Paul_Rubens_-_Descent_from_the_Cross_-_WGA20212_%28cropped%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Peter_Paul_Rubens_-_Descent_from_the_Cross_-_WGA20212_%28cropped%29.jpg/960px-Peter_Paul_Rubens_-_Descent_from_the_Cross_-_WGA20212_%28cropped%29.jpg",
    "styleTag": "바로크",
    "museum": "안트베르펜 대성당",
    "isFeatured": false,
    "docentStory": "동화 《플랜더스의 개》의 주인공 네로가 그토록 보고 싶어 했던 바로 그 제단화입니다. 하얀 세마포를 타고 미끄러져 내리는 그리스도의 시신을 받쳐 드는 인물들의 비통함이 가득합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "liberty-leading-the-people",
    "title": "민중을 이끄는 자유의 여신",
    "painter": {
      "name": "외젠 들라크루아",
      "birthYear": 1798,
      "deathYear": 1863,
      "bioShort": "색채의 폭풍과 해방의 열정으로 프랑스 7월 혁명의 정신을 구현."
    },
    "year": "1830년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
    "styleTag": "낭만주의",
    "museum": "파리 루브르 박물관",
    "isFeatured": false,
    "docentStory": "삼색기를 휘날리며 바리케이드 위를 전진하는 자유의 여신 마리안느와 다양한 계층의 민중들이 하나로 뭉쳐 압제에 맞선 낭만주의 혁명 예술의 영원한 아이콘입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-fighting-temeraire",
    "title": "전함 테메레르",
    "painter": {
      "name": "J.M.W. 터너",
      "birthYear": 1775,
      "deathYear": 1851,
      "bioShort": "빛과 대기, 증기와 바다의 숭고한 소용돌이를 노래한 영국의 국민 화가."
    },
    "year": "1839년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg/1280px-The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg/1280px-The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg",
    "styleTag": "낭만주의",
    "museum": "런던 내셔널 갤러리",
    "isFeatured": false,
    "docentStory": "트라팔가 해전의 영웅이었던 거대한 범선 테메레르 호가 해체되기 위해 검은 증기선에 끌려가는 황혼의 순간을 눈부신 석양빛과 함께 애잔하게 그려냈습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-hay-wain",
    "title": "건초 마차",
    "painter": {
      "name": "존 컨스터블",
      "birthYear": 1776,
      "deathYear": 1837,
      "bioShort": "영국 서퍽의 고요한 전원 풍경과 시원한 하늘의 구름을 그린 목가적 서정."
    },
    "year": "1821년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/John_Constable_-_The_Hay_Wain_%281821%29.jpg/1280px-John_Constable_-_The_Hay_Wain_%281821%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/John_Constable_-_The_Hay_Wain_%281821%29.jpg/1280px-John_Constable_-_The_Hay_Wain_%281821%29.jpg",
    "styleTag": "낭만주의",
    "museum": "런던 내셔널 갤러리",
    "isFeatured": false,
    "docentStory": "스투어 강을 건너는 낡은 건초 마차와 윌리 로트의 오두막, 은은하게 반짝이는 강물과 녹음이 영국 전원 풍경의 가장 평화로운 정수를 담아냅니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "third-of-may-1808",
    "title": "1808년 5월 3일의 학살",
    "painter": {
      "name": "프란시스코 고야",
      "birthYear": 1746,
      "deathYear": 1828,
      "bioShort": "전쟁의 잔혹함과 인간성의 말살을 고발한 근대 역사화의 출발점."
    },
    "year": "1814년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/El_tres_de_mayo_de_1808_en_Madrid_%282008%29.jpg/1280px-El_tres_de_mayo_de_1808_en_Madrid_%282008%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/El_tres_de_mayo_de_1808_en_Madrid_%282008%29.jpg/1280px-El_tres_de_mayo_de_1808_en_Madrid_%282008%29.jpg",
    "styleTag": "낭만주의",
    "museum": "마드리드 프라도 미술관",
    "isFeatured": false,
    "docentStory": "나폴레옹 군대의 총구 앞에서 두 팔을 벌린 채 흰 셔츠를 입고 빛나는 스페인 시민의 저항과 얼굴 없는 사형 집행 군인들의 냉혹함이 극적으로 대비됩니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "saturn-devouring-his-son",
    "title": "아들을 삼키는 사투르누스",
    "painter": {
      "name": "프란시스코 고야",
      "birthYear": 1746,
      "deathYear": 1828,
      "bioShort": "청력을 잃은 고야가 ‘귀머거리의 집’ 벽에 남긴 전율의 블랙 페인팅."
    },
    "year": "1819-1823년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg/960px-Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg/960px-Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg",
    "styleTag": "낭만주의 / 표현주의적",
    "museum": "마드리드 프라도 미술관",
    "isFeatured": false,
    "docentStory": "자신의 권좌를 빼앗길 것이라는 신탁에 미쳐 아들의 몸을 뜯어먹는 시간의 신 사투르누스의 광기 어린 눈빛이 캔버스 너머를 응시합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "coronation-of-napoleon",
    "title": "나폴레옹의 대관식",
    "painter": {
      "name": "자크 루이 다비드",
      "birthYear": 1748,
      "deathYear": 1825,
      "bioShort": "프랑스 혁명과 나폴레옹 제국의 영광을 웅장한 고전적 질서로 기록한 화가."
    },
    "year": "1805-1807년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/1280px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/1280px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg",
    "styleTag": "신고전주의",
    "museum": "파리 루브르 박물관",
    "isFeatured": false,
    "docentStory": "노트르담 대성당에서 스스로 황제의 관을 쓴 나폴레옹이 무릎 꿇은 조제핀 황후에게 관을 씌워주는 장엄한 순간으로, 200여 명의 실제 인물이 정교하게 묘사된 10미터 대작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "napoleon-crossing-the-alps",
    "title": "알프스를 넘는 나폴레옹",
    "painter": {
      "name": "자크 루이 다비드",
      "birthYear": 1748,
      "deathYear": 1825,
      "bioShort": "영웅의 위풍당당한 기개를 극대화한 신고전주의의 대표 선전화."
    },
    "year": "1801년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg/960px-David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg/960px-David_-_Napoleon_crossing_the_Alps_-_Malmaison1.jpg",
    "styleTag": "신고전주의",
    "museum": "비엔나 벨베데레 미술관",
    "isFeatured": false,
    "docentStory": "앞발을 번쩍 든 백마 위에서 붉은 망토를 휘날리며 앞을 가리키는 나폴레옹의 영웅적 카리스마와 바위에 새겨진 한니발, 카이사르의 이름이 전설을 완성합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "grande-odalisque",
    "title": "그랑드 오달리스크",
    "painter": {
      "name": "장 오귀스트 도미니크 앵그르",
      "birthYear": 1780,
      "deathYear": 1867,
      "bioShort": "완벽한 데생과 유려한 곡선의 미학으로 이상화된 인체를 조형."
    },
    "year": "1814년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Grande_odalisque_%C3%A0_la_culotte_bayad%C3%A8re_-_Henri_Matisse.jpg/1280px-Grande_odalisque_%C3%A0_la_culotte_bayad%C3%A8re_-_Henri_Matisse.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Grande_odalisque_%C3%A0_la_culotte_bayad%C3%A8re_-_Henri_Matisse.jpg/1280px-Grande_odalisque_%C3%A0_la_culotte_bayad%C3%A8re_-_Henri_Matisse.jpg",
    "styleTag": "신고전주의",
    "museum": "파리 루브르 박물관",
    "isFeatured": false,
    "docentStory": "터키 후궁의 여인을 그린 이 누드화는 해부학적 정확성보다 우아한 곡선미를 위해 척추뼈를 서너 개 더 늘려 그렸다는 평을 들을 만큼 극도로 탐미적인 선의 아름다움을 자랑합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-gleaners",
    "title": "이삭 줍는 여인들",
    "painter": {
      "name": "장 프랑수아 밀레",
      "birthYear": 1814,
      "deathYear": 1875,
      "bioShort": "대지와 땀 흘리는 농민들의 소박한 노동에 깃든 성스러운 존엄성."
    },
    "year": "1857년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg/1280px-Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg/1280px-Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
    "styleTag": "사실주의 / 바르비종파",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "수확이 끝난 황금빛 들판에서 바닥에 떨어진 낟알을 묵묵히 줍는 가난한 세 여인의 굽은 등입니다. 대지와 하나 된 노동의 숭고함이 차분한 황금빛 노을 속에 빛납니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-angelus",
    "title": "만종",
    "painter": {
      "name": "장 프랑수아 밀레",
      "birthYear": 1814,
      "deathYear": 1875,
      "bioShort": "저녁 노을 속 울려 퍼지는 교회의 종소리와 부부의 경건한 기도."
    },
    "year": "1857-1859년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg/1280px-Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg/1280px-Jean-Fran%C3%A7ois_Millet_-_The_Angelus_-_Google_Art_Project.jpg",
    "styleTag": "사실주의 / 바르비종파",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "하루 일과를 마친 감자밭에서 멀리 교회당의 삼종기도 종소리를 들으며 손을 모으고 고개 숙여 감사 기도를 올리는 젊은 농부 부부의 경건한 실루엣입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-sower",
    "title": "씨 뿌리는 사람",
    "painter": {
      "name": "장 프랑수아 밀레",
      "birthYear": 1814,
      "deathYear": 1875,
      "bioShort": "훗날 반 고흐에게 지대한 영감을 준 강인한 대지의 생명력."
    },
    "year": "1850년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg/960px-Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg/960px-Jean-Fran%C3%A7ois_Millet_-_The_Sower_-_Google_Art_Project.jpg",
    "styleTag": "사실주의 / 바르비종파",
    "museum": "보스턴 미술관",
    "isFeatured": false,
    "docentStory": "어스름한 새벽 황야를 가르며 힘차게 씨앗을 뿌리는 농부의 거대한 보폭과 역동적인 신체가 마치 대지의 지배자처럼 웅장하게 서 있습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "burial-at-ornans",
    "title": "오르낭의 매장",
    "painter": {
      "name": "귀스타브 쿠르베",
      "birthYear": 1819,
      "deathYear": 1877,
      "bioShort": "“천사를 보여주면 천사를 그리겠다” - 사실주의의 거장."
    },
    "year": "1849-1850년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg/1280px-Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg/1280px-Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg",
    "styleTag": "사실주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "영웅이나 성인이 아닌 시골 오르낭 마을 평범한 주민의 실제 장례식을 거대한 6미터 화폭에 사실 그대로 담아내어 아카데미즘 미술의 위선을 통타파했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "ophelia",
    "title": "오펠리아",
    "painter": {
      "name": "존 에버렛 밀레이",
      "birthYear": 1829,
      "deathYear": 1896,
      "bioShort": "셰익스피어 비극의 슬픔과 자연 식물학의 극도로 정밀한 세밀화."
    },
    "year": "1851-1852년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1280px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1280px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
    "styleTag": "라파엘전파",
    "museum": "런던 테이트 브리튼",
    "isFeatured": false,
    "docentStory": "햄릿에게 버림받고 미쳐버린 오펠리아가 꽃을 꺾다가 시냇물에 빠져 노래를 부르며 서서히 가라앉는 애처로운 순간입니다. 시냇가의 버드나무와 수초의 정밀한 묘사가 압권입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-lady-of-shalott",
    "title": "샬롯의 여인",
    "painter": {
      "name": "존 윌리엄 워터하우스",
      "birthYear": 1849,
      "deathYear": 1917,
      "bioShort": "중세 아서 왕 전설의 신비로운 비극과 감미로운 낭만주의적 회화."
    },
    "year": "1888년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg/1280px-John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg/1280px-John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project.jpg",
    "styleTag": "라파엘전파 / 낭만주의",
    "museum": "런던 테이트 브리튼",
    "isFeatured": false,
    "docentStory": "저주에 걸려 거울로만 바깥세상을 보던 여인이 기사 랜슬롯을 보고 사랑에 빠져, 죽음의 운명을 안고 나룻배를 타고 카멜롯으로 향하는 서글픈 순간입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "proserpine",
    "title": "프로세르피나",
    "painter": {
      "name": "단테 가브리엘 로세티",
      "birthYear": 1828,
      "deathYear": 1882,
      "bioShort": "지하 명계에 갇힌 비운의 여신과 석류 한 알의 유혹."
    },
    "year": "1874년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg/960px-Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg/960px-Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg",
    "styleTag": "라파엘전파",
    "museum": "런던 테이트 브리튼",
    "isFeatured": false,
    "docentStory": "지하 세계의 왕 하데스에게 납치되어 명계의 석류알을 먹어버린 페르세포네의 우수 어린 옆얼굴입니다. 모델 제인 모리스의 깊은 눈망울과 푸른 옷의 음영이 신비롭습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "judith-i",
    "title": "유디트 I",
    "painter": {
      "name": "구스타프 클림트",
      "birthYear": 1862,
      "deathYear": 1918,
      "bioShort": "관능적인 황금빛 장식과 치명적인 팜므 파탈의 미소."
    },
    "year": "1901년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/9/92/Gustav_Klimt_039.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/9/92/Gustav_Klimt_039.jpg",
    "styleTag": "아르누보 / 상징주의",
    "museum": "비엔나 벨베데레 미술관",
    "isFeatured": false,
    "docentStory": "적장의 목을 자른 성서의 영웅 유디트를 반라의 황금빛 보석 목걸이를 두른 채 황홀경에 빠진 도발적인 빈 사교계 여인으로 재해석한 문제작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "portrait-of-adele-bloch-bauer-i",
    "title": "아델레 블로흐 바우어의 초상 I (우먼 인 골드)",
    "painter": {
      "name": "구스타프 클림트",
      "birthYear": 1862,
      "deathYear": 1918,
      "bioShort": "‘오스트리아의 모나리자’로 불리는 눈부신 황금 모자이크의 정점."
    },
    "year": "1907년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gustav_Klimt_046.jpg/960px-Gustav_Klimt_046.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gustav_Klimt_046.jpg/960px-Gustav_Klimt_046.jpg",
    "styleTag": "아르누보 / 상징주의",
    "museum": "뉴욕 노이에 갈러리",
    "isFeatured": false,
    "docentStory": "실제 금박과 은박을 입힌 복잡한 기하학적 눈동자와 나선 문양 속에서 아델레 부인의 우아하고 섬세한 얼굴과 두 손이 빛나는 클림트 황금시대의 불후의 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "death-and-life",
    "title": "죽음과 삶",
    "painter": {
      "name": "구스타프 클림트",
      "birthYear": 1862,
      "deathYear": 1918,
      "bioShort": "인간 생명의 다채로운 꽃다발과 그것을 지켜보는 사신의 대치."
    },
    "year": "1910-1915년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Gustav_Klimt_-_Death_and_Life_-_Google_Art_Project.jpg/1280px-Gustav_Klimt_-_Death_and_Life_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Gustav_Klimt_-_Death_and_Life_-_Google_Art_Project.jpg/1280px-Gustav_Klimt_-_Death_and_Life_-_Google_Art_Project.jpg",
    "styleTag": "아르누보 / 상징주의",
    "museum": "비엔나 레오폴트 미술관",
    "isFeatured": false,
    "docentStory": "왼쪽의 음산한 해골 사신이 곤봉을 든 채, 오른쪽의 포옹하는 연인과 젖을 먹이는 어머니 등 삶의 따스한 생명체들을 지켜보는 생과 사의 거대한 서사시입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "self-portrait-with-physalis",
    "title": "꽈리 열매가 있는 자화상",
    "painter": {
      "name": "에곤 실레",
      "birthYear": 1890,
      "deathYear": 1918,
      "bioShort": "날카로운 선과 왜곡된 인체로 영혼의 불안과 도발적 자아를 표출."
    },
    "year": "1912년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg/960px-Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg/960px-Egon_Schiele_-_Self-Portrait_with_Physalis_-_Google_Art_Project.jpg",
    "styleTag": "표현주의",
    "museum": "비엔나 레오폴트 미술관",
    "isFeatured": false,
    "docentStory": "삐딱하게 고개를 기울인 채 도발적인 시선으로 관람자를 꿰뚫어 보는 22세 실레의 자화상으로, 가녀린 꽈리 열매 줄기와 신경질적인 윤곽선이 강렬합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-last-supper",
    "title": "최후의 만찬",
    "painter": {
      "name": "레오나르도 다 빈치",
      "birthYear": 1452,
      "deathYear": 1519,
      "bioShort": "“너희 중 하나가 나를 배반하리라” - 순간의 감정을 심리학적으로 포착."
    },
    "year": "1495-1498년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    "styleTag": "르네상스",
    "museum": "밀라노 산타 마리아 델레 그라치에 성당",
    "isFeatured": false,
    "docentStory": "예수의 폭탄선언에 놀란 열두 제자들의 분노, 슬픔, 의심이 3명씩 4개의 무리로 드라마틱하게 교차하는 일점 투시원근법의 불후의 금자탑입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "lady-with-an-ermine",
    "title": "흰 족제비를 안은 여인",
    "painter": {
      "name": "레오나르도 다 빈치",
      "birthYear": 1452,
      "deathYear": 1519,
      "bioShort": "살아 숨 쉬는 듯한 생동감과 지성미를 품은 체칠리아 갈레라니의 초상."
    },
    "year": "1489-1490년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/960px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/960px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
    "styleTag": "르네상스",
    "museum": "크라쿠프 차르토리스키 미술관",
    "isFeatured": false,
    "docentStory": "밀라노 공작의 연인이자 시인이었던 16세 체칠리아의 고결한 미모와 그녀의 품에 안겨 긴장한 채 고개를 돌린 순백의 족제비 털 질감이 경이롭습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-annunciation-da-vinci",
    "title": "수태고지",
    "painter": {
      "name": "레오나르도 다 빈치",
      "birthYear": 1452,
      "deathYear": 1519,
      "bioShort": "천사 가브리엘이 성모 마리아에게 그리스도 잉태를 알리는 청아한 정원."
    },
    "year": "1472-1475년경",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg/1280px-Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg/1280px-Leonardo_da_Vinci_-_Annunciazione_-_Google_Art_Project.jpg",
    "styleTag": "르네상스",
    "museum": "피렌체 우피치 미술관",
    "isFeatured": false,
    "docentStory": "피렌체 팔라초 정원에서 순결의 백합을 든 가브리엘 천사와 단정한 성모 마리아, 그리고 뒤편으로 아스라이 멀어지는 대기원근법의 산악 풍경이 평화롭습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "school-of-athens",
    "title": "아테네 학당",
    "painter": {
      "name": "라파엘로 산치오",
      "birthYear": 1483,
      "deathYear": 1520,
      "bioShort": "고대 그리스 철학과 르네상스 인문주의의 조화로운 이상향."
    },
    "year": "1509-1511년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    "styleTag": "르네상스",
    "museum": "바티칸 사도 궁전",
    "isFeatured": false,
    "docentStory": "하늘을 가리키는 플라톤과 땅을 가리키는 아리스토텔레스를 중심으로 소크라테스, 피타고라스, 유클리드 등 시대를 초월한 위대한 지성들이 한자리에 모인 지혜의 전당입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "sistine-madonna",
    "title": "시스티나의 성모",
    "painter": {
      "name": "라파엘로 산치오",
      "birthYear": 1483,
      "deathYear": 1520,
      "bioShort": "하단에 기대어 턱을 괸 장난스러운 두 아기 천사로 유명한 걸작."
    },
    "year": "1512-1513년경",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg/960px-RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg/960px-RAFAEL_-_Madonna_Sixtina_%28Gem%C3%A4ldegalerie_Alter_Meister%2C_Dresden%2C_1513-14._%C3%93leo_sobre_lienzo%2C_265_x_196_cm%29.jpg",
    "styleTag": "르네상스",
    "museum": "드레스덴 거장 미술관",
    "isFeatured": false,
    "docentStory": "구름을 밟고 지상으로 내려오는 자애로운 성모 마리아와 아기 예수, 그리고 하단 난간에 턱을 괴고 멍하니 위를 쳐다보는 유명한 두 천사의 사랑스러움이 돋보입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "primavera",
    "title": "프리마베라 (봄)",
    "painter": {
      "name": "산드로 보티첼리",
      "birthYear": 1445,
      "deathYear": 1510,
      "bioShort": "오렌지 숲에서 춤추는 삼미신과 꽃의 여신 플로라의 우아한 축제."
    },
    "year": "1482년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1280px-Botticelli-primavera.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1280px-Botticelli-primavera.jpg",
    "styleTag": "르네상스",
    "museum": "피렌체 우피치 미술관",
    "isFeatured": false,
    "docentStory": "사랑과 미의 여신 비너스의 정원에서 꽃을 흩뿌리는 봄의 여신 플로라와 손을 잡고 춤추는 삼미신의 시적 리듬감이 500여 종의 실제 꽃들과 함께 피어납니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "venus-of-urbino",
    "title": "우르비노의 비너스",
    "painter": {
      "name": "티치아노 베첼리오",
      "birthYear": 1488,
      "deathYear": 1576,
      "bioShort": "베네치아 화파의 황홀한 황금빛 색채와 관능적인 여성미의 원형."
    },
    "year": "1538년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg/1280px-Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg/1280px-Tiziano_-_Venere_di_Urbino_-_Google_Art_Project.jpg",
    "styleTag": "르네상스",
    "museum": "피렌체 우피치 미술관",
    "isFeatured": false,
    "docentStory": "침상에 비스듬히 누워 오른손에 장미꽃을 쥐고 관람자를 유혹하듯 바라보는 신부의 눈빛과 발치에 잠든 충성의 상징인 강아지가 로맨틱한 분위기를 완성합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "arnolfini-portrait",
    "title": "아르놀피니 부부의 초상",
    "painter": {
      "name": "얀 반 에이크",
      "birthYear": 1390,
      "deathYear": 1441,
      "bioShort": "유화 물감의 기법을 완성한 극사실주의 디테일의 기적."
    },
    "year": "1434년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/960px-Van_Eyck_-_Arnolfini_Portrait.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/960px-Van_Eyck_-_Arnolfini_Portrait.jpg",
    "styleTag": "북유럽 르네상스",
    "museum": "런던 내셔널 갤러리",
    "isFeatured": false,
    "docentStory": "이탈리아 상인 부부의 혼약 장면으로, 뒷벽 볼록거울 속에 비친 화가 자신의 모습과 천장의 촛불 하나, 바닥의 강아지까지 모든 사물이 정교한 상징성을 담고 있습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "garden-of-earthly-delights",
    "title": "세속적인 쾌락의 동산",
    "painter": {
      "name": "히에로니무스 보스",
      "birthYear": 1450,
      "deathYear": 1516,
      "bioShort": "초현실주의를 400년 앞선 기괴하고 환상적인 상상력의 삼연제단화."
    },
    "year": "1490-1510년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg/1280px-El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg/1280px-El_jard%C3%ADn_de_las_Delicias%2C_de_El_Bosco.jpg",
    "styleTag": "북유럽 르네상스",
    "museum": "마드리드 프라도 미술관",
    "isFeatured": false,
    "docentStory": "에덴동산의 창조에서 중앙의 온갖 기상천외한 쾌락에 빠진 인간들, 그리고 우측의 잔혹하고 기괴한 지옥의 풍경까지 인간의 욕망과 타락을 무한한 환상성으로 폭로합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "tower-of-babel",
    "title": "바벨탑",
    "painter": {
      "name": "피터 브뢰헬 (피터르 브뤼헐)",
      "birthYear": 1525,
      "deathYear": 1569,
      "bioShort": "인간의 오만함과 거대한 건축의 세밀한 노동을 조망한 파노라마."
    },
    "year": "1563년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/1280px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/1280px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg",
    "styleTag": "북유럽 르네상스",
    "museum": "비엔나 미술사 박물관",
    "isFeatured": false,
    "docentStory": "하늘에 닿으려 했던 바벨탑의 거대한 구조물과 그 안에서 개미처럼 일하는 무수한 석공들, 그리고 이미 기초부터 기울어지기 시작한 탑의 운명을 풍자했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "hunters-in-the-snow",
    "title": "눈 속의 사냥꾼",
    "painter": {
      "name": "피터 브뢰헬",
      "birthYear": 1525,
      "deathYear": 1569,
      "bioShort": "차가운 백설의 대지와 스케이트 타는 마을 사람들의 따스한 생명력."
    },
    "year": "1565년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg/1280px-Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg/1280px-Pieter_Bruegel_the_Elder_-_Hunters_in_the_Snow_%28Winter%29_-_Google_Art_Project.jpg",
    "styleTag": "북유럽 르네상스",
    "museum": "비엔나 미술사 박물관",
    "isFeatured": false,
    "docentStory": "사냥을 마치고 지친 사냥개들과 함께 언덕을 내려오는 사냥꾼들과 저 멀리 얼어붙은 연못에서 썰매와 스케이트를 지치는 활기찬 마을 풍경이 겨울의 시를 읊습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "durer-young-hare",
    "title": "어린 산토끼",
    "painter": {
      "name": "알브레히트 뒤러",
      "birthYear": 1471,
      "deathYear": 1528,
      "bioShort": "독일 르네상스의 거장. 털 한 올까지 살아 숨 쉬는 경이로운 자연 관찰."
    },
    "year": "1502년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg/960px-Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg/960px-Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg",
    "styleTag": "독일 르네상스",
    "museum": "비엔나 알베르티나 미술관",
    "isFeatured": false,
    "docentStory": "수채와 구아슈로 웅크린 야생 토끼의 수염, 촉촉한 눈망울, 그리고 털의 세밀한 결을 숨 막히도록 완벽하게 묘사하여 미술사 최고의 동물 세밀화로 손꼽힙니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "red-fuji",
    "title": "붉은 후지산 (개풍쾌청)",
    "painter": {
      "name": "카츠시카 호쿠사이",
      "birthYear": 1760,
      "deathYear": 1849,
      "bioShort": "초가을 이른 아침 햇살에 붉게 물든 성산 후지의 장엄한 실루엣."
    },
    "year": "1831년경",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Katsushika_Hokusai%2C_published_by_Nishimuraya_Yohachi_%28Eijud%C5%8D%29_-_Fine_Wind%2C_Clear_Weather_%28Gaif%C5%AB_kaisei%29%2C_also_known_as_Red_Fuji%2C_from_the_series_Thirty-six_Views_o..._-_Google_Art_Project_-_Cropped.jpg/1280px-thumbnail.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Katsushika_Hokusai%2C_published_by_Nishimuraya_Yohachi_%28Eijud%C5%8D%29_-_Fine_Wind%2C_Clear_Weather_%28Gaif%C5%AB_kaisei%29%2C_also_known_as_Red_Fuji%2C_from_the_series_Thirty-six_Views_o..._-_Google_Art_Project_-_Cropped.jpg/1280px-thumbnail.jpg",
    "styleTag": "우키요에",
    "museum": "도쿄 국립박물관 / 보스턴 미술관",
    "isFeatured": false,
    "docentStory": "《후지산 36경》 중 하나로, 구름 한 점 없이 맑은 가을 아침 바람을 맞으며 붉은 적갈색으로 물든 웅장한 후지산의 형태미를 대담하고 미니멀한 판화로 구현했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "sudden-shower-over-shin-ohashi",
    "title": "신 오하시 다리의 소나기",
    "painter": {
      "name": "우타가와 히로시게",
      "birthYear": 1797,
      "deathYear": 1858,
      "bioShort": "사선으로 쏟아지는 빗줄기와 다리를 건너는 서민들의 순간 포착."
    },
    "year": "1857년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg/960px-Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg/960px-Hiroshige%2C_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake%2C_1857.jpg",
    "styleTag": "우키요에",
    "museum": "도쿄 국립박물관",
    "isFeatured": false,
    "docentStory": "갑작스러운 여름 소나기에 삿갓을 움켜쥐고 다리를 건너는 행인들의 모습을 그렸으며, 고흐가 감탄하여 유화로 직접 모작했을 만큼 서양에 거대한 영감을 준 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "inwang-jesaekdo",
    "title": "인왕제색도 (비 갠 뒤의 인왕산)",
    "painter": {
      "name": "겸재 정선",
      "birthYear": 1676,
      "deathYear": 1759,
      "bioShort": "조선의 산천을 독창적인 필묵으로 담아낸 진경산수화(眞景山水畵)의 성인."
    },
    "year": "1751년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg",
    "styleTag": "조선 국보 회화",
    "museum": "국립중앙박물관 (국보 제216호)",
    "isFeatured": false,
    "docentStory": "여름 장맛비가 막 개어 안개가 자욱하게 피어오르는 인왕산 치마바위의 묵직한 물기를 대담한 흑갈색 붓질로 뿜어낸 조선 회화사 최고의 불후의 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "geumgang-jeondo",
    "title": "금강전도 (금강산 일만이천봉)",
    "painter": {
      "name": "겸재 정선",
      "birthYear": 1676,
      "deathYear": 1759,
      "bioShort": "금강산의 일만이천봉을 원형 구도로 압축 조망한 조선 회화의 절정."
    },
    "year": "1734년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Jeong_Seon-Geumgangjeondo.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Jeong_Seon-Geumgangjeondo.jpg",
    "styleTag": "조선 국보 회화",
    "museum": "호암미술관 (국보 제217호)",
    "isFeatured": false,
    "docentStory": "금강산 일만이천봉의 빼어난 바위산과 흙산을 음양의 조화로 한눈에 내려다보듯 둥근 구도 속에 담아낸 겸재 진경산수의 최고 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "ssireum-kim-hongdo",
    "title": "단원 풍속도첩: 씨름",
    "painter": {
      "name": "단원 김홍도",
      "birthYear": 1745,
      "deathYear": 1806,
      "bioShort": "조선 서민들의 활기찬 웃음과 해학을 역동적인 원형 구도로 승화시킨 천재."
    },
    "year": "18세기 후반",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Danwon_Ssireum.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Danwon_Ssireum.jpg",
    "styleTag": "조선 국보 회화",
    "museum": "국립중앙박물관 (보물 제527호)",
    "isFeatured": false,
    "docentStory": "모래판에서 용을 쓰는 두 장사와 이를 둘러싼 엿장수, 부채 든 양반, 긴장한 구경꾼들의 다채로운 시선 처리가 원형 구도 속에서 절묘한 해학을 뿜어냅니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "portrait-of-a-beauty-shin-yunbok",
    "title": "혜원 전신첩: 미인도",
    "painter": {
      "name": "혜원 신윤복",
      "birthYear": 1758,
      "deathYear": 1814,
      "bioShort": "섬세하고 매혹적인 필선으로 조선 여인의 기품과 숨결을 담아낸 대가."
    },
    "year": "18세기 말-19세기 초",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/Hyewon-Miindo.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/Hyewon-Miindo.jpg",
    "styleTag": "조선 국보 회화",
    "museum": "간송미술관 (보물 제1973호)",
    "isFeatured": false,
    "docentStory": "‘가슴속에 품은 온갖 정을 붓끝으로 전하노라’는 제발처럼, 살포시 노리개를 만지작거리는 얹은머리 여인의 단아하면서도 은은한 눈빛과 한복의 선이 경이롭습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "chochungdo-shin-saimdang",
    "title": "초충도: 수박과 들쥐",
    "painter": {
      "name": "신사임당",
      "birthYear": 1504,
      "deathYear": 1551,
      "bioShort": "풀과 벌레, 채소의 생명을 따스하고 정갈한 시선으로 관조한 여류 거장."
    },
    "year": "16세기",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Shin.Saimdang-Chochungdo-01.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Shin.Saimdang-Chochungdo-01.jpg",
    "styleTag": "조선 국보 회화",
    "museum": "국립중앙박물관",
    "isFeatured": false,
    "docentStory": "잘 익은 붉은 수박을 갉아먹는 들쥐 두 마리와 패랭이꽃, 나비들의 조화로운 어우러짐이 생명에 대한 따스한 애정과 풍요의 기원을 정갈한 채색으로 보여줍니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "water-lilies-green-reflection",
    "title": "수련 - 초록빛 반영",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "클로드 모네의 대표 명작 컬렉션."
    },
    "year": "1920-1926년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg/1280px-Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg/1280px-Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "파리 오랑주리 미술관",
    "isFeatured": false,
    "docentStory": "모네 만년의 대작으로, 수련과 버드나무의 반영이 수면 위에 녹아들어 추상에 가까운 명상적 세계를 펼칩니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "san-giorgio-maggiore-monet",
    "title": "황혼의 산 조르조 마조레",
    "painter": {
      "name": "클로드 모네",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "클로드 모네의 대표 명작 컬렉션."
    },
    "year": "1908년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Claude_Monet%2C_Saint-Georges_majeur_au_cr%C3%A9puscule.jpg/1280px-Claude_Monet%2C_Saint-Georges_majeur_au_cr%C3%A9puscule.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Claude_Monet%2C_Saint-Georges_majeur_au_cr%C3%A9puscule.jpg/1280px-Claude_Monet%2C_Saint-Georges_majeur_au_cr%C3%A9puscule.jpg",
    "styleTag": "인상주의",
    "museum": "카디프 국립박물관",
    "isFeatured": false,
    "docentStory": "베네치아 바다 위로 물드는 보랏빛과 황금빛 황혼 속에 우뚝 솟은 성당의 신비로운 실루엣입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "starry-night-over-the-rhone",
    "title": "론 강의 별이 빛나는 밤",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "빈센트 반 고흐의 대표 명작 컬렉션."
    },
    "year": "1888년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/1280px-Starry_Night_Over_the_Rhone.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/1280px-Starry_Night_Over_the_Rhone.jpg",
    "styleTag": "후기 인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "강물에 길게 드리운 아를 시가지 가스등의 노란 불빛 반영과 북두칠성이 수놓인 로맨틱한 밤풍경입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "red-vineyard-at-arles",
    "title": "아를의 붉은 포도밭",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "빈센트 반 고흐의 대표 명작 컬렉션."
    },
    "year": "1888년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Vincent_van_Gogh_-_Red_Vineyard_at_Arles_%281888%29.jpg/1280px-Vincent_van_Gogh_-_Red_Vineyard_at_Arles_%281888%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/Vincent_van_Gogh_-_Red_Vineyard_at_Arles_%281888%29.jpg/1280px-Vincent_van_Gogh_-_Red_Vineyard_at_Arles_%281888%29.jpg",
    "styleTag": "후기 인상주의",
    "museum": "모스크바 푸시킨 미술관",
    "isFeatured": false,
    "docentStory": "고흐 생전에 공식적으로 유일하게 판매되었던 작품으로, 가을 햇살에 불타오르는 포도밭의 노동을 담았습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "church-at-auvers",
    "title": "오베르의 교회",
    "painter": {
      "name": "빈센트 반 고흐",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "빈센트 반 고흐의 대표 명작 컬렉션."
    },
    "year": "1890년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise%2C_View_from_the_Chevet_-_Google_Art_Project.jpg/960px-Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise%2C_View_from_the_Chevet_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise%2C_View_from_the_Chevet_-_Google_Art_Project.jpg/960px-Vincent_van_Gogh_-_The_Church_in_Auvers-sur-Oise%2C_View_from_the_Chevet_-_Google_Art_Project.jpg",
    "styleTag": "후기 인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "꿈틀거리는 코발트블루 하늘 아래 지어진 고딕 교회의 왜곡된 윤곽선이 화가의 깊은 영혼의 전율을 드러냅니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "dance-at-bougival",
    "title": "부지발의 무도회",
    "painter": {
      "name": "피에르 오귀스트 르누아르",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "피에르 오귀스트 르누아르의 대표 명작 컬렉션."
    },
    "year": "1883년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Dance-At-Bougival.jpg/960px-Dance-At-Bougival.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Dance-At-Bougival.jpg/960px-Dance-At-Bougival.jpg",
    "styleTag": "인상주의",
    "museum": "보스턴 미술관",
    "isFeatured": false,
    "docentStory": "밀짚모자를 쓴 남성과 붉은 보닛을 쓴 여인의 다정한 왈츠 춤사위가 바이올렛 향기처럼 달콤합니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "two-sisters-on-terrace",
    "title": "두 자매 (테라스에서)",
    "painter": {
      "name": "피에르 오귀스트 르누아르",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "피에르 오귀스트 르누아르의 대표 명작 컬렉션."
    },
    "year": "1881년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Pierre-Auguste_Renoir_-_Two_Sisters_%28On_the_Terrace%29_-_Google_Art_Project.jpg/960px-Pierre-Auguste_Renoir_-_Two_Sisters_%28On_the_Terrace%29_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Pierre-Auguste_Renoir_-_Two_Sisters_%28On_the_Terrace%29_-_Google_Art_Project.jpg/960px-Pierre-Auguste_Renoir_-_Two_Sisters_%28On_the_Terrace%29_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "시카고 미술관",
    "isFeatured": false,
    "docentStory": "화려한 털실 바구니를 앞에 두고 테라스 난간에 앉은 두 소녀의 맑고 투명한 도자기 피부와 생기가 넘쳐납니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "dancers-in-pink",
    "title": "분홍 옷을 입은 무용수들",
    "painter": {
      "name": "에드가 드가",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "에드가 드가의 대표 명작 컬렉션."
    },
    "year": "1884년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Edgar_Degas_-_Dancer_Adjusting_Her_Slipper_-_Google_Art_Project.jpg/960px-Edgar_Degas_-_Dancer_Adjusting_Her_Slipper_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Edgar_Degas_-_Dancer_Adjusting_Her_Slipper_-_Google_Art_Project.jpg/960px-Edgar_Degas_-_Dancer_Adjusting_Her_Slipper_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "보스턴 미술관",
    "isFeatured": false,
    "docentStory": "무대 조명 아래 화려하게 빛나는 핑크빛 튀튀 드레스와 무용수들의 역동적인 팔다리 교차가 아름답습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-cradle-morisot",
    "title": "요람",
    "painter": {
      "name": "베르트 모리조",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "베르트 모리조의 대표 명작 컬렉션."
    },
    "year": "1872년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg/960px-Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg/960px-Berthe_Morisot_-_The_Cradle_-_Google_Art_Project.jpg",
    "styleTag": "인상주의",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "인상파 최초의 여성 거장 모리조가 여동생 에드마가 잠든 아기를 사랑스럽게 지켜보는 모성애를 그렸습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "in-the-conservatory",
    "title": "온실에서",
    "painter": {
      "name": "에두아르 마네",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "에두아르 마네의 대표 명작 컬렉션."
    },
    "year": "1879년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/In_the_Conservatory.jpg/1280px-In_the_Conservatory.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/In_the_Conservatory.jpg/1280px-In_the_Conservatory.jpg",
    "styleTag": "인상주의",
    "museum": "베를린 구국립미술관",
    "isFeatured": false,
    "docentStory": "이국적인 열대 식물이 우거진 온실 벤치에 앉은 귀부인과 펜스 너머 신사의 미묘한 심리적 거리를 묘사했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "olympia-manet",
    "title": "올랭피아",
    "painter": {
      "name": "에두아르 마네",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "에두아르 마네의 대표 명작 컬렉션."
    },
    "year": "1863년",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg/1280px-Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg/1280px-Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg",
    "styleTag": "모더니즘",
    "museum": "파리 오르세 미술관",
    "isFeatured": false,
    "docentStory": "신화의 비너스가 아닌 당대 현실의 여성이 당당하고 직설적인 눈빛으로 관람자를 응시하는 모더니즘의 이정표.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "still-life-with-cherub",
    "title": "석고 큐피드가 있는 정물",
    "painter": {
      "name": "폴 세잔",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "폴 세잔의 대표 명작 컬렉션."
    },
    "year": "1894년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Nature_morte_au_Ch%C3%A9rubin%2C_par_Paul_C%C3%A9zanne.jpg/960px-Nature_morte_au_Ch%C3%A9rubin%2C_par_Paul_C%C3%A9zanne.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Nature_morte_au_Ch%C3%A9rubin%2C_par_Paul_C%C3%A9zanne.jpg/960px-Nature_morte_au_Ch%C3%A9rubin%2C_par_Paul_C%C3%A9zanne.jpg",
    "styleTag": "후기 인상주의",
    "museum": "런던 코톨드 갤러리",
    "isFeatured": false,
    "docentStory": "석고 조각과 과일, 양파, 캔버스가 어우러져 회화적 공간의 깊이와 평면성을 다차원적으로 실험한 걸작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "the-yellow-christ",
    "title": "황색의 그리스도",
    "painter": {
      "name": "폴 고갱",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "폴 고갱의 대표 명작 컬렉션."
    },
    "year": "1889년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Paul_Gauguin_-_Le_Christ_jaune_%281889%29.jpg/960px-Paul_Gauguin_-_Le_Christ_jaune_%281889%29.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Paul_Gauguin_-_Le_Christ_jaune_%281889%29.jpg/960px-Paul_Gauguin_-_Le_Christ_jaune_%281889%29.jpg",
    "styleTag": "상징주의",
    "museum": "올브라이트 녹스 미술관",
    "isFeatured": false,
    "docentStory": "브르타뉴 가을 들판의 노란 수확 풍경과 순박한 농촌 여인들의 소박한 신앙심을 황색의 십자가로 결합했습니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "jane-avril-lautrec",
    "title": "잔 아브릴 포스터",
    "painter": {
      "name": "앙리 드 툴루즈 로트레크",
      "birthYear": 1850,
      "deathYear": 1920,
      "bioShort": "앙리 드 툴루즈 로트레크의 대표 명작 컬렉션."
    },
    "year": "1893년",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Henri_de_Toulouse-Lautrec_-_Jane_Avril_-_Google_Art_Project.jpg/960px-Henri_de_Toulouse-Lautrec_-_Jane_Avril_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Henri_de_Toulouse-Lautrec_-_Jane_Avril_-_Google_Art_Project.jpg/960px-Henri_de_Toulouse-Lautrec_-_Jane_Avril_-_Google_Art_Project.jpg",
    "styleTag": "아르누보",
    "museum": "메트로폴리탄 미술관",
    "isFeatured": false,
    "docentStory": "콘트라베이스의 과감한 프레이밍과 캉캉 춤을 추는 댄서의 긴 다리가 돋보이는 그래픽 포스터의 전설.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "fifty-three-stations-tokaido",
    "title": "도카이도 53차: 쇼노의 소나기",
    "painter": {
      "name": "우타가와 히로시게",
      "birthYear": 1797,
      "deathYear": 1858,
      "bioShort": "서정적인 풍경 판화로 일본 전국의 명소와 계절의 서정을 노래한 거장."
    },
    "year": "1833년경",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Utagawa_Hiroshige_%28the_first%29_-_Shono_from_the_Fifty-three_Stations_on_Tokaido_Highway%2C_Hoeido_version_-_Google_Art_Project.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Utagawa_Hiroshige_%28the_first%29_-_Shono_from_the_Fifty-three_Stations_on_Tokaido_Highway%2C_Hoeido_version_-_Google_Art_Project.jpg",
    "styleTag": "우키요에",
    "museum": "도쿄 국립박물관",
    "isFeatured": false,
    "docentStory": "비바람이 휘몰아치는 비탈길을 삿갓을 푹 눌러쓴 가마꾼들과 나그네들이 허리를 굽히고 달려가는 역동적인 순간을 감각적인 사선 구도로 포착한 명작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  },
  {
    "id": "geisha-kitagawa-utamaro",
    "title": "비드로(유리피리)를 부는 처녀",
    "painter": {
      "name": "키타가와 우타마로",
      "birthYear": 1753,
      "deathYear": 1806,
      "bioShort": "여인의 내면 심리와 미묘한 감정을 섬세한 대두화(大頭畵)로 담아낸 인물화의 대가."
    },
    "year": "1790년대",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flickr_-_%E2%80%A6trialsanderrors_-_Utamaro%2C_Young_lady_blowing_on_a_poppin%2C_1790.jpg",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flickr_-_%E2%80%A6trialsanderrors_-_Utamaro%2C_Young_lady_blowing_on_a_poppin%2C_1790.jpg",
    "styleTag": "우키요에",
    "museum": "도쿄 국립박물관",
    "isFeatured": false,
    "docentStory": "체크무늬 기모노를 입은 젊은 처녀가 유리 피리(포핀)를 입에 물고 소리를 내는 천진난만한 찰나의 표정과 섬세한 옷깃의 선을 담아낸 우타마로의 대표작입니다.",
    "difficulties": [
      {
        "level": "25",
        "gridCols": 5,
        "gridRows": 5,
        "label": "25피스 (입문)"
      },
      {
        "level": "100",
        "gridCols": 10,
        "gridRows": 10,
        "label": "100피스 (보통)"
      },
      {
        "level": "400",
        "gridCols": 20,
        "gridRows": 20,
        "label": "400피스 (달인)"
      }
    ]
  }
];
