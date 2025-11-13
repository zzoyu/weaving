"use client";

import { Character } from "@/types/character";
import { colorHexMap } from "@/types/color";
import Image from "next/image";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ThemeColorChartProps {
  characters: Character[];
}

export default function ThemeColorChart({ characters }: ThemeColorChartProps) {
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

  // 누적형 BarChart용 데이터 생성
  const stackedBarData = [
    chartData.reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {} as Record<string, number>),
  ];

  const colorKeys = chartData.map((d) => d.name);

  const totalValue = chartData.reduce((sum, cur) => sum + cur.value, 0);

  if (chartData.length === 0) {
    return (
      <h1 className="text-2xl font-bold font-pretendard">
        테마 컬러가 있는 캐릭터가 없습니다
      </h1>
    );
  }

  const mainColor = Object.keys(colorCounts).sort(
    (a, b) => colorCounts[b] - colorCounts[a]
  )[0];
  const listColorDescription = {
    black: "맨인블랙",
    white: "휘핑크림 많이 주세요",
    yellow: "생각이 많을 땐 레몬사탕",
    silver: "고품격 실버타운",
    brown: "초콜릿 공장장",
    red: "빨간맛 궁금해 허니",
    pink: "복숭아 당도최고",
    orange: "감귤 자연발생설",
    purple: "좋은 건 크게 보라고 배웠어요",
    blue: "파란 나라를 보았니",
    sky: "힘이 들 땐 하늘을 봐",
    green: "리틀 포레스트",
  };

  return (
    <section className="w-full h-fit flex flex-col items-center bg-white dark:bg-neutral-950 rounded-2xl p-4 lg:p-6 mb-10">
      <h1 className="text-xl lg:text-2xl font-pretendard mb-5 text-gray-900 dark:text-white mt-10">
        당신의 테마 컬러는?
      </h1>
      <div className="w-full flex flex-col items-center justify-center py-4 lg:py-10 h-full">
        <Image
          unoptimized
          src={`/assets/images/more/theme-color-biased/${mainColor}.png`}
          alt="theme-color-chart"
          width={300}
          height={300}
        />
        <h1 className="font-pretendard mt-4 lg:mt-10 font-extrabold text-2xl lg:text-3xl antialiased">
          {listColorDescription[mainColor as keyof typeof listColorDescription]}
        </h1>
      </div>
      <div className="w-full mt-4 mb-10">
        <ResponsiveContainer width="100%" height={80}>
          <BarChart
            data={stackedBarData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            height={80}
          >
            <XAxis type="number" hide domain={[0, totalValue]} />
            <YAxis type="category" dataKey={() => ""} hide />

            {colorKeys.map((key, idx) => {
              // hex 색상값에서 밝기 계산 (YIQ 공식)
              const hex = colorHexMap[key] || "#e5e7eb";
              const rgb = hex
                .replace("#", "")
                .match(/.{1,2}/g)
                ?.map((x) => parseInt(x, 16)) || [229, 231, 235];
              const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
              const textColor = yiq >= 180 ? "#222" : "#fff";
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={hex}
                  radius={
                    idx === 0
                      ? [4, 0, 0, 4]
                      : idx === colorKeys.length - 1
                      ? [0, 4, 4, 0]
                      : 0
                  }
                  isAnimationActive={true}
                  animationDuration={900}
                >
                  <LabelList
                    dataKey={key}
                    position="center"
                    formatter={(value: number) => {
                      if (!value || totalValue === 0) return "";
                      const percent = Math.round((value / totalValue) * 100);
                      return `${percent}%`;
                    }}
                    style={{
                      fill: textColor,
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "inherit",
                      textShadow:
                        textColor === "#fff"
                          ? "0 1px 2px #222, 0 0 2px #222"
                          : "0 1px 2px #fff, 0 0 2px #fff",
                    }}
                  />
                </Bar>
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
