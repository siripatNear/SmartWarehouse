import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await api.get(`${queryKey[0]}`, { params: queryKey[1] });
  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
