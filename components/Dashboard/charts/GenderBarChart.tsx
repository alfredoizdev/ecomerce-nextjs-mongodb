"use client";

import { useMemo, useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  products: Array<{ category: string }>;
};

const GenderBarChart = ({ products }: Props) => {
  const [mount, setMount] = useState(false);
  // Procesar datos
  const chartData = useMemo(() => {
    const total = products.length;

    const manCount = products.filter(
      (p) => p.category.toLowerCase() === "man"
    ).length;
    const womenCount = products.filter(
      (p) => p.category.toLowerCase() === "women"
    ).length;
    const unisexCount = products.filter(
      (p) => p.category.toLowerCase() === "unisex"
    ).length;

    return [
      {
        gender: "Man",
        percentage: (manCount / total) * 100,
        fill: "var(--color-man)",
      },
      {
        gender: "Women",
        percentage: (womenCount / total) * 100,
        fill: "var(--color-women)",
      },
      {
        gender: "Unisex",
        percentage: (unisexCount / total) * 100,
        fill: "var(--color-unisex)",
      },
    ];
  }, [products]);

  const chartConfig = {
    man: { label: "Man", color: "hsl(var(--chart-1))" },
    women: { label: "Women", color: "hsl(var(--chart-2))" },
    unisex: { label: "Unisex", color: "hsl(var(--chart-3))" },
  } satisfies ChartConfig;

  useEffect(() => {
    setMount(true);

    return () => {
      setMount(false);
    };
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
        <CardDescription>Percentage of Products by Gender</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="gender"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value.toLowerCase() as keyof typeof chartConfig]
                  ?.label
              }
            />
            <XAxis dataKey="percentage" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="percentage" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing gender distribution of products
        </div>
      </CardFooter>
    </Card>
  );
};

export default GenderBarChart;
