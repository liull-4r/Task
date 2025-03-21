import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { Workflow } from "../types/workflow.types";

const fetchPending = async (): Promise<Workflow> => {
  const response = await client.get("/workflows/pending?contextType=bank");


  return response.data.data;
};

export const useFetchPending = () => {
  return useQuery({
    queryKey: ["pending"],
    queryFn: () => fetchPending(),
  });
};
