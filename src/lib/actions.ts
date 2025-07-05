'use server';

import { fuzzySearchProducts } from '@/ai/flows/fuzzy-search-products';
import type { Product } from '@/lib/products';
import { z } from 'zod';

const searchSchema = z.string().min(1, 'Please enter a search term.');

export async function searchProductsAction(
  allProducts: Product[],
  prevState: any,
  formData: FormData
): Promise<{ products: Product[]; message: string, searchTerm: string }> {
  const searchTerm = formData.get('search') as string;

  const validatedSearch = searchSchema.safeParse(searchTerm);

  if (!validatedSearch.success) {
    return { products: allProducts, message: validatedSearch.error.errors[0].message, searchTerm: '' };
  }

  try {
    const aiResults = await fuzzySearchProducts({
      searchTerm: validatedSearch.data,
      products: allProducts.map(p => ({ id: p.id, title: p.title, description: p.description })),
    });

    const productMap = new Map(allProducts.map(p => [p.id, p]));
    const sortedProducts = aiResults
      .filter(result => result.similarityScore > 0.5) // Filter out low-similarity results
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
