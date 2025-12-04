import { Button, VStack, Text } from "@vapor-ui/core";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuestionTest } from "./components/QuestionTest";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>User Management System</h1>
        <VStack gap="$100" padding="$100">
          <Text>테스트</Text>
          <Button colorPalette="primary">버튼</Button>
          <QuestionTest />
        </VStack>
      </div>
    </QueryClientProvider>
  );
}
