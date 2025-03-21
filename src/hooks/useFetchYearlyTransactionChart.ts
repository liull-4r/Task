// hooks/useFetchYearlyTransactionChart.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

export const useFetchYearlyTransactionChart = () => {
  return useQuery({
    queryKey: ["yearly-transaction"],
    queryFn: () =>
      client.get("/stats/transaction/year").then((res) => res.data),
  });
};
