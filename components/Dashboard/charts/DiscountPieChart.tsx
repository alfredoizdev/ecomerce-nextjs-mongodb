"use client";

import { useMemo, useEffect, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  totalProducts: number;
  discountedProducts: number;
};

const chartConfig = {
  discount: {
    label: "With Discount",
    color: "hsl(var(--chart-1))",
  },
  noDiscount: {
    label: "Without Discount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DiscountDistributionChart = ({
  totalProducts,
  discountedProducts,
}: Props) => {
  const [mount, setMount] = useState(false);
  const id = "pie-interactive-distribution";
  const desktopData = useMemo(() => {
    const noDiscount = totalProducts - discountedProducts;

    return [
      {
        label: "With Discount",
        value: discountedProducts,
        fill: "var(--color-discount)",
      },
      {
        label: "Without Discount ",
        value: noDiscount,
        fill: "var(--color-no-discount)",
      },
    ];
  }, [totalProducts, discountedProducts]);

  const [activeIndex, setActiveIndex] = useState(0);

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
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Discount Distribution</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {desktopData[activeIndex].label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DiscountDistributionChart;
