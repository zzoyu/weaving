"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { generateId } from "@/utils/random-character/common";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import StatsChart from "./stats-chart";

function StatProperty({
  value,
  fullMark,
  onChange,
}: {
  value: number;
  fullMark: number;
  onChange?: (value: number) => void;
}) {
  const [statValue, setStatValue] = useState(value);

  useEffect(() => {
    onChange?.(statValue);
  }, [statValue]);

  return (
    <ButtonGroup>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setStatValue(statValue - 1)}
        disabled={statValue <= 0}
      >
        <Minus />
      </Button>
      <Input
        value={statValue}
        onChange={(e) => {
          const newValue = Math.min(
            fullMark,
            Math.max(0, parseInt(e.target.value || "0")),
          );
          setStatValue(newValue);
        }}
        step={1}
        min={0}
        max={fullMark}
        size={20}
        maxLength={2}
        className="flex justify-center items-center text-center"
      />
      <Button
        variant="outline"
        type="button"
        size="icon"
        onClick={() => setStatValue(statValue + 1)}
        disabled={statValue >= fullMark}
      >
        <Plus />
      </Button>
    </ButtonGroup>
  );
}

export default function StatsProperties({
  properties,
  handler,
}: {
  properties?: { name: string; value: number; fullMark: number }[];
  handler?: (
    properties: { name: string; value: number; fullMark: number }[],
  ) => void;
}) {
  const initialProperties = Array.from({ length: 6 }, () => ({
    id: generateId(),
    name: "",
    value: 0,
    fullMark: 10,
  }));

  const [currentProperties, setProperties] = useState(
    initialProperties.map((prop, index) => {
      if (properties && properties[index]) {
        return { ...properties[index], id: generateId() };
      }
      return prop;
    }),
  );

  const filteredStats = useMemo(() => {
    return currentProperties.filter((prop) => prop.name.trim() !== "");
  }, [currentProperties]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4">
      <Collapsible className="flex flex-col gap-2 w-full" open={isOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center px-4 py-8"
            onClick={() => {
              isOpen ? setIsOpen(false) : setIsOpen(true);
            }}
          >
            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-bold flex items-center justify-start gap-1 w-full cursor-pointer h-fit">
                능력치 설정
              </h2>
              <span className="text-left">
                이름이 입력된 개수만큼 능력치가 표시됩니다.
              </span>
            </div>
            {isOpen ? <Minus /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {filteredStats.length > 0 ? (
            <StatsChart data={filteredStats} />
          ) : (
            <div className="p-20 text-center">
              능력치는 최대 6개까지 저장할 수 있어요
            </div>
          )}
          <div className="flex flex-col px-4">
            {currentProperties.map((prop, index) => (
              <div
                key={`${prop.id}-${index}`}
                className="flex items-center justify-between mb-4 gap-1"
              >
                <Input
                  type="text"
                  value={prop.name}
                  placeholder="능력치 이름"
                  onChange={(e) => {
                    const newProperties = [...currentProperties];
                    newProperties[index] = {
                      ...newProperties[index],
                      name: e.target.value,
                    };
                    setProperties(newProperties);
                    handler?.(newProperties);
                  }}
                />
                <StatProperty
                  key={prop.id}
                  value={prop.value}
                  fullMark={prop.fullMark}
                  onChange={(newValue) => {
                    const newProperties = [...currentProperties];
                    newProperties[index] = {
                      ...newProperties[index],
                      value: Number(newValue),
                    };
                    setProperties(newProperties);
                    handler?.(newProperties);
                  }}
                />
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
