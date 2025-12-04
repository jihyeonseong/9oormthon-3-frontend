import { Button, VStack, Text } from "@vapor-ui/core";
import "./index.css";
import { SmallButton } from "./components/SmallButton";

export function App() {
  return (
    <div className="App">
      <h1>User Management System</h1>
      <VStack gap="$100">
        <Text>테스트</Text>
        <Button colorPalette="primary">버튼</Button>
        <SmallButton></SmallButton>
      </VStack>
    </div>
  );
}
