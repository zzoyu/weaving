import { Character } from "@/types/character";
import { RelationshipNode } from "@/types/relationship";
import { useState } from "react";
import RelationshipGraph1 from "./relationship-graph/1";
import RelationshipGraph2 from "./relationship-graph/2";
import RelationshipGraph3 from "./relationship-graph/3";

// 예시로 RelationshipGraph를 3개 복제 (원하는 만큼 추가 가능)
function RelationshipGraphVariant1(props: {
  character: Character;
  relationships: RelationshipNode[];
  relationshipsExtended: RelationshipNode[];
}) {
  return (
    <RelationshipGraph1
      character={props.character}
      relationships={props.relationshipsExtended}
    />
  );
}

function RelationshipGraphVariant2(props: {
  character: Character;
  relationships: RelationshipNode[];
  relationshipsExtended: RelationshipNode[];
}) {
  // 추후 다른 스타일/로직 적용 가능
  return (
    <RelationshipGraph2
      character={props.character}
      relationships={props.relationshipsExtended}
    />
  );
}

function RelationshipGraphVariant3(props: {
  character: Character;
  relationships: RelationshipNode[];
  relationshipsExtended: RelationshipNode[];
}) {
  // 추후 다른 스타일/로직 적용 가능
  return (
    <RelationshipGraph3
      {...props}
      relationships={props.relationshipsExtended}
    />
  );
}

const graphVariants = [
  { name: "기본 그래프", Component: RelationshipGraphVariant1 },
  { name: "변형 그래프 1", Component: RelationshipGraphVariant2 },
  { name: "변형 그래프 2", Component: RelationshipGraphVariant3 },
];

export default function RelationshipGraphVariants({
  character,
  relationships,
  relationshipsExtended,
}: {
  character: Character;
  relationships: RelationshipNode[];
  relationshipsExtended: RelationshipNode[];
}) {
  const [selected, setSelected] = useState(0);
  const VariantComponent = graphVariants[selected].Component;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {graphVariants.map((variant, idx) => (
          <button
            key={variant.name}
            className={`px-3 py-1 rounded ${
              selected === idx
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-neutral-800"
            }`}
            onClick={() => setSelected(idx)}
          >
            {variant.name}
          </button>
        ))}
      </div>
      <VariantComponent
        character={character}
        relationships={relationships}
        relationshipsExtended={relationshipsExtended}
      />
    </div>
  );
}
