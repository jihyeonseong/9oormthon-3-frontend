import { Box, Button, Text, Toast, VStack } from "@vapor-ui/core";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/images/camera.png";
import { useMutationImageUpload } from "../../queries/useMutationImageUpload";
import { useRef, useState } from "react";
import { ConfirmSheet } from "./ConfirmSheet";
import type { QuestRandomResponse } from "../../queries/useFetchQuestsRandom";

export const CameraUpload = ({ data }: { data?: QuestRandomResponse }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { mutate } = useMutationImageUpload();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toastManager = Toast.useToastManager();

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
      formData.append("quest_id", String(data?.id));
      formData.append("user_id", "홍길동23");
      // setIsOpen(true);

      mutate(formData, {
        onSuccess: () => {
          toastManager.add({
            title: "사진 업로드가 완료되었습니다.",
          });
          navigate("/");
        },
      });
    }
  };

  return (
    <>
      <Box>
        <VStack gap="$100" paddingX="20px">
          <VStack>
            <Text typography="heading4" color="$normal">
              {data?.instruction}
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
      <ConfirmSheet isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
