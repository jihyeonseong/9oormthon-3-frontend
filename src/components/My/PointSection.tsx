import { Box, Flex, VStack } from "@vapor-ui/core";
import { useFetchUsersScore } from "../../queries/useFetchUsersScore";
import { ProgressBar } from "./ProgressBar";
import { HistorySection } from "./HistorySection";

export const PointSection = () => {
  const { data: score } = useFetchUsersScore({ id: "홍길동23" });
  return (
    <Flex className="flex-1" flexDirection="column" minHeight="0">
      <Box
        className="flex-1 overflow-y-auto"
        backgroundColor="white"
        minHeight="0"
        gap="12px"
      >
        <VStack gap="$100" padding="$200">
          <ProgressBar score={score?.total_score ?? 0} />
        </VStack>
        <HistorySection />
      </Box>
    </Flex>
  );
};
