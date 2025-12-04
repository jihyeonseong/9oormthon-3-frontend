import { useEffect, useState } from "react";
import { loadKakaoScript } from "../utils/kakaoMap";

export const useGetAddress = () => {
  const [city, setCity] = useState();
  const [village, setVillage] = useState();

  useEffect(() => {
    // 1) 카카오 스크립트 먼저 로드
    loadKakaoScript()
      .then(() => {
        // 2) 위치 정보 지원 여부 체크
        if (!navigator.geolocation) {
          return;
        }

        // 3) 내 위치 가져오기
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;

          window.kakao.maps.load(() => {
            const kakao = window.kakao;

            const coord = new kakao.maps.LatLng(latitude, longitude);
            var geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              coord.getLng(),
              coord.getLat(),
              (result: any) => {
                setCity(result[0].road_address.region_2depth_name);
                setVillage(result[0].road_address.region_3depth_name);
              }
            );
          });
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return { city, village };
};
