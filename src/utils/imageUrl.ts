// 모바일 및 웹 환경에서 이미지 차단(403/429) 방지 및 초고속 CDN 캐싱 헬퍼
// Wikimedia Commons는 OkHttp(안드로이드 기본 클라이언트)의 요청을 403 Forbidden으로 차단합니다.
// wsrv.nl 글로벌 Cloudflare CDN 프록시를 통해 모바일에서도 100% 안정적으로 고화질 명화를 서빙합니다.

export const getSafeImageUrl = (url?: string, width?: number): string => {
  if (!url || typeof url !== 'string') {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';
  }

  // 로컬 파일이나 data URL은 그대로 반환
  if (url.startsWith('file://') || url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }

  // 이미 wsrv.nl이 적용되어 있으면 그대로 반환
  if (url.includes('wsrv.nl')) {
    return url;
  }

  // 위키미디어(upload.wikimedia.org, commons.wikimedia.org) 이미지인 경우 wsrv.nl 프록시 적용
  if (url.includes('wikimedia.org') || url.includes('wikipedia.org')) {
    const encoded = encodeURIComponent(url);
    const widthParam = width ? `&w=${width}&fit=cover` : '';
    // output=jpg, q=85로 모바일 메모리 절약 및 로딩 속도 최적화
    return `https://wsrv.nl/?url=${encoded}&output=jpg&q=85${widthParam}`;
  }

  return url;
};

// 썸네일용 경량화 URL (가로 400px 기준)
export const getSafeThumbnailUrl = (url?: string): string => {
  return getSafeImageUrl(url, 400);
};
