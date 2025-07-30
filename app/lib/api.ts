import { CategoryResponseDTO, Product, ProductRequest } from "@/types";
import uuid from "react-native-uuid";

const API_URL = "https://fakestoreapi.com";
const BACKEND_URL = "http://172.20.10.2:8080"; ///////////// add the address you use to connect to expo here,

// Get all products
const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const backendProducts = await res.json();

    /*const processedBackendProducts = backendProducts.map((p: any) => ({
      ...p,
      source: "db",
      uniqueId: `db-${p.id}`,
      renderId: uuid.v4(),
    }));*/

    return backendProducts;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
};

// Get single product
export const getProduct = async (idNum: string): Promise<Product> => {
  try {
    const id = Number(idNum);

    // Assume fake products have IDs >= 1000000 (or use prefix logic)
    const isFake = id >= 1000000;

    const endpoint = isFake
      ? `${API_URL}/products/${id - 1000000}` // Adjust back to real FakeStore ID
      : `${BACKEND_URL}/api/products/${id}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }

    const data = await response.json();
    console.log(data, `${idNum}`, `${endpoint}`);

    return {
      ...data,
      source: isFake ? "fake" : "db",
      id: id, // Keep your unique app-wide ID
    };
  } catch (error) {
    console.error(`Failed to fetch product ${idNum}:`, error);
    throw error;
  }
};

// Get Category
const getCategory = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const encodedCategory = encodeURIComponent(category);
    const response = await fetch(
      `${BACKEND_URL}api/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    throw error;
  }
};

const searchProductsApi = async (query: string): Promise<Product[]> => {
  // Since FakeStore API doesn't have a direct search endpoint,
  // we'll fetch all products and filter them on the client side
  // In a real app, you would call a dedicated search endpoint
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const products = await response.json();
    const searchTerm = query.toLowerCase().trim();

    return products.filter(
      (product: Product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Failed to search products:", error);
    throw error;
  }
};

const postProduct = async (productData: ProductRequest): Promise<Product> => {
  try {
    console.log(productData);
    const response = await fetch(
      `${BACKEND_URL}/api/products`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        errorData.message ||
          `Backend API: Failed to post product (${response.status})`
      );
    }

    const createdProduct: Product = await response.json();
    return createdProduct;
  } catch (error) {
    console.error("Backend API: Error posting product:", error);
    throw error;
  }
};

export interface Category {
  id: number;
  name: string;
  image: string;
}

export const fetchCategoriesWithImages = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`);
    if (!res.ok) throw new Error("Network response was not ok");

    const categories = await res.json();

    return categories.map((cat: any) => ({
      id: cat.id, // make sure your backend includes this
      name: cat.name,
      image: cat.imageUrl,
    }));
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    throw err;
  }
};

export {
  getCategory,
  getProducts,
  getProductsByCategory,
  searchProductsApi,
  postProduct,
  BACKEND_URL,
  API_URL,
};
