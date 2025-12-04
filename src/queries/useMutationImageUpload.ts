import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

const mutateQuestsCheck = async (formData: FormData) => {
  const { data } = await axios.post(
    `${API_PREFIX}${URLS.IMAGE_UPLOAD}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const useMutationImageUpload = <TData = unknown>(
  options?: UseMutationOptions<TData, Error, FormData>
) => {
  return useMutation<TData, Error, FormData>({
    mutationFn: mutateQuestsCheck,
    mutationKey: [URLS.IMAGE_UPLOAD],
    ...options,
  });
};
