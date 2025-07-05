import { products, type Product } from './products';
import { categorizeProducts } from '@/ai/flows/categorize-products';

// This is an expensive operation and in a real-world application,
// this data should be pre-computed and stored in a database.
// We are adding this note to emphasize the point.
export async function getProductsWithCategories(): Promise<Product[]> {
    const productsWithCategories = await Promise.all(
        products.map(async (product) => {
            if (product.category) {
                return product as Product;
            }
            try {
                // Use a combination of description and title for better categorization
                const contentToCategorize = `${product.title}. ${product.description}`;
                const result = await categorizeProducts({ productDescription: contentToCategorize });
                return { ...product, category: result.category };
            } catch (error) {
                console.error(`Failed to categorize product ${product.id}:`, error);
                // Assign a default category on failure
                return { ...product, category: 'Miscellaneous' };
            }
        })
    );
    return productsWithCategories;
}
