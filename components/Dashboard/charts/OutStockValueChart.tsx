"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Product } from "@/types/Product";

type Props = {
  products: Product[];
};

const OutOfStockValueChart = ({ products }: Props) => {
  const [mount, setMount] = useState(false);

  const chartData = useMemo(() => {
    const outStockProducts = products.filter((p) => p.inStock === "out");

    const totalValue = outStockProducts.reduce((sum, p) => sum + p.price, 0);

    return [{ name: "Out of Stock Value", value: totalValue }];
  }, [products]);

  useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, []);

  if (!mount) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Out of Stock Value</CardTitle>
        <CardDescription>
          Monetary loss from out-of-stock products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" tickFormatter={(value) => `$${value}`} />
            <YAxis type="category" dataKey="name" />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Bar dataKey="value" fill="var(--color-out-stock)" radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OutOfStockValueChart;
