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

  function calcImagePosition(
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    return {
      x: x - width / 2,
      y: y - height / 2,
    };
  }

  function calcImagePositionWithAngle(
    x: number,
    y: number,
    angle: number,
    distance: number,
    radius: number
  ) {
    const centroidX = x + distance * Math.cos(angle);
    const centroidY = y + distance * Math.sin(angle);

    return {
      x: centroidX - radius / 2,
      y: centroidY - radius / 2,
      centroid: {
        x: centroidX,
        y: centroidY,
      },
    };
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("text-anchor", "middle");

    const width = 600;
    const height = 600;
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const startPosition = calcImagePosition(80, 80, xScale(50), yScale(50));

    const degreeCount = relationships.length;

    relationships.forEach((relationship, index) => {
      const fromX = xScale(50);
      const fromY = yScale(50);

      const startPosition = calcImagePositionWithAngle(
        xScale(50),
        yScale(50),
        (index * (360 / degreeCount) * Math.PI) / 180,
        200,
        50
      );
      svg
        .append("line")
        .attr("x1", fromX)
        .attr("y1", fromY)
        .attr("x2", startPosition.centroid.x)
        .attr("y2", startPosition.centroid.y)
        .attr("stroke", "gray")
        .attr("stroke-width", 2);

      const lineCenterX = (fromX + startPosition.centroid.x) / 2;
      const lineCenterY = (fromY + startPosition.centroid.y) / 2;

      svg
        .append("text")
        .attr("font-size", "10px")
        .attr("x", lineCenterX)
        .attr("y", lineCenterY - 10)
        .text(relationship.name || "");

      svg
        .append("defs")
        .append("clipPath")
        .attr("id", `round-clip-${index}`)
        .append("circle")
        .attr("cx", startPosition.centroid.x)
        .attr("cy", startPosition.centroid.y)
        .attr("r", 25);

      svg
        .append("image")
        .attr("xlink:href", relationship?.character?.thumbnail || "")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", startPosition.x)
        .attr("y", startPosition.y)
        .attr("clip-path", `url(#round-clip-${index})`);

      svg
        .append("circle")
        .attr("cx", startPosition.centroid.x)
        .attr("cy", startPosition.centroid.y)
        .attr("r", 25)
        .attr("fill", "none") // 원 안을 채우지 않음
        .attr("stroke", "gray") // 테두리 색상
        .attr("stroke-width", 2); // 테두리 두께

      svg
        .append("text")
        .attr("font-size", "10px")
        .attr("x", startPosition.centroid.x)
        .attr("y", startPosition.centroid.y + 40)
        .text(relationship.character?.name || "");
    });

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", `round-clip-main`)
      .append("circle")
      .attr("cx", startPosition.x + 40)
      .attr("cy", startPosition.y + 40)
      .attr("r", 40);

    svg
      .append("image")
      .attr("xlink:href", character.thumbnail || "")
      .attr("width", 80)
      .attr("height", 80)
      .attr("x", startPosition.x)
      .attr("y", startPosition.y)
      .attr("clip-path", `url(#round-clip-main)`);

    svg
      .append("circle")
      .attr("cx", startPosition.x + 40)
      .attr("cy", startPosition.y + 40)
      .attr("r", 40)
      .attr("fill", "none") // 원 안을 채우지 않음
      .attr("stroke", "gray") // 테두리 색상
      .attr("stroke-width", 2); // 테두리 두께
  }, [relationships]);
  return <svg ref={svgRef} width="600" height="600" style={{}}></svg>;
}
