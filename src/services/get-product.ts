import { api } from "~/lib/axios";
import { Product } from "~/types";

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
