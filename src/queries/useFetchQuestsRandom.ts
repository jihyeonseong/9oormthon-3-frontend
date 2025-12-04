import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

const useFetchQuestsRandomQueryKey = [URLS.QUESTS_RANDOM];

type QuestRandomResponse = {
  id: number;
  region: {
    city: string;
    town: string;
    village: string;
  };
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  score: number;
};

const fetchQuestsRandom = async (
  city?: string,
  village?: string
): Promise<QuestRandomResponse> => {
  const { data } = await axios.get(
    `${API_PREFIX}${URLS.QUESTS_RANDOM}/?city=${city}&village=${village}`
  );
  return data;
};

export const useFetchQuestsRandom = ({
  city,
  village,
}: {
  city?: string;
  village?: string;
}) => {
  return useQuery({
    queryKey: [...useFetchQuestsRandomQueryKey, city, village],
    queryFn: () => fetchQuestsRandom(city, village),
  });
};
