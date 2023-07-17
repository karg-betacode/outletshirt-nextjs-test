import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/bigcommerce';
import type { VercelProduct as Product } from 'lib/bigcommerce/types';
import Link from 'next/link';


function ThreeItemGridItem({
  item,
  size,
  background
}: {
  item: Product;
  size: 'full' | 'half';
  background: 'white' | 'pink' | 'purple' | 'black';
}) {
  return (
    <div
      className={size === 'full' ? 'lg:col-span-4 lg:row-span-2' : 'lg:col-span-2 lg:row-span-1'}
    >
      <Link className="block h-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          width={size === 'full' ? 1080 : 540}
          height={size === 'full' ? 1080 : 540}
          priority={true}
          background={background}
          alt={item.title}
          labels={{
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}


// const channelIdSegment =
//   parseInt(process.env.BIGCOMMERCE_CHANNEL_ID!) !== 1
//     ? `-${process.env.BIGCOMMERCE_CHANNEL_ID}`
//     : '';
// const domain = `https://store-${process.env.BIGCOMMERCE_STORE_HASH!}${channelIdSegment}`;
// const endpoint = `${domain}.${BIGCOMMERCE_GRAPHQL_API_ENDPOINT}`;

// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJlYXQiOjE3NTIyMTkxODYsImlhdCI6MTY4OTA4OTg0MywiaXNzIjoiQkMiLCJzaWQiOjEwMDE2NTM3MjQsInN1YiI6InR1emhyODgzN2dxNXM2cWwwYXNudzM4bWcwZDR4MjgiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.ClAkQDubpdUJK3CNX9Cjp_Sd_hqi_twh5Q6ooy10D-qs04B8X3U1ZdtR3yFIL2Zyg0Cvyb8IgwhvdDSfm4OImQ"

// async function getStuff(): Promise<any> {
//   const result = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN}`,
//       //Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       query: getNewestProductsQuery,
//       variables: {
//         first: 3
//       }
//     }),
//   });

//   const body = await result.json();

//   if (body.errors) {
//     throw body.errors[0];
//   }

//   return {
//     status: result.status,
//     body
//   };
// }

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  // const data = await getStuff();

  return (
    <>
    <section className="lg:grid lg:grid-cols-6 lg:grid-rows-2" data-testid="homepage-products">
      <ThreeItemGridItem size="full" item={firstProduct} background="purple" />
      <ThreeItemGridItem size="half" item={secondProduct} background="black" />
      <ThreeItemGridItem size="half" item={thirdProduct} background="pink" />
    </section>
    </>
  );
}
