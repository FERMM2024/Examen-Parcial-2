'use server';

import { fuzzySearchProducts } from '@/ai/flows/fuzzy-search-products';
import type { Product } from '@/lib/products';
import { z } from 'zod';

const searchSchema = z.string();

export async function searchProductsAction(
  allProducts: Product[],
  prevState: any,
  formData: FormData
): Promise<{ products: Product[]; message: string, searchTerm: string }> {
  const searchTerm = (formData.get('search') as string) || '';

  if (!searchTerm.trim()) {
    return { products: allProducts, message: '', searchTerm: '' };
  }

  try {
    const aiResults = await fuzzySearchProducts({
      searchTerm: searchTerm,
      products: allProducts.map(p => ({ id: p.id, title: p.title, description: p.description })),
    });

    const productMap = new Map(allProducts.map(p => [p.id, p]));
    
    // The AI now returns sorted and filtered results. We just need to map them back to the full product object.
    const sortedProducts = aiResults
      .map(result => productMap.get(result.id)!)
      .filter(Boolean);

    if (sortedProducts.length === 0) {
      return { products: [], message: `No results found for "${searchTerm}".`, searchTerm };
    }

    return { products: sortedProducts, message: '', searchTerm };
  } catch (error) {
    console.error('Fuzzy search failed:', error);
    return { products: [], message: 'Search failed. Please try again later.', searchTerm };
  }
}
