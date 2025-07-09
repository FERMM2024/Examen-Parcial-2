import { products, type Product } from './products';

// En una aplicación real, estos datos vendrían de una base de datos.
// Por ahora, simplemente los devolvemos desde el archivo local.
export async function getProductsWithCategories(): Promise<Product[]> {
    return Promise.resolve(products);
}
