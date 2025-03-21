import { useFetchBanks } from "../../hooks/useFetchBanks";
import DataTable from "../ui/DataTable";

export default function Approved() {
  const { data: banks, isLoading, isError } = useFetchBanks();


  if (isLoading) return <p>Loading approved banks...</p>;
  if (isError) return <p>Error fetching approved banks.</p>;

  return (
    <div>
      <DataTable data={Array.isArray(banks) ? banks : []} />
    </div>
  );
}
