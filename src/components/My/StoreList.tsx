import { Grid, VStack, Text, Flex, HStack } from "@vapor-ui/core";
import { ImageIcon } from "../../assets/icons/ImageIcon";
import jeju_icon from "../../assets/images/jeju_icon.png";

export const StoreList = () => {
  const data = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <Grid.Root templateColumns="repeat(2, 1fr)" gap="12px" marginBottom="30px">
      {data.map((item) => {
        return (
          <Grid.Item key={item} gap="12px">
            <VStack gap="8px">
              <Flex
                width="150px"
                height="150px"
                backgroundColor="$secondary-100"
                justifyContent="center"
                alignItems="center"
                borderRadius="20px"
              >
                <ImageIcon />
              </Flex>
              <VStack>
                <Text typography="heading6">상품명</Text>
                <HStack gap="2px">
                  <img
                    src={jeju_icon}
                    alt="제주 아이콘"
                    width={20}
                    height={20}
                  />
                  <Text typography="subtitle1">100 댕기</Text>
                </HStack>
              </VStack>
            </VStack>
          </Grid.Item>
        );
      })}
    </Grid.Root>
  );
};
