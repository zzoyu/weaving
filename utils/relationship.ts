import { Relationship, RelationshipNode } from "@/types/relationship";

export function buildRelationshipTree(
  characterId: number,
  relationships: Relationship[]
): RelationshipNode[] {
  const relationshipMap = new Map<number, RelationshipNode>();
  const rootNodes: RelationshipNode[] = [];

  console.log(relationships);

  // 먼저 모든 관계를 Map에 저장
  relationships.forEach((rel) => {
    const node: RelationshipNode = {
      id: rel.id,
      from_id: rel.from_id,
      to_id: rel.to_id,
      name: rel.name,
      relationship_out: rel.relationship,
      relationship_in: undefined,
      thumbnail: rel.thumbnail,
      depth: rel.depth,
      children: [],
    };
    console.log(node.relationship_in);
    relationshipMap.set(rel.to_id, node);
    console.log(relationshipMap);
  });

  // relationship_in 설정 및 트리 구조 구성
  relationships.forEach((rel) => {
    const node = relationshipMap.get(rel.to_id);
    if (!node) return;

    // 반대 방향 관계 찾기
    const reverseRel = relationships.find(
      (r) => r.from_id === rel.to_id && r.to_id === rel.from_id
    );

    if (reverseRel) {
      // 반대 방향 노드의 relationship_in 설정
      const reverseNode = relationshipMap.get(reverseRel.to_id);
      if (reverseNode) {
        reverseNode.relationship_in = rel.relationship;
      }
    }

    // 트리 구조 구성
    if (rel.to_id !== characterId) {
      if (rel.from_id === characterId) {
        // 루트 노드로 추가
        rootNodes.push(node);
      } else {
        // 부모 노드 찾기
        const parentNode = relationshipMap.get(rel.from_id);
        if (parentNode) {
          // 이미 children에 있는지 확인
          const isAlreadyChild = parentNode.children?.some(
            (child) => child.to_id === node.to_id
          );

          // children에 없고, relationship_out이 있는 경우에만 추가
          if (!isAlreadyChild && node.relationship_out) {
            parentNode.children?.push(node);
          }
        }
      }
    }
  });

  return rootNodes;
}
