'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import type { Product } from '@/lib/products';
import { searchProductsAction } from '@/lib/actions';
import { ProductCard } from '@/components/product-card';
import { WelcomeTour } from '@/components/welcome-tour';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Gamepad2, Disc3, Headphones, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categoryIcons: { [key: string]: React.ElementType } = {
  'Juegos': Disc3,
  'Consolas': Gamepad2,
  'Accesorios': Headphones,
};

const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || X;
};

interface ProductCatalogProps {
  allProducts: Product[];
}

export function ProductCatalog({ allProducts }: ProductCatalogProps) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  
  const initialSearchState = { products: allProducts, message: '', searchTerm: '' };
  const searchActionWithProducts = searchProductsAction.bind(null, allProducts);
  const [searchState, formAction] = useFormState(searchActionWithProducts, initialSearchState);
  
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    return uniqueCategories.sort();
  }, [allProducts]);
  
  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    searchFormRef.current?.reset();
    formAction(new FormData()); // Trigger form action with empty data to reset search state
  };
  
  useEffect(() => {
    if (searchState.message && searchState.searchTerm) {
      toast({
        title: 'Search Notice',
        description: searchState.message,
      });
    }
  }, [searchState, toast]);

  const displayedProducts = useMemo(() => {
    if (searchState.searchTerm && searchState.products.length > 0) {
      if(activeCategory) setActiveCategory(null);
      return searchState.products;
    }
    if (searchState.searchTerm && searchState.products.length === 0) {
      if(activeCategory) setActiveCategory(null);
      return [];
    }
    if (activeCategory) {
      return allProducts.filter(p => p.category === activeCategory);
    }
    return allProducts;
  }, [activeCategory, allProducts, searchState]);


  return (
    <>
      <WelcomeTour />
      <div className="container mx-auto px-4 py-8">
        <div id="filters" className="mb-8 p-4 bg-card rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-3">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? 'default' : 'outline'}
                  onClick={() => handleCategoryClick(null)}
                  className="transition-all"
                >
                  <X className="mr-2 h-4 w-4" />
                  Todas
                </Button>
                {categories.map(category => {
                  const Icon = getCategoryIcon(category);
                  return (
                    <Button
                      key={category}
                      variant={activeCategory === category ? 'default' : 'outline'}
                      onClick={() => handleCategoryClick(category)}
                      className="transition-all"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {category}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="md:w-1/3">
               <h3 className="text-lg font-semibold mb-3">Buscar</h3>
              <form ref={searchFormRef} action={formAction} className="relative">
                <Input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Buscar juegos, consolas..."
                  className="pr-10"
                  aria-label="Buscar juegos, consolas y accesorios"
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {displayedProducts.length === 0 && (
          <div className="text-center col-span-full py-16">
            <h2 className="text-2xl font-semibold mb-2">No se encontraron productos</h2>
            <p className="text-muted-foreground">Intenta ajustar tus filtros o término de búsqueda.</p>
          </div>
        )}
      </div>
    </>
  );
}
