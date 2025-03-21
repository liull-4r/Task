import { useFetchPending } from "../../hooks/useFetchPendings";
import PendingDataTable from "../ui/PendingDataTable";

export default function Pending() {
  const { data: bankPendings, isLoading, isError } = useFetchPending();

  if (isLoading) return <p>Loading pending approvals...</p>;
  if (isError) return <p>Error fetching pending approvals.</p>;

  return (
    <div>
      <PendingDataTable
        data={Array.isArray(bankPendings) ? bankPendings : []}
      />
    </div>
  );
}
