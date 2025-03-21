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
import { useFetchMonthlyTransactionChart } from "../../hooks/useFetchMonthlyTransactionChart";

export default function MonthlyTransactionChart() {
  const {
    data: apiData,
    isPending,
    isError,
  } = useFetchMonthlyTransactionChart();

  const [selectedService, setSelectedService] = useState("total");
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // ✅ Extract serviceTypes from API response once
  useEffect(() => {
    if (apiData?.data?.length) {
      const firstMonth = apiData.data.find((item: any) => item.perService);
      if (firstMonth) {
        const perServiceKeys = Object.keys(firstMonth.perService);
        setServiceOptions(perServiceKeys);
      }
    }
  }, [apiData]);

  // ✅ Generate chart data based on the selected service (total or serviceType)
  const chartData = months.map((month, index) => {
    const monthData = apiData?.data.find((item: any) => {
      const apiMonth = new Date(item.time).getMonth();
      return apiMonth === index;
    });

    let transaction = 0;
    if (monthData) {
      if (selectedService === "total") {
        transaction = Number(monthData.totalAmount);
      } else {
        transaction = Number(
          monthData.perService[selectedService]?.totalAmount || 0
        );
      }
    }

    return {
      month,
      transaction,
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Monthly Transaction</h2>

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
            <XAxis dataKey="month" />
            <YAxis
              width={100}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line
              type="monotone"
              dataKey="transaction"
              stroke="#00C8C8"
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
