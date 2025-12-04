import React from "react";
import KakaoMap from "../components/common/KakaoMap";
import { Badge, Button, Box, Flex, Text } from "@vapor-ui/core";
import UserMainProfileImage from "../assets/images/user-profile-image.png";
import { useNavigate } from "react-router-dom";
import jeju_icon from "../assets/images/jeju_icon.png";
import { useFetchUsersScore } from "../queries/useFetchUsersScore";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateMypage = () => {
    navigate("/my");
  };

  const { data: score } = useFetchUsersScore({ id: "홍길동23" });

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <KakaoMap />
      </div>

      <Flex justifyContent="space-between" alignItems="center">
        <div className="pl-6 pt-8">
          <Button
            className="bg-transparent shadow-none"
            onClick={handleNavigateMypage}
          >
            <img
              src={UserMainProfileImage}
              alt="프로필 이미지"
              width={60}
              height={60}
              className="absolute z-50"
            />
          </Button>
          <Badge
            width="80px"
            shape="square"
            size="sm"
            backgroundColor="White"
            color="Black"
            className="absolute ml-4 z-40 shadow-md "
          >
            <Box width="100%" textAlign="left">
              <Text className="font-ongleipKonkon-strong ">댕기댕기</Text>
            </Box>
          </Badge>
        </div>
        <Box className="absolute z-50 left-60">
          <img
            src={jeju_icon}
            alt="제주 아이콘"
            width={44}
            height={44}
            className="translate-x-8"
          />
        </Box>
        <Badge
          width="80px"
          shape="square"
          size="sm"
          backgroundColor="White"
          color="Black"
          marginTop="6.5px"
          className="absolute z-40 left-70 shadow-md"
        >
          <Box width="100%" textAlign="right">
            <Text className="font-ongleipKonkon-strong ">
              {score?.total_score ?? 0}
            </Text>
          </Box>
        </Badge>
      </Flex>
    </div>
  );
};

export default HomePage;
