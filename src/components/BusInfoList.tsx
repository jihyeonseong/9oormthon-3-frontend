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
          padding="$150"
          borderRadius="$lg"
          borderColor="gray-300"
        >
          <HStack>
            <BusIcon />
            <Text>{item.ROUTE_NUM}</Text>
            <Text>{item.ROUTE_SUB_NM}</Text>
          </HStack>
          <Text>
            {item.CURR_STATION_NM} ({item.REMAIN_STATION} 정류장 전)
          </Text>
          <Text typography="subtitle1" foreground="normal-100">
            {item.PREDICT_TRAV_TM}분
          </Text>
          {item.LOW_PLATE_TP === "Y" && <Text>저상버스</Text>}
        </Box>
      ))}
    </VStack>
  );
};
