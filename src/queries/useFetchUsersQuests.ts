import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

const useFetchUsersQuestsQueryKey = ["/users/${id}/quest"];

type QuizSolveLog = {
  id: number;
  user_id: string;
  quest_id: number;
  "문제 푼 시간": string; // ISO timestamp
  시: string;
  동: string;
  리: string;
  "푼 문제": string;
  "사용자가 제출한 정답": string;
  "실제 정답": string;
  점수: number;
  "이미지 URL": string;
};

const fetchUsersQuests = async (id: string): Promise<QuizSolveLog[]> => {
  const { data } = await axios.get(`${API_PREFIX}${URLS.USERS_QUESTS(id)}`);
  return data;
};

export const useFetchUsersQuests = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [...useFetchUsersQuestsQueryKey, id],
    queryFn: () => fetchUsersQuests(id),
  });
};
