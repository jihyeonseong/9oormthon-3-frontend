import { Card, Text, VStack } from "@vapor-ui/core";
import { useFetchUsersQuests } from "../../queries/useFetchUsersQuests";
import { useFetchUsersScore } from "../../queries/useFetchUsersScore";

export const HistoryList = () => {
  const { data: history } = useFetchUsersQuests({ id: "홍길동23" });
  const { data: score } = useFetchUsersScore({ id: "홍길동23" });

  return (
    <VStack maxHeight="90%">
      <VStack>
        <Text>홍길동23 님</Text> <br />
        <Text>총점 : {score?.total_score}</Text>
      </VStack>
      <VStack gap="$200">
        {history?.map((item) => (
          <Card.Root key={item.id}>
            <Card.Header>{item["푼 문제"]}</Card.Header>
            <Card.Body>{item["점수"]}</Card.Body>
            <Card.Body>{item["문제 푼 시간"]}</Card.Body>
          </Card.Root>
        ))}
      </VStack>
    </VStack>
  );
};
