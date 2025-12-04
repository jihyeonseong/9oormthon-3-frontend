import { Box, IconButton } from "@vapor-ui/core";

import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "../../assets/icons/ChevronLeft";
import { QuizMission } from "./QuizMission";
import { useGetAddress } from "../../hooks/useGetAddress";
import { useFetchQuestsRandom } from "../../queries/useFetchQuestsRandom";
import { CameraUpload } from "./CameraUpload";

// TODO: 나머지 주소 처리
const getCity = (city: string) => (city.includes("제주") ? "Jeju" : "Seogwipo");
const getVillage = (village: string) =>
  village.includes("성산") ? "Seongsan" : "Sehwa";

export const Mission = () => {
  const navigate = useNavigate();
  const { city, village } = useGetAddress();

  const { data, isLoading } = useFetchQuestsRandom({
    city: getCity(city ?? ""),
    village: getVillage(village ?? ""),
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <Box marginTop="36px">
      <IconButton
        size="xl"
        paddingLeft="$-200"
        variant="ghost"
        aria-label="뒤로가기"
        marginBottom="18px"
        onClick={() => navigate("/")}
      >
        <ChevronLeft />
      </IconButton>
      {data?.type === "question" ? (
        <QuizMission data={data} />
      ) : (
        <CameraUpload data={data} />
      )}
    </Box>
  );
};
