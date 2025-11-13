import productsData from "@/data/products.json"

export interface ProductVariant {
  id: string
  power: string
  price: number
  specifications: Record<string, string>
}

export interface Product {
  id: string
  name: string
  category: string
  price?: number // Optional for products with variants
  image: string
  description: string
  features: string[]
  specifications?: Record<string, string> // Optional for products with variants
  variants?: ProductVariant[] // Optional variants array
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface ProductData {
  categories: Category[]
  products: Product[]
}

export const getProducts = (): Product[] => {
  return (productsData.products || []) as Product[]
}

export const getCategories = (): Category[] => {
  return productsData.categories as Category[]
}

export const getProductById = (id: string): Product | undefined => {
  return productsData.products.find((product) => product.id === id) as Product | undefined
}

export const getProductsByCategory = (categoryId: string): Product[] => {
  return (productsData.products.filter((product) => product.category === categoryId) || []) as Product[]
}

export const getFeaturedProducts = (limit = 4): Product[] => {
  return (productsData.products.slice(0, limit) || []) as Product[]
}

// Helper function to get the starting price of a product (useful for listings)
export const getProductStartingPrice = (product: Product): number => {
  if (product.variants && product.variants.length > 0) {
    // Return the lowest price from variants
    return Math.min(...product.variants.map(v => v.price))
  }
  return product.price || 0
}

// Helper function to check if product has variants
export const hasVariants = (product: Product): boolean => {
  return !!(product.variants && product.variants.length > 0)
}

// Helper function to get variant by id
export const getVariantById = (product: Product, variantId: string): ProductVariant | undefined => {
  if (!product.variants) return undefined
  return product.variants.find(v => v.id === variantId)
}

// Helper function to get default variant (first one)
export const getDefaultVariant = (product: Product): ProductVariant | undefined => {
  if (!product.variants || product.variants.length === 0) return undefined
  return product.variants[0]
}