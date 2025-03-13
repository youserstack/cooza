export function extractProductIds(groups: Group[]) {
  // 중복 제거된 productId 목록 추출
  return [...new Set(groups.flatMap((group) => group.items.map((item) => item.productId)))];
}
