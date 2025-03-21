import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

export const useFetchMonthlyTransactionChart = () => {
  return useQuery({
    queryKey: ["transaction-chart"],
    queryFn: () =>
      client.get("/stats/transaction/month?year=2025").then((res) => res.data),
  });
};
