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
    similarityScore: z.number().describe('A score from 0.0 to 1.0 indicating how well the product matches the search term.'),
  })
).describe('A list of products sorted by relevance to the search term.');
export type FuzzySearchProductsOutput = z.infer<typeof FuzzySearchProductsOutputSchema>;

export async function fuzzySearchProducts(input: FuzzySearchProductsInput): Promise<FuzzySearchProductsOutput> {
  return fuzzySearchProductsFlow(input);
}

const fuzzySearchProductsPrompt = ai.definePrompt({
  name: 'fuzzySearchProductsPrompt',
  input: {schema: FuzzySearchProductsInputSchema},
  output: {schema: FuzzySearchProductsOutputSchema},
  prompt: `You are an expert search algorithm specializing in video games. The user is searching for "{{searchTerm}}".

You will be given a list of products. Your task is to analyze this list and return an array of products that are relevant to the search term.

For each product in the original list, you must calculate a 'similarityScore' between 0.0 and 1.0, where 1.0 is a perfect match.

The returned array should only contain products with a similarityScore greater than 0.5. Each object in the array must include the original 'id', 'title', 'description', and the calculated 'similarityScore'.

Finally, sort the returned array in descending order based on the similarityScore. If no products are relevant, return an empty array.

Here is the list of products:
{{{json products}}}
`,
});

const fuzzySearchProductsFlow = ai.defineFlow(
  {
    name: 'fuzzySearchProductsFlow',
    inputSchema: FuzzySearchProductsInputSchema,
    outputSchema: FuzzySearchProductsOutputSchema,
  },
  async (input) => {
    if (!input.searchTerm.trim() || input.products.length === 0) {
        return [];
    }
    const { output } = await fuzzySearchProductsPrompt(input);
    return output || [];
  }
);
