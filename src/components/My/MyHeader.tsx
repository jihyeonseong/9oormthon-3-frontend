import { HStack, IconButton } from "@vapor-ui/core";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "../../assets/icons/ChevronLeft";
import { IconPointBadge } from "../common/IconPointBadge";

export const MyHeader = () => {
  const navigate = useNavigate();
  return (
    <HStack paddingTop="$400" justifyContent="space-between">
      <IconButton
        size="lg"
        paddingLeft="$-200"
        variant="ghost"
        aria-label="뒤로가기"
        marginLeft="4px"
        onClick={() => navigate("/")}
      >
        <ChevronLeft />
      </IconButton>
      <IconPointBadge />
    </HStack>
  );
};
