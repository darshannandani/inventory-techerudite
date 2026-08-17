export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  categories: Category[];
  createdAt: string;
}
