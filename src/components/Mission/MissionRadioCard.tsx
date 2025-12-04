import { Button, Checkbox, Text, RadioCard } from "@vapor-ui/core";

export const MissionRadioCard = ({
  value,
  selectedOption,
  description,
}: {
  value: string;
  selectedOption: string;
  description: string;
}) => {
  return (
    <Button
      size="xl"
      padding="$200"
      variant="outline"
      height="56px"
      value={value}
      justifyContent="space-between"
      render={<RadioCard value={value} />}
    >
      <Text className="truncate">{description}</Text>
      <Checkbox.Root
        disabled={selectedOption !== value}
        checked
        size="lg"
        color="$primary-200"
      />
    </Button>
  );
};
