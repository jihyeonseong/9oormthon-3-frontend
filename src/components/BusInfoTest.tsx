import { Box, Text, VStack } from "@vapor-ui/core";
import { useFetchBusInfo } from "../queries/useFetchBusInfo";

export const BusInfoTest = () => {
  const { data } = useFetchBusInfo({ stationId: "406000706" });
  return (
    <VStack gap="$200">
      <Text>정류정 번호 406000706</Text>
      {data?.map((item) => (
        <Box key={item.VH_ID}>
          <Text>
            버스 번호 {item.ROUTE_NUM} <br />
            남은 시간 {item.PREDICT_TRAV_TM}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
