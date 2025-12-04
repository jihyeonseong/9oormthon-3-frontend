import { Box } from "@vapor-ui/core";
import myBackground from "../../assets/images/myBackground.png";
export const CharacterSection = () => {
  return (
    <Box position="relative">
      <img src={myBackground} alt="캐릭터 배경" width="100%" />
      <Box className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
    </Box>
  );
};
