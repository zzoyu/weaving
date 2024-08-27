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
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "round-clip")
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 50)
      .attr("r", 50);
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
        .attr("stroke", "black");

      svg
        .append("image")
        .attr("xlink:href", relationship?.character?.thumbnail || "")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", startPosition.x)
        .attr("y", startPosition.y)
        .append("clipPath")
        .attr("id", "round-clip")
        .append("circle")
        .attr("cx", startPosition.centroid.x)
        .attr("cy", startPosition.centroid.y)
        .attr("r", 50)
        .attr("clip-path", "url(#round-clip)");

      svg
        .append("text")
        .attr("x", startPosition.centroid.x)
        .attr("y", startPosition.centroid.y + 50)
        .text(relationship.character?.name || "");
    });

    svg
      .append("image")
      .attr("xlink:href", character.thumbnail || "")
      .attr("width", 80)
      .attr("height", 80)
      .attr("x", startPosition.x)
      .attr("y", startPosition.y);
  }, [relationships]);
  return <svg ref={svgRef} width="600" height="600" style={{}}></svg>;
}
