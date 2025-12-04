import { Button, HStack, VStack, Text } from "@vapor-ui/core";
import { useState } from "react";
import { HistoryList } from "./HistoryList";
import { BadgeList } from "./BadgeList";

const tabStateOption = {
  HISTORY: "HISTORY",
  BADGE: "BADGE",
};

export const HistorySection = () => {
  const [tabState, setTabState] = useState(tabStateOption.HISTORY);
  return (
    <VStack paddingX="20px" gap="12px">
      <HStack
        width="100%"
        backgroundColor="$secondary-100"
        borderRadius="$200"
        padding="6px"
        gap="8px"
      >
        <Button
          width="100%"
          backgroundColor={
            tabState === tabStateOption.HISTORY
              ? "$canvas-100"
              : "$secondary-100"
          }
          className={tabState === tabStateOption.HISTORY ? "shadow-sm" : ""}
          onClick={() => setTabState(tabStateOption.HISTORY)}
        >
          <Text typography="subtitle1">히스토리</Text>
        </Button>
        <Button
          width="100%"
          backgroundColor={
            tabState === tabStateOption.BADGE ? "$canvas-100" : "$secondary-100"
          }
          className={tabState === tabStateOption.BADGE ? "shadow-sm" : ""}
          onClick={() => setTabState(tabStateOption.BADGE)}
        >
          <Text typography="subtitle1">뱃지</Text>
        </Button>
      </HStack>
      {tabState === tabStateOption.HISTORY && <HistoryList />}
      {tabState === tabStateOption.BADGE && <BadgeList />}
    </VStack>
  );
};
