"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface StatsChartProps {
  data: {
    id: string;
    name: string;
    value: number;
    fullMark: number;
  }[];
}

export default function StatsChart({ data }: StatsChartProps) {
  return data.some((stat) => stat.name.length > 0) ? (
    <div className="flex justify-center">
      <RadarChart
        cx="50%"
        cy={125}
        outerRadius={100}
        width={300}
        height={250}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="id"
          tick={(props) => {
            const item = data.find((d) => d.id === props.payload.value);
            return (
              <text
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline="central"
                className="text-xs fill-current"
              >
                {item?.name || props.payload.value}
              </text>
            );
          }}
        />

        <Radar
          dataKey="value"
          name="Stats"
          stroke="#79C78E"
          fill="#97E6AB"
          fillOpacity={0.8}
        />
      </RadarChart>
    </div>
  ) : null;
}
