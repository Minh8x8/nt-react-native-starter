export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchParams: {
    name: string | null;
    priceUnit: string | null;
  };
}
