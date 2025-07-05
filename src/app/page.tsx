import { Header } from '@/components/header';
import { ProductCatalog } from '@/components/product-catalog';
import { getProductsWithCategories } from '@/lib/data';

export default async function Home() {
  const products = await getProductsWithCategories();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ProductCatalog allProducts={products} />
      </main>
    </div>
  );
}
