import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useFetchYearlyTransactionChart } from "../../hooks/useFetchYearlyTransactionChart";

export default function YearlyTransactionChart() {
  const {
    data: apiData,
    isPending,
    isError,
  } = useFetchYearlyTransactionChart();

  const [selectedService, setSelectedService] = useState("total");
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  // ✅ Extract serviceTypes from API response dynamically
  useEffect(() => {
    if (apiData?.data?.length) {
      const firstYearData = apiData.data.find((item: any) => item.perService);
      if (firstYearData) {
        const perServiceKeys = Object.keys(firstYearData.perService);
        setServiceOptions(perServiceKeys);
      }
    }
  }, [apiData]);

  // ✅ Prepare the chart data based on selection
  const chartData =
    apiData?.data.map((yearItem: any) => {
      const year = yearItem.time; // "2025"
      let transaction = 0;

      if (selectedService === "total") {
        transaction = Number(yearItem.totalAmount);
      } else {
        transaction = Number(
          yearItem.perService[selectedService]?.totalAmount || 0
        );
      }

      return {
        year,
        transaction,
      };
    }) || [];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Yearly Transaction</h2>

        {/* ✅ Service Type Filter Dropdown */}
        <div className="flex items-center gap-3">
          <select
            className="border rounded px-2 py-1"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="total">Total Transaction</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <span className="cursor-pointer">⚙️ Filters</span>
        </div>
      </div>

      {/* ✅ Chart Rendering */}
      {isPending ? (
        <p>Loading Chart...</p>
      ) : isError ? (
        <p>Error fetching chart data.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" />
            <YAxis
              width={100}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line
              type="monotone"
              dataKey="transaction"
              stroke="#FFB800"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
