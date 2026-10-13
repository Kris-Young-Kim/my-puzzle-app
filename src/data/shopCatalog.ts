// 인앱 구매(IAP) 부티크 상품 카탈로그
// 100대 명화 낱개(개당 990원), 테마별 확장팩 번들, 명품 액자 10종, 세계 국립미술관 배경 테마 11종

import {
  ShopPaintingItem,
  ShopPackItem,
  ShopFrameItem,
  ShopWallpaperItem
} from '../types';
import { MASTERPIECES } from './paintings';

// 기본 무료로 제공되는 명화 3선 (입문용)
export const FREE_PAINTING_IDS = ['starry-night', 'pearl-earring', 'the-kiss'];

// 기본 무료 제공 액자
export const FREE_FRAME_STYLES = ['ornate_gold', 'minimal_black', 'natural_oak'];

// 기본 무료 제공 배경
export const FREE_WALLPAPER_STYLES = ['classic_velvet', 'modern_slate', 'gallery_wood'];

// 1. 명화 낱개 구매 상품 (100선 전원 표시, 기본 무료 3선 포함)
export const SHOP_PAINTINGS: ShopPaintingItem[] = MASTERPIECES.map((p) => {
  const isFree = FREE_PAINTING_IDS.includes(p.id);
  return {
    id: p.id,
    type: 'painting',
    title: p.title,
    artist: p.painter.name,
    year: p.year,
    priceKRW: isFree ? 0 : 990,
    priceDisplay: isFree ? '기본 소장' : '₩990',
    imageUrl: p.imageUrl,
    styleTag: p.styleTag,
    description: isFree
      ? `${p.painter.name}의 대표 명작. 모든 관람객에게 입문용으로 기본 무료 제공됩니다.`
      : `${p.painter.name}의 불후의 걸작. 25, 100, 400피스 퍼즐과 전문 도슨트 해설이 영구 해금됩니다.`
  };
});

// 2. 확장팩 패키지 번들 (할인 혜택 제공 - 7대 테마팩)
export const SHOP_PACKS: ShopPackItem[] = [
  {
    id: 'pack-impressionism',
    type: 'pack',
    title: '빛과 색채: 인상주의 컬렉션',
    subtitle: '모네, 르누아르, 드가, 마네 대표작 5점',
    description: '황홀한 햇살의 입자와 감성적인 붓터치를 담은 인상파 거장 5종 컬렉션입니다.',
    priceKRW: 2900,
    priceDisplay: '₩2,900',
    originalPriceDisplay: '₩4,950',
    discountBadge: '41% 할인',
    paintingIds: ['water-lilies', 'woman-with-parasol', 'moulin-de-la-galette', 'ballet-class', 'the-fifer'],
    bannerColor: '#1a334d',
    tag: '베스트셀러',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg/960px-Claude_Monet_-_Woman_with_a_Parasol_-_Madame_Monet_and_Her_Son_-_Google_Art_Project.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg/1280px-Pierre-Auguste_Renoir%2C_Le_Moulin_de_la_Galette.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/1280px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg'
    ]
  },
  {
    id: 'pack-renaissance',
    type: 'pack',
    title: '황금기 유산: 르네상스 3대 거장팩',
    subtitle: '다 빈치, 미켈란젤로, 라파엘로, 보티첼리 5점',
    description: '인류 예술의 정점에 선 르네상스 천재들의 불멸의 걸작 컬렉션입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: ['mona-lisa', 'the-last-supper', 'creation-of-adam', 'school-of-athens', 'birth-of-venus'],
    bannerColor: '#3c2415',
    tag: '강력 추천',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg'
    ]
  },
  {
    id: 'pack-baroque-dutch',
    type: 'pack',
    title: '빛과 어둠의 교향곡: 바로크 걸작팩',
    subtitle: '렘브란트, 카라바조, 벨라스케스, 페르메이르 5점',
    description: '강렬한 명암대비(키아로스쿠로)와 인간 내면의 깊은 영혼을 투영한 걸작들입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: ['the-night-watch', 'calling-of-saint-matthew', 'las-meninas', 'the-milkmaid', 'return-of-prodigal-son'],
    bannerColor: '#2b1d0c',
    tag: '매니아 추천',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggio_%281599-1600%29.jpg/1280px-The_Calling_of_Saint_Matthew-Caravaggio_%281599-1600%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/1280px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg/960px-Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg'
    ]
  },
  {
    id: 'pack-post-impressionism',
    type: 'pack',
    title: '타오르는 영혼: 후기 인상주의 팩',
    subtitle: '반 고흐, 세잔, 고갱, 툴루즈 로트레크 5점',
    description: '강렬한 원색과 과감한 조형성으로 현대 미술의 문을 연 거장 5종 컬렉션입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: ['sunflowers', 'cafe-terrace-at-night', 'mont-sainte-victoire', 'where-do-we-come-from', 'at-the-moulin-rouge'],
    bannerColor: '#382218',
    tag: '인기 폭발',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/960px-Vincent_Willem_van_Gogh_127.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg/960px-Vincent_Willem_van_Gogh_-_Cafe_Terrace_at_Night_%28Yorck%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg/1280px-Paul_C%C3%A9zanne_-_Mont_Sainte-Victoire_-_Google_Art_Project.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Paul_Gauguin_-_D%27ou_venons-nous%2C_que_sommes-nous%2C_ou_allons-nous.jpg/1280px-Paul_Gauguin_-_D%27ou_venons-nous%2C_que_sommes-nous%2C_ou_allons-nous.jpg'
    ]
  },
  {
    id: 'pack-korean-heritage',
    type: 'pack',
    title: '조선의 혼: 대한민국 국보 회화 컬렉션',
    subtitle: '겸재 정선, 단원 김홍도, 혜원 신윤복, 신사임당 국보 5점',
    description: '조선의 산천을 노래한 진경산수화와 서민의 해학, 여인의 기품을 담은 대한민국 자랑스러운 국보·보물 문화유산 컬렉션입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: [
      'inwang-jesaekdo',
      'geumgang-jeondo',
      'ssireum-kim-hongdo',
      'portrait-of-a-beauty-shin-yunbok',
      'chochungdo-shin-saimdang'
    ],
    bannerColor: '#16281e',
    tag: '대한민국 국보',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/0/05/Jeong_Seon-Geumgangjeondo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Danwon_Ssireum.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/69/Hyewon-Miindo.jpg'
    ]
  },
  {
    id: 'pack-ukiyo-e',
    type: 'pack',
    title: '에도의 물결: 우키요에 판화 컬렉션',
    subtitle: '호쿠사이, 히로시게, 우타마로 목판화 5점',
    description: '서양 인상파 화가들에게 거대한 충격을 안긴 에도 시대 전통 목판화 5종 컬렉션입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: [
      'great-wave',
      'red-fuji',
      'sudden-shower-over-shin-ohashi',
      'fifty-three-stations-tokaido',
      'geisha-kitagawa-utamaro'
    ],
    bannerColor: '#1a2a3e',
    tag: '우키요에 판화',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Fuji_red.jpg/1280px-Fuji_red.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Hiroshige_Atake_suudoku.jpg/960px-Hiroshige_Atake_suudoku.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Utamaro_Poppin.jpg/960px-Utamaro_Poppin.jpg'
    ]
  },
  {
    id: 'pack-romanticism-sublime',
    type: 'pack',
    title: '숭고와 격정: 낭만주의 & 사실주의 컬렉션',
    subtitle: '들라크루아, 밀레, 터너, 프리드리히, 밀레이 5점',
    description: '역사의 소용돌이와 대자연의 장엄한 숭고미를 노래한 유럽 명작입니다.',
    priceKRW: 3500,
    priceDisplay: '₩3,500',
    originalPriceDisplay: '₩4,950',
    discountBadge: '30% 할인',
    paintingIds: ['liberty-leading-the-people', 'the-gleaners', 'the-fighting-temeraire', 'wanderer-sea-of-fog', 'ophelia'],
    bannerColor: '#281a2e',
    tag: '감성 컬렉션',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg/1280px-Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg/1280px-The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1280px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg'
    ]
  },
  {
    id: 'pack-all-pass',
    type: 'pack',
    title: '👑 루브르 전당 100선 올인원 마스터 패스',
    subtitle: '100대 세계 명화 전원 영구 해금 + 명품 액자 10종 + 세계 국립미술관 배경 11종',
    description: '루브르, 오르세, 프라도, 내셔널 갤러리 등 인류 문화유산 100점과 모든 액자, 테마를 제약 없이 평생 누리는 최고급 VIP 패스입니다.',
    priceKRW: 9900,
    priceDisplay: '₩9,900',
    originalPriceDisplay: '₩96,000',
    discountBadge: '89% 슈퍼할인',
    paintingIds: MASTERPIECES.map((m) => m.id),
    bannerColor: '#241403',
    tag: 'VIP 마스터',
    includedPaintingsPreview: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/960px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Meisje_met_de_parel.jpg/960px-Meisje_met_de_parel.jpg'
    ]
  }
];

// 3. 명품 액자 상품 (10종 프리미엄 프레임)
export const SHOP_FRAMES: ShopFrameItem[] = [
  {
    id: 'frame-ornate-gold',
    type: 'frame',
    frameStyle: 'ornate_gold',
    title: '앤틱 골드 액자',
    description: '전통적인 미술관 분위기를 연출하는 클래식 골드 도금 액자',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    borderColor: '#d4af37',
    borderWidth: 6,
    glowColor: 'rgba(212, 175, 55, 0.4)',
    isFree: true
  },
  {
    id: 'frame-minimal-black',
    type: 'frame',
    frameStyle: 'minimal_black',
    title: '모던 블랙 액자',
    description: '세련되고 미니멀한 갤러리 감성의 무광 블랙 프레임',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    borderColor: '#111318',
    borderWidth: 5,
    glowColor: 'rgba(255, 255, 255, 0.1)',
    isFree: true
  },
  {
    id: 'frame-natural-oak',
    type: 'frame',
    frameStyle: 'natural_oak',
    title: '내추럴 오크 액자',
    description: '따뜻한 천연 원목 질감으로 아늑한 힐링을 주는 프레임',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    borderColor: '#b3824b',
    borderWidth: 5,
    glowColor: 'rgba(179, 130, 75, 0.3)',
    isFree: true
  },
  {
    id: 'frame-rococo-silver',
    type: 'frame',
    frameStyle: 'rococo_silver',
    title: '로코코 백금 실버 액자',
    description: '섬세하고 우아한 곡선과 눈부신 백금 광택의 프리미엄 프레임',
    priceKRW: 1500,
    priceDisplay: '₩1,500',
    borderColor: '#e2e8f0',
    borderWidth: 6,
    glowColor: 'rgba(226, 232, 240, 0.5)'
  },
  {
    id: 'frame-imperial-marble',
    type: 'frame',
    frameStyle: 'imperial_marble',
    title: '임페리얼 로열 마블 액자',
    description: '고대 그리스·로마 신전 기둥의 순백 대리석 질감 프레임',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    borderColor: '#f1ede4',
    borderWidth: 7,
    glowColor: 'rgba(241, 237, 228, 0.6)'
  },
  {
    id: 'frame-renaissance-baroque',
    type: 'frame',
    frameStyle: 'renaissance_baroque',
    title: '황제 루이 14세 바로크 보석 액자',
    description: '베르사유 궁전 거울의 방을 수놓은 최고급 순금 보석 조각 프레임',
    priceKRW: 2500,
    priceDisplay: '₩2,500',
    borderColor: '#ffd700',
    borderWidth: 8,
    glowColor: 'rgba(255, 215, 0, 0.8)'
  },
  {
    id: 'frame-art-deco-emerald',
    type: 'frame',
    frameStyle: 'art_deco_emerald',
    title: '아르데코 에메랄드 프레임',
    description: '기하학적 황금 문양과 영롱한 에메랄드 보석빛이 조화를 이룬 1920년대 파리 감성',
    priceKRW: 2200,
    priceDisplay: '₩2,200',
    borderColor: '#10b981',
    borderWidth: 7,
    glowColor: 'rgba(16, 185, 129, 0.7)'
  },
  {
    id: 'frame-victorian-rosegold',
    type: 'frame',
    frameStyle: 'victorian_rosegold',
    title: '빅토리안 로즈골드 프레임',
    description: '영국 빅토리아 여왕 시대의 은은하고 사랑스러운 로즈골드 금박 부조',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    borderColor: '#fb7185',
    borderWidth: 6,
    glowColor: 'rgba(251, 113, 133, 0.6)'
  },
  {
    id: 'frame-gothic-obsidian',
    type: 'frame',
    frameStyle: 'gothic_obsidian',
    title: '고딕 흑요석 나이트 프레임',
    description: '칠흑 같은 흑요석 스톤에 은빛 문양이 조각된 신비롭고 무게감 넘치는 프레임',
    priceKRW: 2200,
    priceDisplay: '₩2,200',
    borderColor: '#334155',
    borderWidth: 7,
    glowColor: 'rgba(148, 163, 184, 0.5)'
  },
  {
    id: 'frame-florentine-walnut',
    type: 'frame',
    frameStyle: 'florentine_walnut',
    title: '피렌체 메디치 호두나무 프레임',
    description: '이탈리아 토스카나 장인이 손수 깎아 낸 앤틱 월넛 원목 프레임',
    priceKRW: 1500,
    priceDisplay: '₩1,500',
    borderColor: '#854d0e',
    borderWidth: 6,
    glowColor: 'rgba(133, 77, 14, 0.4)'
  }
];

// 4. 가상 미술관 배경 테마 상품 (11종 세계 국립미술관 테마)
export const SHOP_WALLPAPERS: ShopWallpaperItem[] = [
  {
    id: 'bg-classic-velvet',
    type: 'wallpaper',
    wallpaperStyle: 'classic_velvet',
    title: '딥 버건디 벨벳',
    description: '고전 명화의 색감을 극대화하는 깊이 있는 벨벳 레드 벽면',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    bgColor: '#2e0f14',
    accentColor: '#d4af37',
    isFree: true
  },
  {
    id: 'bg-modern-slate',
    type: 'wallpaper',
    wallpaperStyle: 'modern_slate',
    title: '미드나이트 슬레이트',
    description: '차분하고 묵직한 현대 미술관의 고급스러운 흑요석 벽면',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    bgColor: '#121620',
    accentColor: '#93c5fd',
    isFree: true
  },
  {
    id: 'bg-gallery-wood',
    type: 'wallpaper',
    wallpaperStyle: 'gallery_wood',
    title: '클래식 원목 살롱',
    description: '19세기 살롱 화랑의 클래식 마호가니 원목 인테리어',
    priceKRW: 0,
    priceDisplay: '기본 보유',
    bgColor: '#241a12',
    accentColor: '#f59e0b',
    isFree: true
  },
  {
    id: 'bg-orsay-midnight',
    type: 'wallpaper',
    wallpaperStyle: 'orsay_midnight',
    title: '파리 오르세 심야 살롱',
    description: '세느 강변 달빛과 은은한 가스등 조명이 비추는 낭만적인 오르세 미술관 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#0a1322',
    accentColor: '#38bdf8'
  },
  {
    id: 'bg-louvre-moonlight',
    type: 'wallpaper',
    wallpaperStyle: 'louvre_moonlight',
    title: '루브르 궁전 달빛 회랑',
    description: '루브르 피라미드 아래로 쏟아지는 신비로운 달빛과 왕실의 기품을 담은 퍼플 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#130e24',
    accentColor: '#c084fc'
  },
  {
    id: 'bg-uffizi-marble',
    type: 'wallpaper',
    wallpaperStyle: 'uffizi_marble',
    title: '피렌체 우피치 대리석 홀',
    description: '메디치 가문의 위대한 예술혼이 숨 쉬는 토스카나 웜 다크 대리석 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#1c1b18',
    accentColor: '#fbbf24'
  },
  {
    id: 'bg-belvedere-golden',
    type: 'wallpaper',
    wallpaperStyle: 'belvedere_golden',
    title: '빈 벨베데레 황금 살롱',
    description: '클림트의 황금빛 향연과 오스트리아 황실의 눈부신 아우라를 담은 앰버 골드 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#241808',
    accentColor: '#facc15'
  },
  {
    id: 'bg-rijks-damask',
    type: 'wallpaper',
    wallpaperStyle: 'rijks_damask',
    title: '암스테르담 렘브란트 홀',
    description: '네덜란드 황금기의 품격을 자랑하는 묵직하고 고풍스러운 딥 다마스크 브라운 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#1a1410',
    accentColor: '#eab308'
  },
  {
    id: 'bg-prado-crimson',
    type: 'wallpaper',
    wallpaperStyle: 'prado_crimson',
    title: '마드리드 프라도 궁정 크림슨',
    description: '스페인 펠리페 4세 왕궁의 찬란한 벨벳 크림슨 레드가 뿜어내는 정열의 궁정 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#2a0a10',
    accentColor: '#f43f5e'
  },
  {
    id: 'bg-met-grand-hall',
    type: 'wallpaper',
    wallpaperStyle: 'met_grand_hall',
    title: '뉴욕 메트로폴리탄 그랜드 홀',
    description: '세계 최고의 박물관 그랜드 홀의 장엄한 석회암 아치와 현대적인 모던 그레이 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#14181f',
    accentColor: '#94a3b8'
  },
  {
    id: 'bg-national-emerald',
    type: 'wallpaper',
    wallpaperStyle: 'national_emerald',
    title: '런던 내셔널 갤러리 로열 에메랄드',
    description: '트라팔가 광장의 유서 깊은 전시실을 수놓은 깊고 그윽한 영국식 로열 딥 그린 테마',
    priceKRW: 1900,
    priceDisplay: '₩1,900',
    bgColor: '#061712',
    accentColor: '#10b981'
  }
];
