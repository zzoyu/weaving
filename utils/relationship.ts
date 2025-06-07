import { Relationship, RelationshipNode } from "@/types/relationship";

export function buildRelationshipTree(
  relationships: Relationship[]
): RelationshipNode[] {
  return relationships.map((rel) => ({
    id: rel.id,
    from_id: rel.from_id,
    to_id: rel.to_id,
    name: rel.name,
    relationship: rel.relationship,
    thumbnail: rel.thumbnail,
    depth: rel.depth,
    character: {
      id: rel.character?.id,
      name: rel.character?.name,
      thumbnail: rel.character?.thumbnail || "",
    },
    children: [],
  }));
}
