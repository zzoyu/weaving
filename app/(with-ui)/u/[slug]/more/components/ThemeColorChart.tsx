"use client";

import { Character } from "@/types/character";
import { colorHexMap, colorNameMap } from "@/types/color";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface LabelProps {
  name: string;
  percent: number;
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
}

interface ThemeColorChartProps {
  characters: Character[];
}

function CustomLegend({ payload }: { payload?: any[] }) {
  if (!payload) return null;
  return (
    <ul className="flex flex-wrap gap-2 justify-center mt-4 px-1">
      {payload.map((entry) => (
        <li
          key={entry.value}
          className="flex items-center gap-1 bg-white rounded-lg px-2 py-0.5 hover:scale-105 transition-transform"
        >
          <span
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              background: entry.color,
              borderRadius: 5,
              border: "1.5px solid #e5e7eb",
            }}
          />
          <span className="text-sm text-gray-900">
            {colorNameMap[entry.value] || entry.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ThemeColorChart({ characters }: ThemeColorChartProps) {
  const [labelVisible, setLabelVisible] = useState(false);

  // themeColor가 falsy하지 않은 값만 필터링
  const filteredCharacters = characters.filter((char) => {
    const themeColorProp = char.properties.find(
      (prop) => prop.key === "themeColor"
    );
    return !!themeColorProp?.value;
  });

  // themeColor 기준으로 데이터 그룹화
  const colorCounts = filteredCharacters.reduce(
    (acc: Record<string, number>, char) => {
      const themeColorProp = char.properties.find(
        (prop) => prop.key === "themeColor"
      );
      if (themeColorProp && themeColorProp.value) {
        const color = themeColorProp.value;
        acc[color] = (acc[color] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  // 차트 데이터 생성
  const chartData = Object.entries(colorCounts).map(([name, value]) => ({
    name,
    value,
  }));

  if (chartData.length === 0) {
    return (
      <h1 className="text-2xl font-bold font-pretendard">
        테마 컬러가 있는 캐릭터가 없습니다
      </h1>
    );
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // 박스 크기 및 위치 (더 작게)
    const boxWidth = 60;
    const boxHeight = 40;
    const boxX = x - boxWidth / 2;
    const boxY = y - boxHeight / 2;
    const color = colorHexMap[name] || "#e5e7eb";

    return (
      <g
        style={{
          opacity: labelVisible ? 1 : 0,
          transform: labelVisible ? "scale(1)" : "scale(0.95)",
          transition:
            "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <rect
          x={boxX}
          y={boxY}
          width={boxWidth}
          height={boxHeight}
          rx={10}
          fill="rgba(255,255,255,0.96)"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.13))" }}
        />
        <text
          x={x}
          y={y - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={13}
          fill="#333"
          style={{
            pointerEvents: "none",
            fontFamily: "inherit",
            letterSpacing: 0.2,
          }}
        >
          {colorNameMap[name] || name}
        </text>
        <text
          x={x}
          y={y + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fill="#888"
          style={{
            pointerEvents: "none",
            fontFamily: "inherit",
            letterSpacing: 0.2,
          }}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  return (
    <section className="w-full flex flex-col items-center bg-white rounded-2xl p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-pretendard mb-5 text-gray-900">
        캐릭터 테마 컬러 분포
      </h1>
      <div className="w-full h-[280px] md:h-[320px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={900}
              onAnimationEnd={() => setLabelVisible(true)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorHexMap[entry.name] || "#e5e7eb"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(_, name) => `${colorNameMap[name as string] || name}`}
              contentStyle={{ borderRadius: 12, fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend
        payload={chartData.map((entry) => ({
          value: entry.name,
          color: colorHexMap[entry.name] || "#e5e7eb",
        }))}
      />
    </section>
  );
}
