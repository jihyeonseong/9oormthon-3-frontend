import { VStack, Text, Button } from "@vapor-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <>
      <VStack>
        <Text>404</Text>
      </VStack>

      <VStack>
        <Text>잘못된 접근입니다.</Text>
      </VStack>

      <Button onClick={handleNavigateHome}>메인페이지로 가기</Button>
    </>
  );
};

export default NotFoundPage;
