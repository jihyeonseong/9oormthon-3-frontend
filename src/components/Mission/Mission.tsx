import {
  RadioGroup,
  Text,
  VStack,
  Button,
  Toast,
  Box,
  IconButton,
} from "@vapor-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAddress } from "../../hooks/useGetAddress";
import { useFetchQuestsRandom } from "../../queries/useFetchQuestsRandom";
import {
  useMutationQuestsIdCheck,
  type QuizResponse,
} from "../../queries/useMutationQuestsIdCheck";
import { MissionRadioCard } from "./MissionRadioCard";
import { ChevronLeft } from "../../assets/icons/ChevronLeft";

// TODO: 나머지 주소 처리
const getCity = (city: string) => (city.includes("제주") ? "Jeju" : "Seogwipo");
const getVillage = (village: string) =>
  village.includes("성산") ? "Seongsan" : "Sehwa";

export const Mission = () => {
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
    <Box marginTop="36px">
      <IconButton
        size="lg"
        paddingLeft="$-200"
        variant="ghost"
        aria-label="뒤로가기"
        marginBottom="18px"
        onClick={() => navigate("/")}
      >
        <ChevronLeft />
      </IconButton>
      <VStack gap="$100" paddingX="20px">
        <img
          width={36}
          height={36}
          src="/src/assets/images/jeju_icon.png"
          alt="제주 아이콘"
        />
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
          width="100%"
          size="xl"
          maxWidth="335px"
          color="White"
        >
          제출하기
        </Button>
      </VStack>
    </Box>
  );
};
