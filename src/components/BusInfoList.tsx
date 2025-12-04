import { Box, Text, VStack, HStack } from "@vapor-ui/core";
import { useFetchBusArrival } from "../queries/useFetchBusArrival";
import BusIcon from "../assets/icons/BusIcon";

interface BusInfoListProps {
  stationId: string;
}

export const BusInfoList: React.FC<BusInfoListProps> = ({ stationId }) => {
  const { data, isLoading, isError } = useFetchBusArrival({ stationId });

  if (isLoading) {
    return <Text>버스 도착 정보를 불러오는 중입니다...</Text>;
  }

  if (isError) {
    return (
      <Text>
        버스 도착 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </Text>
    );
  }

  if (!data || data.length === 0) {
    return <Text>도착 예정 버스가 없습니다.</Text>;
  }

  const list = data;

  return (
    <VStack gap="$150">
      {list.map((item) => (
        <Box
          key={item.VH_ID}
          backgroundColor="White"
          className="flex w-full flex-col gap-1 rounded-[20px] border-2 border-gray-200 px-5 py-4"
        >
          <HStack className="items-center gap-2">
            <BusIcon />
            <Text typography="subtitle1" className="text-[16px] font-semibold">
              {item.ROUTE_NUM}
            </Text>
            <Text typography="subtitle1" className="text-[14px] text-gray-800">
              {item.ROUTE_SUB_NM}
            </Text>
          </HStack>

          <Text typography="body2" className="mt-1 text-[12px] text-gray-400">
            {item.CURR_STATION_NM} ({item.REMAIN_STATION} 정류장 전)
          </Text>

          <HStack className="mt-2 items-baseline gap-2">
            <Text typography="subtitle1" className="text-[14px] text-red-400">
              {item.PREDICT_TRAV_TM}분
            </Text>
            <Text typography="body2" className="text-[12px] text-gray-400">
              {item.REMAIN_STATION}정류장 전
            </Text>
            {item.LOW_PLATE_TP === "Y" && (
              <Text
                typography="body2"
                className="ml-auto text-[12px] text-gray-400"
              >
                저상버스
              </Text>
            )}
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
