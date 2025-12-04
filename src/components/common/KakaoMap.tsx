import React, { useEffect, useRef, useState } from "react";
import busStationList from "../../data/busStationList.json";
import type { BusStation } from "../../types/busStation";

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

// TODO: 실제 내 위치 아이콘 URL로 교체 예정 (현재는 테스트용)
const MY_LOCATION_MAPPIN_ICON =
  "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

const BUS_MARKER_MAPPIN_ICON =
  "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

const KakaoMap: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);

  const myMarkerRef = useRef<any>(null);
  const placesRef = useRef<any>(null);
  const myPositionRef = useRef<any>(null);

  const stationMarkersRef = useRef<any[]>([]);

  const loadKakaoScript = () => {
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

  const drawBusStationMarkers = (kakao: any, map: any) => {
    stationMarkersRef.current.forEach((marker) => marker.setMap(null));
    stationMarkersRef.current = [];

    const busMarkerSize = new kakao.maps.Size(24, 35);
    const busMarkerOption = {
      offset: new kakao.maps.Point(12, 35),
    };

    const busMarkerIcon = new kakao.maps.MarkerImage(
      BUS_MARKER_MAPPIN_ICON,
      busMarkerSize,
      busMarkerOption
    );

    (busStationList as BusStation[]).forEach((station) => {
      const position = new kakao.maps.LatLng(
        station.latitude,
        station.longitude
      );

      const marker = new kakao.maps.Marker({
        position,
        map,
        image: busMarkerIcon,
      });

      const infoWindow = new kakao.maps.InfoWindow({
        content: `
          <div style="padding:6px 8px;font-size:12px;">
            <strong>${station.stationName}</strong><br/>
            <span>${station.information}</span>
          </div>
        `,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });

      stationMarkersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 1) 카카오 스크립트 먼저 로드
    loadKakaoScript()
      .then(() => {
        // 2) 위치 정보 지원 여부 체크
        if (!navigator.geolocation) {
          setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
          return;
        }

        // 3) 내 위치 가져오기
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;

            window.kakao.maps.load(() => {
              const kakao = window.kakao;

              const myPosition = new kakao.maps.LatLng(latitude, longitude);
              myPositionRef.current = myPosition;

              // 4) 내 위치 기준 지도 생성
              const map = new kakao.maps.Map(mapContainerRef.current!, {
                center: myPosition,
                level: 4,
              });

              mapRef.current = map;
              placesRef.current = new kakao.maps.services.Places();

              const iconSize = new kakao.maps.Size(24, 25);
              const iconOption = {
                offset: new kakao.maps.Point(12, 35),
              };

              const myMarkerIcon = new kakao.maps.MarkerImage(
                MY_LOCATION_MAPPIN_ICON,
                iconSize,
                iconOption
              );

              // 5) 내 위치 마커
              myMarkerRef.current = new kakao.maps.Marker({
                position: myPosition,
                map,
                image: myMarkerIcon,
              });

              drawBusStationMarkers(kakao, map);
            });
          },
          () => {
            setError(
              "내 위치를 가져오지 못했습니다. 브라우저 위치 권한을 허용해주세요."
            );
          }
        );
      })
      .catch((e) => {
        console.error(e);
        setError(e instanceof Error ? e.message : "카카오맵 로딩 실패");
      });
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div ref={mapContainerRef} style={{ width: "375px", height: "100dvh" }} />
    </div>
  );
};

export default KakaoMap;
