"use client";

import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function RelationshipGraph({
  character,
  relationships,
}: {
  character: Character;
  relationships: Relationship[];
}) {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 600;
    const height = 600;
    const margin = 50;
    const innerWidth = width - margin * 2;
    const innerHeight = height - margin * 2;
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("transform", `translate(${margin},${innerHeight + margin})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin},${margin})`)
      .call(yAxis);
  }, [relationships]);
  return <svg ref={svgRef} width="600" height="600" style={{}}></svg>;
}
