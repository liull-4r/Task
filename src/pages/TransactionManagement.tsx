import MonthlyTransactionChart from "../components/charts/MonthlyTransactionChart";
import YearlyTransactionChart from "../components/charts/YearlyTransactionChart";

const TransactionManagement = () => {
  return (
    <div>
      <MonthlyTransactionChart />
      <br />
      <YearlyTransactionChart />
    </div>
  );
};

export default TransactionManagement;
