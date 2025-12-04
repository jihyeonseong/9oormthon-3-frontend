"use client";

import { Sheet, Button, Text, Box, VStack } from "@vapor-ui/core";
import { BusInfoList } from "./BusInfoList";
import BusMainImage from "../assets/images/bus-image.png";
import RefreshIcon from "../assets/icons/RefreshIcon";
import DragHandleImage from "../assets/images/drag-handle-image.png";

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

  return (
    <Sheet.Root open={isOpen} onOpenChange={onOpenChange}>
      <Sheet.Popup
        className="bg-transparent shadow-none overflow-y-auto no-scrollbar"
        positionerElement={
          <Sheet.PositionerPrimitive
            side="bottom"
            className="flex justify-center items-end"
          />
        }
      >
        <div className="relative mx-auto flex w-[375px] max-h-[80vh] flex-col rounded-t-3xl bg-white">
          <div className="flex justify-center pt-[20px] pb-[28px]">
            <img
              src={DragHandleImage}
              alt="정류장 이미지"
              className="h-[6px] w-14"
            />
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-24">
            <Box className="overflow-hidden">
              <img
                src={BusMainImage}
                alt="정류장 이미지"
                className="h-52 w-full object-cover"
              />
            </Box>

            <VStack className="mt-3 gap-1">
              <Text>{station.name}</Text>
              <Text>
                {station.stationId} | {station.direction}
              </Text>
            </VStack>

            <BusInfoList stationId={station.stationId} />
          </div>

          <div className="absolute bottom-10 right-0 px-4 pb-6 pt-2">
            <RefreshIcon onClick={() => {}} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-from-white via-white/90 px-5 pb-6 pt-2">
            <Button className="w-full" size="lg">
              <Text typography="heading6" className="text-white">
                미션 선택하기
              </Text>
            </Button>
          </div>
        </div>
      </Sheet.Popup>
    </Sheet.Root>
  );
}
