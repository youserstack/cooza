import { Prisma, PrismaClient } from "./output/prisma";

const prisma = new PrismaClient();

// 유저 시드 데이터
const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
  },
];

// 제품 시드 데이터
const productData: Prisma.ProductCreateManyInput[] = [
  {
    name: "무지 반팔 티셔츠",
    maker: "UniWear",
    description: "편하게 입기 좋은 무지 기본 반팔 티셔츠",
    // seed: muji-tshirt (항상 같은 이미지가 반환됨)
    image: "https://picsum.photos/seed/muji-tshirt/800/800",
    seller: "UniWear 공식몰",
    category: ["의류", "상의", "티셔츠"],
    price: 15000,
    stock: 120,
  },
  {
    name: "데님 청바지",
    maker: "DenimPro",
    description: "슬림핏 스타일의 데님 청바지",
    image: "https://picsum.photos/seed/denim-jeans/800/800",
    seller: "DenimPro Store",
    category: ["의류", "하의", "청바지"],
    price: 49000,
    stock: 80,
  },
  {
    name: "러닝화",
    maker: "RunFast",
    description: "통기성이 좋은 경량 러닝화",
    image: "https://picsum.photos/seed/running-shoes/800/800",
    seller: "RunFast Sports",
    category: ["신발", "운동화", "러닝화"],
    price: 89000,
    stock: 60,
  },
  {
    name: "게이밍 마우스",
    maker: "ProTech",
    description: "DPI 조절이 가능한 인체공학적 게이밍 마우스",
    image: "https://picsum.photos/seed/gaming-mouse/800/800",
    seller: "ProTech Electronics",
    category: ["전자제품", "주변기기", "마우스"],
    price: 45000,
    stock: 150,
  },
  {
    name: "무선 키보드",
    maker: "KeyMaster",
    description: "저소음 무선 키보드, 사무용 추천",
    image: "https://picsum.photos/seed/wireless-keyboard/800/800",
    seller: "KeyMaster Official",
    category: ["전자제품", "주변기기", "키보드"],
    price: 35000,
    stock: 90,
  },
  {
    name: "스마트워치",
    maker: "FitTime",
    description: "심박수 측정과 운동 기록이 가능한 스마트워치",
    image: "https://picsum.photos/seed/smartwatch/800/800",
    seller: "FitTime",
    category: ["전자제품", "웨어러블", "스마트워치"],
    price: 129000,
    stock: 45,
  },
  {
    name: "블루투스 이어폰",
    maker: "SoundBeat",
    description: "고음질 무선 블루투스 이어폰",
    image: "https://picsum.photos/seed/earbuds/800/800",
    seller: "SoundBeat",
    category: ["전자제품", "오디오", "이어폰"],
    price: 69000,
    stock: 200,
  },
  {
    name: "에코백",
    maker: "GreenBag",
    description: "친환경 소재로 제작된 심플한 에코백",
    image: "https://picsum.photos/seed/ecobag/800/800",
    seller: "GreenBag Store",
    category: ["패션잡화", "가방", "에코백"],
    price: 12000,
    stock: 300,
  },
  {
    name: "보온 텀블러",
    maker: "ThermoCup",
    description: "12시간 보온/보냉이 가능한 텀블러",
    image: "https://picsum.photos/seed/tumbler/800/800",
    seller: "ThermoCup",
    category: ["생활용품", "주방", "텀블러"],
    price: 25000,
    stock: 110,
  },
  {
    name: "게이밍 의자",
    maker: "ChairX",
    description: "장시간 사용에도 편안한 인체공학 게이밍 의자",
    image: "https://picsum.photos/seed/gaming-chair/800/800",
    seller: "ChairX Store",
    category: ["가구", "의자", "게이밍체어"],
    price: 199000,
    stock: 30,
  },
];

export async function main() {
  console.log("🌱 Start seeding ...");

  // 유저 데이터 삽입
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }

  // 상품 데이터 삽입
  await prisma.product.createMany({ data: productData });

  console.log("✅ Seeding finished.");
}

main();
