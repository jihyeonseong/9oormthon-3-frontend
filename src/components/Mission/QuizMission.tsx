import { Button, RadioGroup, Text, Toast, VStack } from "@vapor-ui/core";
import { MissionRadioCard } from "./MissionRadioCard";
import { type QuestRandomResponse } from "../../queries/useFetchQuestsRandom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useMutationQuestsIdCheck,
  type QuizResponse,
} from "../../queries/useMutationQuestsIdCheck";
import jeju_icon from "../../assets/images/jeju_icon.png";

export const QuizMission = ({ data }: { data: QuestRandomResponse }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const toastManager = Toast.useToastManager();
  const navigate = useNavigate();

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
    <VStack gap="$100" paddingX="20px">
      <img width={36} height={36} src={jeju_icon} alt="제주 아이콘" />
      <VStack gap="30px">
        <Text typography="heading4" color="$normal">
          {data?.question}
        </Text>
        <RadioGroup.Root
          name="answers"
          onValueChange={(newValue) => setSelectedOption(newValue as string)}
        >
          <VStack gap="$100">
            <MissionRadioCard
              value="A"
              selectedOption={selectedOption}
              description={data?.options.A ?? ""}
            />
            <MissionRadioCard
              value="B"
              selectedOption={selectedOption}
              description={data?.options.B ?? ""}
            />
            <MissionRadioCard
              value="C"
              selectedOption={selectedOption}
              description={data?.options.C ?? ""}
            />
            <MissionRadioCard
              value="D"
              selectedOption={selectedOption}
              description={data?.options.D ?? ""}
            />
          </VStack>
        </RadioGroup.Root>
      </VStack>

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
        position="absolute"
        className="bottom-[30px]"
        width="90%"
        size="xl"
        maxWidth="335px"
        color="White"
      >
        제출하기
      </Button>
    </VStack>
  );
};
