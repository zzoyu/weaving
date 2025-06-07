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
    // characterId와 to_id가 같은 경우는 건너뛰지 않고, relationship_in으로 사용될 수 있도록 처리
    const node: RelationshipNode = {
      id: rel.id,
      from_id: rel.from_id,
      to_id: rel.to_id,
      name: rel.name,
      relationship_out: rel.relationship,
      relationship_in: undefined, // 나중에 설정
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
    // characterId와 to_id가 같은 경우는 children으로 추가하지 않음
    // characterId와 from_id가 같은 경우는 루트 노드로 추가
    if (rel.to_id !== characterId) {
      if (rel.from_id === characterId) {
        rootNodes.push(node);
      } else {
        const parentNode = relationshipMap.get(rel.from_id);
        if (parentNode) {
          parentNode.children?.push(node);
        }
      }
    }
  });

  return rootNodes;
}
