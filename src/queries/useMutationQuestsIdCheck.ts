import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

interface QuestAnswerPayload {
  id: number;
  answer: string;
  user_id: string;
}

type QuizRegion = {
  city: string;
  town: string;
  village: string;
};

type QuizOptions = {
  A: string;
  B: string;
  C: string;
  D: string;
};

export type QuizResponse = {
  id: number;
  region: QuizRegion;
  question: string;
  options: QuizOptions;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  score: number;
  questScore: number;
};

const mutateQuestsCheck = async ({
  id,
  answer,
  user_id,
}: QuestAnswerPayload) => {
  const { data } = await axios.post(
    `${API_PREFIX}${URLS.QUESTS_ID_CHECK(String(id))}`,
    { id, answer, user_id }
  );
  // API 응답을 한 번 더 감싸지 않고 그대로 반환
  return data;
};

export const useMutationQuestsIdCheck = <TData = unknown>(
  options?: UseMutationOptions<TData, Error, QuestAnswerPayload>
) => {
  return useMutation<TData, Error, QuestAnswerPayload>({
    mutationFn: mutateQuestsCheck,
    mutationKey: [URLS.QUESTS_ID_CHECK],
    ...options,
  });
};
