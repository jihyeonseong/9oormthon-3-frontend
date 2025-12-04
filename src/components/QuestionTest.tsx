import { Text } from "@vapor-ui/core";
import { useFetchQuestsRandom } from "../queries/useFetchQuestsRandom";
import { useGetAddress } from "../hooks/useGetAddress";

// TODO: 나머지 주소 처리
const getCity = (city: string) => (city.includes("제주") ? "Jeju" : "Seogwipo");
const getVillage = (village: string) =>
  village.includes("성산") ? "Seongsan" : "Sehwa";

export const QuestionTest = () => {
  const { city, village } = useGetAddress();

  const { data } = useFetchQuestsRandom({
    city: getCity(city ?? ""),
    village: getVillage(village ?? ""),
  });

  return (
    <Text>
      {data?.question} <br />
      {data?.options.A} <br />
      {data?.options.B} <br />
      {data?.options.C} <br />
      {data?.options.D} <br />
    </Text>
  );
};
