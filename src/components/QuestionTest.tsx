import {
  RadioGroup,
  Text,
  RadioCard,
  VStack,
  Button,
  Toast,
} from "@vapor-ui/core";
import { useFetchQuestsRandom } from "../queries/useFetchQuestsRandom";
import { useGetAddress } from "../hooks/useGetAddress";
import {
  useMutationQuestsIdCheck,
  type QuizResponse,
} from "../queries/useMutationQuestsIdCheck";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: 나머지 주소 처리
const getCity = (city: string) => (city.includes("제주") ? "Jeju" : "Seogwipo");
const getVillage = (village: string) =>
  village.includes("성산") ? "Seongsan" : "Sehwa";

export const QuestionTest = () => {
  const { city, village } = useGetAddress();
  const [selectedOption, setSelectedOption] = useState("");
  const toastManager = Toast.useToastManager();
  const navigate = useNavigate();

  const { data } = useFetchQuestsRandom({
    city: getCity(city ?? ""),
    village: getVillage(village ?? ""),
  });

  const { mutate: submit } = useMutationQuestsIdCheck<QuizResponse>({
    onSuccess: (res) => {
      if (res.correct) {
        toastManager.add({
          title: "정답입니다!",
        });
        navigate("/");
        return;
      }
      toastManager.add({
        title: "오답입니다. 다시 시도해보세요!",
      });
    },
  });

  return (
    <VStack gap="$100">
      <Text>{data?.question}</Text>
      <RadioGroup.Root
        name="answers"
        onValueChange={(newValue) => setSelectedOption(newValue as string)}
      >
        <VStack gap="$100">
          <RadioCard value="A">{data?.options.A}</RadioCard>
          <RadioCard value="B">{data?.options.B}</RadioCard>
          <RadioCard value="C">{data?.options.C}</RadioCard>
          <RadioCard value="D">{data?.options.D}</RadioCard>
        </VStack>
      </RadioGroup.Root>
      <Button
        onClick={() => {
          if (!data?.id) {
            return;
          }
          submit({
            id: data.id,
            answer: selectedOption,
            user_id: "홍길동23",
          });
        }}
      >
        제출하기
      </Button>
    </VStack>
  );
};
