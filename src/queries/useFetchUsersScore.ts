import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

const useFetchUsersScoreQueryKey = ["/users/${id}/score"];

type QuizSummary = {
  total_score: number;
  total_quests: number;
  correct_count: string; // API에서 string으로 오고 있음
  incorrect_count: string;
};

const fetchUsersScore = async (id: string): Promise<QuizSummary> => {
  const { data } = await axios.get(`${API_PREFIX}${URLS.USERS_SCORE(id)}`);
  return data;
};

export const useFetchUsersScore = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [...useFetchUsersScoreQueryKey, id],
    queryFn: () => fetchUsersScore(id),
  });
};
