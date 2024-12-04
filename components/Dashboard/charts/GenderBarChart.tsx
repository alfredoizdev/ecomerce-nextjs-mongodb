"use client";

import { useMemo, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  products: Array<{
    gender: string;
  }>;
};

const GenderBarChart = ({ products }: Props) => {
  const [mount, setMount] = useState(false);
  const chartData = useMemo(() => {
    const total = products.length;

    const manCount = products.filter((p) => p.gender === "man").length;
    const womenCount = products.filter((p) => p.gender === "women").length;
    const unisexCount = products.filter((p) => p.gender === "unisex").length;

    return [
      { name: "Man", percentage: ((manCount / total) * 100).toFixed(2) },
      { name: "Women", percentage: ((womenCount / total) * 100).toFixed(2) },
      { name: "Unisex", percentage: ((unisexCount / total) * 100).toFixed(2) },
    ];
  }, [products]);

  useEffect(() => {
    setMount(true);

    return () => setMount(false);
  }, []);

  if (!mount) return null;

  return (
    <Card className="flex flex-col items-center justify-center p-4">
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="percentage" fill="var(--color-percentage)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GenderBarChart;
