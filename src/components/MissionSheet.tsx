import { Sheet, Button, Text, Box, VStack } from "@vapor-ui/core";
import { BusInfoList } from "./BusInfoList";
import BusMainImage from "../assets/images/bus-image.png";
import RefreshIcon from "../assets/icons/RefreshIcon";
import DragHandleImage from "../assets/images/drag-handle-image.png";
import { useNavigate } from "react-router-dom";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useFetchBusArrivalQueryKey } from "../queries/useFetchBusArrival";

type MissionSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  station: {
    name: string;
    stationId: string;
    direction: string;
  } | null;
};

export default function MissionSheet({
  isOpen,
  onOpenChange,
  station,
}: MissionSheetProps) {
  if (!station) return null;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isRefreshing =
    useIsFetching({
      queryKey: [...useFetchBusArrivalQueryKey, station.stationId],
    }) > 0;

  const handleRefresh = () => {
    if (isRefreshing) return;

    queryClient.invalidateQueries({
      queryKey: [...useFetchBusArrivalQueryKey, station.stationId],
    });
  };

  const handleNavigateMission = () => {
    navigate("/mission");
  };

  return (
    <Sheet.Root open={isOpen} onOpenChange={onOpenChange}>
      <Sheet.Popup
        className="bg-transparent shadow-none h-auto"
        positionerElement={<Sheet.PositionerPrimitive side="bottom" />}
      >
        <div className="relative mx-auto flex w-full max-w-[375px] max-h-[65vh] flex-col rounded-t-3xl bg-white overflow-hidden">
          <div className="flex justify-center pt-5 pb-7">
            <img
              src={DragHandleImage}
              alt="시트바 버튼 이미지"
              className="h-[6px] w-14"
            />
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-24 no-scrollbar">
            <Box className="overflow-hidden">
              <img
                src={BusMainImage}
                alt="정류장 버스 이미지"
                className="h-52 w-full object-cover"
              />
            </Box>

            {/* 클릭한 위치 메인 정보 */}
            <VStack className="mt-3 gap-1">
              <Text>{station.name}</Text>
              <Text className="text-gray-400 text-[14px]">
                {station.stationId} | {station.direction}
              </Text>
            </VStack>

            <BusInfoList stationId={station.stationId} />
          </div>

          <div className="absolute bottom-12 right-0 px-4 pb-6 pt-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`rounded-full ${
                isRefreshing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RefreshIcon />
            </button>
          </div>

          <div className="px-5 pb-[30px]">
            <Button
              size="xl"
              onClick={handleNavigateMission}
              className="w-full max-w-[335px]"
              color="White"
            >
              미션 선택하기
            </Button>
          </div>
        </div>
      </Sheet.Popup>
    </Sheet.Root>
  );
}
