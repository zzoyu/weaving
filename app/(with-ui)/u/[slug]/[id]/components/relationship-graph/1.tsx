"use client";

import { Character } from "@/types/character";
import {
  ERelationshipType,
  RelationshipNode,
  relationshipTypeData,
} from "@/types/relationship";
import { getPublicUrl } from "@/utils/image";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

export default function RelationshipGraph1({
  character,
  relationships,
  isMine,
}: {
  character: Character;
  relationships: RelationshipNode[];
  isMine?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 600;
  const height = 600;

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const originX = xScale(50);
  const originY = yScale(50);

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
    const centroidX = x + xScale(distance) * Math.cos(angle);
    const centroidY = y + yScale(distance) * Math.sin(angle);

    return {
      x: centroidX - radius / 2,
      y: centroidY - radius / 2,
      centroid: {
        x: centroidX,
        y: centroidY,
      },
    };
  }

  const distance = xScale(35);
  const radius = [xScale(10), xScale(8)];

  const nodes = useMemo(
    () =>
      relationships.map((relationship, index) => {
        const angle = (index * (360 / relationships.length) * Math.PI) / 180;
        const x = originX + distance * Math.cos(angle);
        const y = originY + distance * Math.sin(angle);

        return {
          angle,
          x: x,
          y: y,
          lineCenter: {
            x: (x + originX) / 2,
            y: (y + originY) / 2,
          },
        };
      }),
    [relationships, width, height]
  );

  function drawNode(
    target: d3.Selection<any, any, any, any>,
    node: {
      x: number;
      y: number;
      lineCenter: { x: number; y: number };
    },
    relationship: RelationshipNode,
    index: number
  ) {
    const r = radius[1];

    target
      .append("line")
      .attr("x1", originX)
      .attr("y1", originY)
      .attr("x2", node.x)
      .attr("y2", node.y)
      .attr("stroke", "gray")
      .attr("stroke-width", 2);

    target
      .append("defs")
      .append("clipPath")
      .attr("id", `round-clip-${index}`)
      .append("circle")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr("r", r);

    target
      .append("image")
      .attr("xlink:href", getPublicUrl(relationship.thumbnail) || "")
      .attr("width", r * 2)
      .attr("height", r * 2)
      .attr("x", node.x - r)
      .attr("y", node.y - r)
      .attr("clip-path", `url(#round-clip-${index})`);

    target
      .append("circle")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr("r", r)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 2);
  }

  function drawNodeText(
    target: d3.Selection<any, any, any, any>,
    node: { x: number; y: number; lineCenter: { x: number; y: number } },
    relationship: RelationshipNode,
    index: number,
    isMine?: boolean
  ) {
    const r = radius[1];

    if (isMine && relationship.relationship_out) {
      const relationshipType =
        relationship.relationship_out.toLowerCase() as ERelationshipType;
      const relationshipData = relationshipTypeData[relationshipType];

      if (relationshipData?.url?.src) {
        target
          .append("circle")
          .attr("cx", node.lineCenter.x)
          .attr("cy", node.lineCenter.y)
          .attr("r", xScale(1.7))
          .attr("fill", "white")
          .attr("stroke-width", 2);

        target
          .append("image")
          .attr("xlink:href", relationshipData.url.src)
          .attr("width", xScale(3))
          .attr("height", xScale(3))
          .attr("x", node.lineCenter.x - xScale(1.5))
          .attr("y", node.lineCenter.y - xScale(1.5));
      }
    }

    target
      .append("text")
      .attr("x", node.x)
      .attr("y", node.y + r * 1.4)
      .attr("font-size", `${xScale(2)}px`)
      .text(relationship.name || "");
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("paint-order", "stroke");
    svg.style("text-anchor", "middle");

    const startPosition = calcImagePosition(
      radius[0],
      radius[0],
      xScale(50),
      yScale(50)
    );

    const degreeCount = relationships.length;

    nodes.forEach((node, index) => {
      drawNode(svg, node, relationships[index], index);
    });

    const r = radius[0];

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", `round-clip-main`)
      .append("circle")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", r);

    svg
      .append("image")
      .attr("xlink:href", getPublicUrl(character.thumbnail) || "")
      .attr("width", r * 2)
      .attr("height", r * 2)
      .attr("x", originX - r)
      .attr("y", originY - r)
      .attr("clip-path", `url(#round-clip-main)`);

    svg
      .append("circle")
      .attr("cx", originX)
      .attr("cy", originY)
      .attr("r", r)
      .attr("fill", "none") // 원 안을 채우지 않음
      .attr("stroke", "gray") // 테두리 색상
      .attr("stroke-width", 3); // 테두리 두께

    nodes.forEach((node, index) => {
      drawNodeText(svg, node, relationships[index], index, isMine);
    });
  }, [width]);
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
}
