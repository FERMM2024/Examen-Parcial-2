import Image from 'next/image';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1", className)}>
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={400}
            className="object-cover w-full h-full"
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
  );
}
