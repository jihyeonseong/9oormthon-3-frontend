import { Box, HStack, VStack, Text, Badge } from "@vapor-ui/core";

export const ProgressBar = ({ score }: { score: number }) => {
  const boxes = [1, 2, 3, 4]; // Box 개수
  const buttons = ["일백댕기", "일천댕기", "삼천댕기", "일만댕기"];
  const getColoredBoxCount = () => {
    if (score < 100) {
      return 0;
    }
    if (score < 1000) {
      return 1;
    }
    if (score < 3000) {
      return 2;
    }
    if (score < 5000) {
      return 3;
    }
    return 4;
  };
  const coloredCount = getColoredBoxCount();

  return (
    <VStack gap="12px">
      <HStack
        alignItems="center"
        position="relative"
        width="100%"
        justifyContent="space-between"
      >
        {boxes.map((_, i) => (
          <Box
            key={i}
            className="flex-1"
            maxWidth="100px"
            height="$200"
            backgroundColor={i < coloredCount ? "$primary-200" : "$gray-100"}
            borderRadius="$500"
          />
        ))}

        {/* 인접 지점마다 하얀 원 렌더링 */}
        {boxes.map((_, i) => (
          <Box
            key={`circle-${i}`}
            position="absolute"
            width="16px"
            height="16px"
            backgroundColor="White"
            borderRadius="14px"
            border="1px solid"
            borderColor="$normal"
            className="top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `calc(${((i + 1) / boxes.length) * 100}%)`,
            }}
          />
        ))}
      </HStack>
      <HStack gap="$400" paddingX="28px">
        {buttons.map((text) => (
          <VStack key={text} gap="6px">
            <Text className="font-ongleipKonkon-strong --vapor-typography-fontSize-075">
              {text}
            </Text>
            <Badge size="md" colorPalette="hint" render={<button />}>
              받기
            </Badge>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};
