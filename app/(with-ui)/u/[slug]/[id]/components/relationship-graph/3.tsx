"use client";

import { Character } from "@/types/character";
import {
  ERelationshipType,
  RelationshipNode,
  relationshipTypeData,
} from "@/types/relationship";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

export default function RelationshipGraph2({
  character,
  relationships,
  isMine,
}: {
  character: Character;
  relationships: RelationshipNode[];
  isMine?: boolean;
}) {
  console.log(relationships);

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
  const radius = [xScale(10), xScale(8), xScale(5)];

  function calcChildPosition(
    parentX: number,
    parentY: number,
    parentAngle: number,
    childIndex: number,
    totalChildren: number,
    distance: number,
    spreadAngle: number = Math.PI / 6 // 30도
  ) {
    // 빈도 수에 따라 간격 조절
    const adjustedSpreadAngle = Math.min(
      (40 * Math.PI) / 180, // 최대 40도
      Math.max(
        Math.PI / 8, // 최소 22.5도
        (Math.PI / 4) * (1 + 1 / (totalChildren + 1)) // 기본 45도에서 빈도 수에 따라 조절
      )
    );

    // 부모 노드의 각도를 기준으로 children을 배치
    const childAngle =
      parentAngle +
      (childIndex - (totalChildren - 1) / 2) * adjustedSpreadAngle;
    const childX = parentX + distance * Math.cos(childAngle);
    const childY = parentY + distance * Math.sin(childAngle);

    return {
      angle: childAngle,
      x: childX,
      y: childY,
      lineCenter: {
        x: (childX + parentX) / 2,
        y: (childY + parentY) / 2,
      },
    };
  }

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
          children:
            relationship.children?.map((child, childIndex) => {
              return calcChildPosition(
                x,
                y,
                angle,
                childIndex,
                relationship.children?.length || 0,
                distance * 0.4 // 부모-자식 간격을 더 가깝게 조정
              );
            }) || [],
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
      children?: any[];
    },
    relationship: RelationshipNode,
    index: number
  ) {
    const r = radius[1];

    // Draw children first
    if (node.children && relationship.children) {
      node.children.forEach((child, childIndex) => {
        const childRelationship = relationship.children?.[childIndex];
        if (!childRelationship) return;

        // 1depth 노드 중에서 같은 to_id를 가진 노드 찾기
        const existingNodeIndex = relationships.findIndex(
          (r) => r.to_id === childRelationship.to_id
        );

        if (existingNodeIndex === -1) {
          // 새로운 children 노드 그리기
          const childR = radius[2];

          // Draw line to child
          target
            .append("line")
            .attr("x1", node.x)
            .attr("y1", node.y)
            .attr("x2", child.x)
            .attr("y2", child.y)
            .attr("stroke", "gray")
            .attr("stroke-width", 1);

          // Draw child node
          target
            .append("defs")
            .append("clipPath")
            .attr("id", `round-clip-child-${index}-${childIndex}`)
            .append("circle")
            .attr("cx", child.x)
            .attr("cy", child.y)
            .attr("r", childR);

          target
            .append("image")
            .attr("xlink:href", childRelationship.thumbnail || "")
            .attr("width", childR * 2)
            .attr("height", childR * 2)
            .attr("x", child.x - childR)
            .attr("y", child.y - childR)
            .attr("clip-path", `url(#round-clip-child-${index}-${childIndex})`);

          target
            .append("circle")
            .attr("cx", child.x)
            .attr("cy", child.y)
            .attr("r", childR)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-width", 1);
        }
      });
    }

    // Draw parent node
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
      .attr("xlink:href", relationship.thumbnail || "")
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

  function drawNodeWithRelationshipIn(
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
    const parallelOffset = 12;

    // 중심선의 각도 계산
    const angle = Math.atan2(node.y - originY, node.x - originX);
    const perpendicularAngle = angle + Math.PI / 2;

    // 평행 이동된 점들의 좌표 계산
    const offsetX = parallelOffset * Math.cos(perpendicularAngle);
    const offsetY = parallelOffset * Math.sin(perpendicularAngle);

    // 원에 외접하는 점 계산
    const startX1 = originX + offsetX + r * Math.cos(angle);
    const startY1 = originY + offsetY + r * Math.sin(angle);
    const endX1 = node.x + offsetX - r * Math.cos(angle);
    const endY1 = node.y + offsetY - r * Math.sin(angle);

    const startX2 = originX - offsetX + r * Math.cos(angle);
    const startY2 = originY - offsetY + r * Math.sin(angle);
    const endX2 = node.x - offsetX - r * Math.cos(angle);
    const endY2 = node.y - offsetY - r * Math.sin(angle);

    // 화살표 마커 정의 - out 방향
    target
      .append("defs")
      .append("marker")
      .attr("id", `arrowhead-out-${index}`)
      .attr("viewBox", "-10 -5 10 10")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L-10,0L0,5")
      .attr("fill", "gray");

    // 화살표 마커 정의 - in 방향
    target
      .append("defs")
      .append("marker")
      .attr("id", `arrowhead-in-${index}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "gray");

    // 첫 번째 평행선 (out 방향)
    target
      .append("line")
      .attr("x1", startX1)
      .attr("y1", startY1)
      .attr("x2", endX1)
      .attr("y2", endY1)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("marker-end", `url(#arrowhead-out-${index})`);

    // 두 번째 평행선 (in 방향)
    target
      .append("line")
      .attr("x1", startX2)
      .attr("y1", startY2)
      .attr("x2", endX2)
      .attr("y2", endY2)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("marker-end", `url(#arrowhead-in-${index})`);

    target
      .append("defs")
      .append("clipPath")
      .attr("id", `round-clip-in-${index}`)
      .append("circle")
      .attr("cx", node.x)
      .attr("cy", node.y)
      .attr("r", r);

    target
      .append("image")
      .attr("xlink:href", relationship.thumbnail || "")
      .attr("width", r * 2)
      .attr("height", r * 2)
      .attr("x", node.x - r)
      .attr("y", node.y - r)
      .attr("clip-path", `url(#round-clip-in-${index})`);

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
    const parallelOffset = 12;

    if (isMine) {
      // 양방향 관계 표시
      const relationshipTypes = [];
      const hasIn = !!relationship.relationship_in;

      if (relationship.relationship_out) {
        if (hasIn) {
          // relationship_in이 있는 경우, 평행선 간격에 맞게 반대쪽에 배치
          const angle = Math.atan2(node.y - originY, node.x - originX);
          const perpendicularAngle = angle + Math.PI / 2;
          const offsetX = parallelOffset * Math.cos(perpendicularAngle);
          const offsetY = parallelOffset * Math.sin(perpendicularAngle);

          relationshipTypes.push({
            type: relationship.relationship_out.toLowerCase() as ERelationshipType,
            position: {
              x: node.lineCenter.x - offsetX,
              y: node.lineCenter.y - offsetY,
            },
          });
        } else {
          // relationship_in이 없는 경우 기존 위치 유지
          relationshipTypes.push({
            type: relationship.relationship_out.toLowerCase() as ERelationshipType,
            position: {
              x: node.lineCenter.x - xScale(1.5),
              y: node.lineCenter.y - xScale(1.5),
            },
          });
        }
      }

      if (relationship.relationship_in) {
        // relationship_in이 있는 경우 평행선 위에 심볼 배치
        const angle = Math.atan2(node.y - originY, node.x - originX);
        const perpendicularAngle = angle + Math.PI / 2;
        const offsetX = parallelOffset * Math.cos(perpendicularAngle);
        const offsetY = parallelOffset * Math.sin(perpendicularAngle);

        relationshipTypes.push({
          type: relationship.relationship_in.toLowerCase() as ERelationshipType,
          position: {
            x: node.lineCenter.x + offsetX,
            y: node.lineCenter.y + offsetY,
          },
        });
      }

      relationshipTypes.forEach(({ type, position }) => {
        const relationshipData = relationshipTypeData[type];
        if (relationshipData?.url?.src) {
          const isIn = type === relationship.relationship_in?.toLowerCase();

          if (hasIn) {
            // relationship_in이 있는 경우, 모든 심볼을 평행선 위에 배치
            target
              .append("circle")
              .attr("cx", position.x)
              .attr("cy", position.y)
              .attr("r", xScale(1.7))
              .attr("fill", "white")
              .attr("stroke-width", 2);

            target
              .append("image")
              .attr("xlink:href", relationshipData.url.src)
              .attr("width", xScale(3))
              .attr("height", xScale(3))
              .attr("x", position.x - xScale(1.5))
              .attr("y", position.y - xScale(1.5));
          } else {
            // relationship_in이 없는 경우 기존 위치 유지
            target
              .append("circle")
              .attr("cx", position.x + xScale(1.5))
              .attr("cy", position.y + xScale(1.5))
              .attr("r", xScale(1.7))
              .attr("fill", "white")
              .attr("stroke-width", 2);

            target
              .append("image")
              .attr("xlink:href", relationshipData.url.src)
              .attr("width", xScale(3))
              .attr("height", xScale(3))
              .attr("x", position.x)
              .attr("y", position.y);
          }
        }
      });
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

    // 화살표 마커 정의
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "gray");

    // 모든 점선을 먼저 그립니다
    nodes.forEach((node, index) => {
      if (node.children && relationships[index].children) {
        node.children.forEach((child, childIndex) => {
          const childRelationship = relationships[index].children?.[childIndex];
          if (!childRelationship) return;

          const existingNodeIndex = relationships.findIndex(
            (r) => r.to_id === childRelationship.to_id
          );

          if (existingNodeIndex !== -1) {
            const existingNode = nodes[existingNodeIndex];
            svg
              .append("line")
              .attr("x1", node.x)
              .attr("y1", node.y)
              .attr("x2", existingNode.x)
              .attr("y2", existingNode.y)
              .attr("stroke", "gray")
              .attr("stroke-width", 1)
              .attr("stroke-dasharray", "4,4");
          }
        });
      }
    });

    // 라인(화살표) 그리기 - 원 테두리에 맞게 끝점 조정
    nodes.forEach((node, index) => {
      const angle = Math.atan2(node.y - originY, node.x - originX);
      const r2 = radius[1];
      const x2 = node.x - r2 * Math.cos(angle);
      const y2 = node.y - r2 * Math.sin(angle);

      // relationship_in이 없는 경우에만 기본 선을 그림
      if (!relationships[index].relationship_in) {
        svg
          .append("line")
          .attr("x1", originX)
          .attr("y1", originY)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke", "gray")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrowhead)");
      }
    });

    // 노드 그리기
    nodes.forEach((node, index) => {
      if (relationships[index].relationship_in) {
        drawNodeWithRelationshipIn(svg, node, relationships[index], index);
      } else {
        drawNode(svg, node, relationships[index], index);
      }
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
      .attr("xlink:href", character.thumbnail || "")
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
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 3);

    nodes.forEach((node, index) => {
      drawNodeText(svg, node, relationships[index], index, isMine);
    });
  }, [width]);
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width + 200} ${height + 200}`}
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
}
