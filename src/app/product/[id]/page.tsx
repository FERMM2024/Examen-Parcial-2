import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductsWithCategories } from '@/lib/data';
import { products as staticProducts } from '@/lib/products';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
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
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Catalog
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="sticky top-20">
            <div className="aspect-video overflow-hidden rounded-lg border">
                <Image
                src={product.image}
                alt={product.title}
                width={1200}
                height={675}
                className="object-cover w-full h-full"
                data-ai-hint={product.dataAiHint}
                />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Badge variant="secondary" className="w-fit">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
            <div className="text-4xl font-bold text-primary mt-4">
              ${product.price.toFixed(2)}
            </div>
            <div className="mt-auto pt-4">
                <Button size="lg" className="w-full md:w-auto">Add to Cart</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
