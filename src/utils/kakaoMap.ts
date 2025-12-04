const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

export const loadKakaoScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }

    if (!KAKAO_MAP_KEY) {
      reject(new Error("KAKAO MAP KEY가 설정되어 있지 않습니다."));
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";

    const src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    script.src = src;

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error("카카오맵 스크립트를 불러오지 못했습니다."));
    };

    document.head.appendChild(script);
  });
};
