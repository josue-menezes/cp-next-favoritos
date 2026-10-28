// Campos usados na listagem (o que o enunciado pede)
export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

// Produto completo, usado na página de detalhes
export interface ProductDetails extends Product {
  description: string;
  brand?: string; // alguns produtos não têm marca
  discountPercentage: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  tags: string[];
  reviews: ProductReview[];
}

// Formato da resposta de /products e /products/search
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
