import { GET_ALL_STOCKTAKE_REQUEST } from "./constants";

export function getAllStocktakeAction({ currentPage, sizePerPage, token }) {
  return { type: GET_ALL_STOCKTAKE_REQUEST, currentPage, sizePerPage, token };
}
