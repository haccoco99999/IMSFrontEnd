import { GET_SP_REQUEST } from "./constants";

export function getAllSuppliersAction({ currentPage, sizePerPage, token }) {
  return { type: GET_SP_REQUEST, currentPage, sizePerPage, token };
}
