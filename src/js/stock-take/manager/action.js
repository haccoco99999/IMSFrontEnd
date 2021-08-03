import { GET_ALL_STOCKTAKE_REQUEST } from "./constants";

export function getAllStocktakeAction({ filter, token }) {
  return { type: GET_ALL_STOCKTAKE_REQUEST, filter, token };
}
