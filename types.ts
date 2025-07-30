export interface Product {
  map(arg0: (p: any) => any): any;
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
  source?: "fake" | "db";
  seller: {
    name?: string | "Seller pending review";
    email: string;
    rating: number;
    NoReviews: number;
    reviews?: string[];
  };
}

export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  additionalImageUrl?: string[];
}

export interface CategoryResponseDTO {
  name: string;
  image: string;
}
