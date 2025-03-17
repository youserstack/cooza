export async function fetchData(url: string) {
  const res = await fetch(url);
  return res.json();
}

export async function fetchNaverShopping() {
  const url =
    `https://openapi.naver.com/v1/search/shop.json` +
    `?query=생활용품` +
    `&start=1` +
    `&display=${100}`;

  const headers = {
    "X-Naver-Client-Id": process.env.AUTH_NAVER_ID as string,
    "X-Naver-Client-Secret": process.env.AUTH_NAVER_SECRET as string,
  };

  const res = await fetch(url, { headers });
  const data = await res.json();
  console.log({ data });

  return data;
}

// interface Props {
//   page?: number;
//   itemsPerPage?: number;
//   query?: string;
//   sort?: string;
//   exclude?: string;
// }

// interface NaverApiData {
//   lastBuildDate: string;
//   total: number;
//   start: number;
//   display: number;
//   items: Product[];
// }

// export async function fetchNaverShopping({
//   page = 1,
//   itemsPerPage = 10,
//   query = "제품",
//   sort = "sim",
//   exclude = "used:rental:cbshop",
// }: Props): Promise<NaverApiData> {
//   const url =
//     `https://openapi.naver.com/v1/search/shop.json` +
//     `?query=${query}` +
//     `&start=${(page - 1) * itemsPerPage + 1}` +
//     `&sort=${sort}` +
//     `&display=${itemsPerPage}` +
//     `&exclude=${exclude}`;

//   const headers = {
//     "X-Naver-Client-Id": process.env.AUTH_NAVER_ID as string,
//     "X-Naver-Client-Secret": process.env.AUTH_NAVER_SECRET as string,
//   };

//   const res = await fetch(url, { headers });
//   const data = await res.json();
//   // console.log({ data });

//   return data;
// }
