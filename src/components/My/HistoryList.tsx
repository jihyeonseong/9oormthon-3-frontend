import { Grid, VStack, Text, Flex } from "@vapor-ui/core";
import { useFetchUsersQuests } from "../../queries/useFetchUsersQuests";
import { ImageIcon } from "../../assets/icons/ImageIcon";

export const HistoryList = () => {
  const { data } = useFetchUsersQuests({ id: "홍길동23" });
  return (
    <Grid.Root templateColumns="repeat(2, 1fr)" gap="12px" marginBottom="30px">
      {data
        ?.filter((item) => item["점수"] > 0)
        .map((item) => {
          const date = new Date(item["문제 푼 시간"]);

          return (
            <Grid.Item key={item.id} gap="12px">
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
                  <Text typography="heading6">{`${item.리}`}</Text>
                  <Text typography="subtitle1">
                    {date.getFullYear() +
                      ". " +
                      date.getMonth() +
                      ". " +
                      date.getDate() +
                      ". " +
                      date.getHours() +
                      ":" +
                      date.getMinutes()}
                  </Text>
                </VStack>
              </VStack>
            </Grid.Item>
          );
        })}
    </Grid.Root>
  );
};
