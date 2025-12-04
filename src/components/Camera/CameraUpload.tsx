import { Box, Button, IconButton, Text, VStack } from "@vapor-ui/core";
import { ChevronLeft } from "../../assets/icons/ChevronLeft";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/images/camera.png";
import { useMutationImageUpload } from "../../queries/useMutationImageUpload";
import { useRef } from "react";

export const CameraUpload = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useMutationImageUpload();

  const fileHandler = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", "홍길동23");

      mutate(formData);
    }
  };

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
        <VStack>
          <Text typography="heading4" color="$normal">
            사진 촬영
          </Text>
          <img src={camera} alt="사진촬영" />
        </VStack>
        <label htmlFor="file">
          <Button
            onClick={fileHandler}
            position="absolute"
            className="bottom-[30px]"
            width="90%"
            size="xl"
            maxWidth="335px"
            color="White"
          >
            사진 촬영
          </Button>
        </label>
        <input
          className="hidden"
          type="file"
          name="file"
          accept="image/*"
          ref={ref}
          onChange={handleFileChange}
        />
      </VStack>
    </Box>
  );
};
