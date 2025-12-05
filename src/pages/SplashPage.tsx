import { Box, Button } from "@vapor-ui/core";
import splash from "../assets/images/splash.png";
import { useNavigate } from "react-router-dom";

export const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <img src={splash} alt="splash" className="w-full h-full object-cover" />

      <Button
        onClick={() => navigate("/home")}
        position="absolute"
        className="left-1/2 -translate-x-1/2 bottom-[30px] z-10"
        width="90%"
        size="xl"
        maxWidth="335px"
        color="White"
      >
        시작
      </Button>
    </Box>
  );
};
