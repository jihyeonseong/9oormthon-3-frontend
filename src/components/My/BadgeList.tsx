import { Flex, Grid, VStack, Text } from "@vapor-ui/core";
import { LockIcon } from "../../assets/icons/LockIcon";

export const BadgeList = () => {
  const badges = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Grid.Root templateColumns="repeat(3, 1fr)" gap="12px" marginBottom="30px">
      {badges.map((item) => {
        return (
          <Grid.Item key={item} gap="20px">
            <VStack gap="8px">
              <Flex
                width="90px"
                height="90px"
                backgroundColor="$secondary-100"
                justifyContent="center"
                alignItems="center"
                borderRadius="20px"
              >
                <LockIcon />
              </Flex>
              <VStack>
                <Text typography="subtitle1" textAlign="center">
                  뱃지
                </Text>
              </VStack>
            </VStack>
          </Grid.Item>
        );
      })}
    </Grid.Root>
  );
};
