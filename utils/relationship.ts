import { Relationship, RelationshipNode } from "@/types/relationship";

export function buildRelationshipTree(
  relationships: Relationship[]
): RelationshipNode[] {
  const relationshipMap = new Map<number, RelationshipNode>();
  const rootNodes: RelationshipNode[] = [];

  // 먼저 모든 관계를 Map에 저장
  relationships.forEach((rel) => {
    const node: RelationshipNode = {
      id: rel.id,
      from_id: rel.from_id,
      to_id: rel.to_id,
      name: rel.name,
      relationship: rel.relationship,
      thumbnail: rel.thumbnail,
      depth: rel.depth,
      children: [],
    };
    relationshipMap.set(rel.to_id, node);
  });

  // 트리 구조 구성
  relationships.forEach((rel) => {
    const node = relationshipMap.get(rel.to_id);
    if (!node) return;

    // from_id가 다른 노드의 to_id인 경우 children으로 추가
    const parentNode = relationshipMap.get(rel.from_id);
    if (parentNode) {
      parentNode.children?.push(node);
    } else {
      // 부모가 없는 경우 루트 노드로 추가
      rootNodes.push(node);
    }
  });

  return rootNodes;
}
