"use client";

import { Character } from "@/types/character";
import { Relationship } from "@/types/relationship";
import { useEffect, useRef } from "react";

export default function RelationshipGraph({
  character,
  relationships,
}: {
  character: Character;
  relationships: Relationship[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let middlePoint = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    const r = 200;
    let angle = 0;
    const angleStep = (2 * Math.PI) / relationships.length;

    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const imageCenter = new Image(100, 100);
    imageCenter.src = character.thumbnail!;
    // wait for image to load
    imageCenter.onload = () => {
      // draw the image on the canvas in circle shape
      ctx.save();
      ctx.beginPath();
      ctx.arc(middlePoint.x, middlePoint.y, 50, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(
        imageCenter,
        middlePoint.x - 50,
        middlePoint.y - 50,
        100,
        100
      );

      // ctx.closePath();
      ctx.restore();

      ctx.fillText(character.name, middlePoint.x, middlePoint.y + 60);
    };

    ctx.drawImage(
      imageCenter,
      middlePoint.x - 50,
      middlePoint.y - 50,
      100,
      100
    );

    ctx.fillText(character.name, middlePoint.x, middlePoint.y);

    relationships.forEach((relationship) => {
      const character = relationship.character as Character;
      const characterImage = new Image(100, 100);
      characterImage.src = character.thumbnail!;
      const x = middlePoint.x + r * Math.cos(angle);
      const y = middlePoint.y + r * Math.sin(angle);

      characterImage.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(characterImage, x - 40, y - 40, 80, 80);
        ctx.closePath();
        ctx.restore();
      };
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(middlePoint.x, middlePoint.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillText(character.name, x, y + 50);
      ctx.fillText(
        relationship.name,
        middlePoint.x + (x - middlePoint.x) / 2,
        middlePoint.y + (y - middlePoint.x) / 2
      );

      ctx.restore();
      angle += angleStep;
    });
  }, []);
  return <canvas ref={canvasRef} width="600" height="600" style={{}}></canvas>;
}
