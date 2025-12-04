import { Badge, Box, Flex, Text } from "@vapor-ui/core";

import jeju_icon from "../../assets/images/jeju_icon.png";
import { useFetchUsersScore } from "../../queries/useFetchUsersScore";

export const IconPointBadge = () => {
  const { data: score } = useFetchUsersScore({ id: "홍길동23" });

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="$300">
      <img
        src={jeju_icon}
        alt="제주 아이콘"
        width={44}
        height={44}
        className="translate-x-8"
      />
      <Badge
        width="80px"
        shape="square"
        size="sm"
        backgroundColor="White"
        color="Black"
        marginTop="6.5px"
      >
        <Box width="100%" textAlign="right">
          <Text className="font-ongleipKonkon-strong ">
            {score?.total_score ?? 0}
          </Text>
        </Box>
      </Badge>
    </Flex>
  );
};
