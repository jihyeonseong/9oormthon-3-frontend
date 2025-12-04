export const API_PREFIX = "https://goormthon-3.goorm.training/api";
export const URLS = {
  QUESTS_RANDOM: "/quests/random",
  QUESTS_ID_CHECK: (id: string) => `/quests/${id}/check`,
  USERS_QUESTS: (id: string) => `/users/${id}/quests`,
  USERS_SCORE: (id: string) => `/users/${id}/score`,
  BUS_ARRIVAL: "/bus/arrival",
};
