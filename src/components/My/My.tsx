import { VStack } from "@vapor-ui/core";
import { MyHeader } from "./MyHeader";
import { PointSection } from "./PointSection";
import { CharacterSection } from "./CharacterSection";

export const My = () => {
  return (
    <VStack height="100vh" gap="0" backgroundColor="#A4DAFE" overflow="hidden">
      <MyHeader />
      <CharacterSection />
      <PointSection />
    </VStack>
  );
};
