import { Button, Sheet } from "@vapor-ui/core";

export const ConfirmSheet = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Sheet.Root open={isOpen} onOpenChange={setIsOpen} modal>
      <Sheet.Popup>
        <Sheet.Header>
          <Sheet.Title>제어된 Sheet</Sheet.Title>
        </Sheet.Header>
        <Sheet.Body>
          <Sheet.Description>
            이 Sheet는 외부 버튼으로 상태가 제어됩니다. 프로그래밍 방식으로
            열림/닫힘을 관리할 수 있습니다.
          </Sheet.Description>
        </Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="ghost" />}>닫기</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Popup>
    </Sheet.Root>
  );
};
