import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <Card className={cn("flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full", className)}>
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg leading-snug">{product.title}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
