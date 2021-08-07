import { GET_ALL_PRODUCTS_REQUEST } from "../constants";

export function getAllProductAction({token, filter}) {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
    token,
    filter
  };
}
