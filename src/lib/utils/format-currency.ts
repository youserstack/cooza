export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal", // 통화 기호 제거
    minimumFractionDigits: 0, // 소수점 제거
  }).format(value);
}

// console.log(formatCurrency(3000)); // "₩3,000"
