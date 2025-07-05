'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: '¡Añadido al carrito!',
      description: `${product.title} ahora está en tu carrito.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/catalog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Catálogo
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
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
