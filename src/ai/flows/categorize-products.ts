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

Your task is to categorize the video game based on its description.
Please select the most fitting category from the following list: RPG, Shooter, Puzzle, Strategy, Action, Racing, Survival Horror, Deck-builder.
If none of these categories seem appropriate, you may provide a different, more suitable category. You must provide a category.

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
    const {output, finishReason} = await prompt(input);
    if (!output) {
      throw new Error(`AI failed to categorize product. Finish reason: ${finishReason}`);
    }
    return output;
  }
);
