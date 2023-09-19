interface ProductInput {
  title: string;
  description: string;
  price: number;
  rent: number;
  rentInterval: string;
  createdAt: Date;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  Product: Product;
  productId: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  rent: number;
  rentInterval: string;
  createdAt: Date;
  categories: Category[];
}
export { ProductInput, Category, Product };
