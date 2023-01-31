import { api } from "~/lib/axios";
import { Product } from "~/types";

export const getAllProducts = async (): Promise<Array<Product>> => {
  const { data } = await api.get("/products");
  return data;
};
