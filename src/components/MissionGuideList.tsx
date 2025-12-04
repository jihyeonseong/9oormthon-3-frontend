import { Box, Text, VStack, Flex, Button } from "@vapor-ui/core";
import jeju_icon from "../assets/images/jeju_icon.png";
import { useNavigate } from "react-router-dom";
import quiz from "../assets/images/quiz_image.png";
import camera from "../assets/images/camera_image.png";
import flower from "../assets/images/flower_image.png";
import coffee from "../assets/images/coffee_image.png";
import ramen from "../assets/images/ramen_image.png";
import instagram from "../assets/images/instagram_image.png";

const guideMissionItems = [
  { id: 1, title: "미션 만들고", src: quiz },
  { id: 2, title: "인기 스팟 사진찍고", src: camera },
  { id: 3, title: "제주 설화 듣고", src: flower },
  { id: 4, title: "감성 카페 댕기고", src: coffee },
  { id: 4, title: "숨은 맛집 찾고", src: ramen },
  { id: 4, title: "인스타 공유하고", src: instagram },
];

export const MissionGuideList = () => {
  const navigate = useNavigate();

  const handleNavigateMission = () => {
    navigate("/mission");
  };

  return (
    <VStack className="px-5">
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="$050"
        className="w-full"
      >
        <Flex alignItems="center" justifyContent="center" gap="$050">
          <Text typography="heading5" textAlign="center">
            이번 정류장도 댕기댕기하게
          </Text>
          <img src={jeju_icon} alt="제주 아이콘" className="w-7 h-7" />
        </Flex>

        <Text typography="heading6" textAlign="center" foreground="hint-100">
          신나는 미션 체험 인기 스팟을 경험해볼까요?
        </Text>
      </Flex>

      <Box className="mt-4 grid w-full grid-cols-2 gap-3 max-h-[360px] overflow-y-auto no-scrollbar">
        {guideMissionItems.map((item, index) => (
          <Box
            key={`${item.id}-${index}`}
            borderRadius="$300"
            borderColor="Gray200"
            backgroundColor="White"
            className="flex h-[150px] flex-col items-center justify-between px-3 py-4
            rounded-[20px] border border-[#E5E5E5]"
          >
            <img src={item.src} alt="카메라" className="w-11 h-11 " />
            <Text typography="subtitle1" textAlign="center">
              {item.title}
            </Text>

            <Button
              onClick={handleNavigateMission}
              color="White"
              className="mt-1 rounded-md px-4 py-1 text-xs font-semibold w-32
                         bg-[#FFE3D3] text-[#FF7A00]"
            >
              10댕기 받기
            </Button>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};
