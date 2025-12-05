import React, { useEffect, useRef, useState } from "react";
import busStationList from "../../data/busStationList.json";
import type { BusStation, SelectedStation } from "../../types/busStation";
import MissionSheet from "../MissionSheet";
import MyMapPin from "../../assets/images/myMapPin.png";
import BusMapPin from "../../assets/images/busMapPin.png";

const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

const MY_LOCATION_MAPPIN_ICON = MyMapPin;

const BUS_MARKER_MAPPIN_ICON = BusMapPin;

const KakaoMap: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStation, setSelectedStation] =
    useState<SelectedStation | null>(null);

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

      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("카카오맵 스크립트를 불러오지 못했습니다."));

      document.head.appendChild(script);
    });
  };

  const drawBusStationMarkers = (kakao: any, map: any) => {
    stationMarkersRef.current.forEach((marker) => marker.setMap(null));
    stationMarkersRef.current = [];

    const busMarkerSize = new kakao.maps.Size(63, 63);
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

      kakao.maps.event.addListener(marker, "click", () => {
        setSelectedStation({
          name: station.stationName,
          stationId: String(station.stationId),
          direction: station.information,
        });
        setIsSheetOpen(true);
      });

      stationMarkersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    loadKakaoScript()
      .then(() => {
        if (!navigator.geolocation) {
          setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;

            window.kakao.maps.load(() => {
              const kakao = window.kakao;

              const myPosition = new kakao.maps.LatLng(latitude, longitude);
              myPositionRef.current = myPosition;

              const map = new kakao.maps.Map(mapContainerRef.current!, {
                center: myPosition,
                level: 4,
              });

              mapRef.current = map;
              placesRef.current = new kakao.maps.services.Places();

              const myIconWidth = 64;
              const myIconHeight = 64;

              const myMarkerSize = new window.kakao.maps.Size(
                myIconWidth,
                myIconHeight
              );
              const myMarkerOption = {
                offset: new window.kakao.maps.Point(
                  myIconWidth / 2,
                  myIconHeight
                ),
              };

              const myMarkerIcon = new window.kakao.maps.MarkerImage(
                MY_LOCATION_MAPPIN_ICON,
                myMarkerSize,
                myMarkerOption
              );

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

      <MissionSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        station={selectedStation}
      />
    </div>
  );
};

export default KakaoMap;
