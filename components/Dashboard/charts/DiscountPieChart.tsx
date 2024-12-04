"use client";

import { useMemo, useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  totalProducts: number;
  discountedProducts: number;
};

const DiscountPieChart = ({ totalProducts, discountedProducts }: Props) => {
  const [mount, setMount] = useState(false);

  const chartData = useMemo(() => {
    return [
      {
        label: "Disc",
        value: discountedProducts,
        fill: "var(--color-discount)",
      },
      {
        label: "No Disc",
        value: totalProducts - discountedProducts,
        fill: "var(--color-no-discount)",
      },
    ];
  }, [totalProducts, discountedProducts]);

  useEffect(() => {
    setMount(true);

    return () => setMount(false);
  }, []);

  if (!mount) return null;

  return (
    <Card className="flex flex-col items-center justify-center p-4">
      <CardHeader className="text-center">
        <CardTitle>Discount Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label={(entry) => `${entry.label}: ${entry.value}`}
          />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default DiscountPieChart;
