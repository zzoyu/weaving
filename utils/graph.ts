/**
 * 두 점을 기준으로 평행선을 계산하는 함수
 * @param {object} a - 첫 번째 점 {x, y}
 * @param {object} b - 두 번째 점 {x, y}
 * @param {number} offset - 평행선 간 거리 (px 단위)
 * @returns {object[]} 평행선 2개 [{ from, to }, { from, to }]
 */
export function getParallelLines(
  a: { x: number; y: number },
  b: { x: number; y: number },
  offset: number
): { from: { x: number; y: number }; to: { x: number; y: number } }[] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);

  const ux = dx / len;
  const uy = dy / len;

  // 중심선에 수직인 단위 벡터
  const vx = -uy;
  const vy = ux;

  // offset만큼 떨어진 평행선 두 개
  const line1 = {
    from: { x: a.x + vx * offset, y: a.y + vy * offset },
    to: { x: b.x + vx * offset, y: b.y + vy * offset },
  };

  const line2 = {
    from: { x: a.x - vx * offset, y: a.y - vy * offset },
    to: { x: b.x - vx * offset, y: b.y - vy * offset },
  };

  return [line1, line2];
}
