export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  additionalImageUrl?: string[];
  rating: {
    rate: number;
    count: number;
  };
}
