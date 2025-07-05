'use server';

/**
 * @fileOverview Implements a fuzzy search for video game products.
 *
 * - fuzzySearchProducts - A function that performs the fuzzy search.
 * - FuzzySearchProductsInput - The input type for the fuzzySearchProducts function.
 * - FuzzySearchProductsOutput - The return type for the fuzzySearchProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FuzzySearchProductsInputSchema = z.object({
  searchTerm: z.string().describe('The search term provided by the user.'),
  products: z.array(
    z.object({
      id: z.string().describe('The unique identifier of the product.'),
      title: z.string().describe('The title of the video game.'),
      description: z.string().describe('A short description of the game.'),
    })
  ).describe('The list of video game products to search through.'),
});
export type FuzzySearchProductsInput = z.infer<typeof FuzzySearchProductsInputSchema>;

const FuzzySearchProductsOutputSchema = z.array(
  z.object({
    id: z.string().describe('The unique identifier of the product.'),
    title: z.string().describe('The title of the video game.'),
    description: z.string().describe('A short description of the game.'),
    similarityScore: z.number().describe('The similarity score between the search term and the product title.'),
  })
).describe('A list of products sorted by relevance to the search term.');
export type FuzzySearchProductsOutput = z.infer<typeof FuzzySearchProductsOutputSchema>;

export async function fuzzySearchProducts(input: FuzzySearchProductsInput): Promise<FuzzySearchProductsOutput> {
  return fuzzySearchProductsFlow(input);
}

const fuzzySearchProductsFlow = ai.defineFlow(
  {
    name: 'fuzzySearchProductsFlow',
    inputSchema: FuzzySearchProductsInputSchema,
    outputSchema: FuzzySearchProductsOutputSchema,
  },
  async input => {
    const results = await Promise.all(
      input.products.map(async product => {
        const {text} = await ai.generate({
          prompt: `Calculate the similarity score (from 0 to 1) between the search term "${input.searchTerm}" and the product title "${product.title}". Return only the score.`,
        });

        const similarityScore = parseFloat(text || '0');

        return {
          id: product.id,
          title: product.title,
          description: product.description,
          similarityScore: similarityScore,
        };
      })
    );

    // Sort products by similarity score in descending order
    results.sort((a, b) => b.similarityScore - a.similarityScore);

    return results;
  }
);
