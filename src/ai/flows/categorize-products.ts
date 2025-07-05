// src/ai/flows/categorize-products.ts
'use server';

/**
 * @fileOverview A product categorization AI agent.
 *
 * - categorizeProducts - A function that handles the product categorization process.
 * - CategorizeProductsInput - The input type for the categorizeProducts function.
 * - CategorizeProductsOutput - The return type for the categorizeProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeProductsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the video game product.'),
});
export type CategorizeProductsInput = z.infer<typeof CategorizeProductsInputSchema>;

const CategorizeProductsOutputSchema = z.object({
  category: z.string().describe('The category of the video game product.'),
});
export type CategorizeProductsOutput = z.infer<typeof CategorizeProductsOutputSchema>;

export async function categorizeProducts(input: CategorizeProductsInput): Promise<CategorizeProductsOutput> {
  return categorizeProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeProductsPrompt',
  input: {schema: CategorizeProductsInputSchema},
  output: {schema: CategorizeProductsOutputSchema},
  prompt: `You are an expert video game product categorization specialist.

You will use the product description to determine the appropriate category for the product.

Description: {{{productDescription}}}
`,
});

const categorizeProductsFlow = ai.defineFlow(
  {
    name: 'categorizeProductsFlow',
    inputSchema: CategorizeProductsInputSchema,
    outputSchema: CategorizeProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
