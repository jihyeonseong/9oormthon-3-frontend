import { Text } from "@vapor-ui/core";
import { useFetchQuestsRandom } from "../queries/useFetchQuestsRandom";

export const QuestionTest = () => {
  const { data } = useFetchQuestsRandom({ city: "jeju" });

  return (
    <Text>
      {data?.id} <br />
      {data?.region.city} <br />
      {data?.region.town} <br />
      {data?.region.village} <br />
      {data?.question} <br />
      {data?.options.A} <br />
      {data?.options.B} <br />
      {data?.options.C} <br />
      {data?.options.D} <br />
      {data?.score}
    </Text>
  );
};
