import { GET_SP_REQUEST } from "./constants";

export function getAllSuppliersAction({ filter, token }) {
  return { type: GET_SP_REQUEST, filter , token };
}
