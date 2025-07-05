import { notFound } from 'next/navigation';
import { getProductsWithCategories } from '@/lib/data';
import { products as staticProducts } from '@/lib/products';
import { Header } from '@/components/header';
import { ProductDetails } from '@/components/product-details';
import type { Product } from '@/lib/products';
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return staticProducts.map((product) => ({
    id: product.id,
  }));
}

async function getProduct(id: string): Promise<Product | undefined> {
    const products = await getProductsWithCategories();
    return products.find(p => p.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id)
 
  if (!product) {
    return {
      title: 'Product Not Found | GameScape',
    }
  }
 
  return {
    title: `${product.title} | GameScape`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ProductDetails product={product} />
      </main>
    </div>
  );
}
