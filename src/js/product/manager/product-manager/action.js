import { GET_ALL_PRODUCTS_REQUEST } from "../../constants";

export function getAllProductAction({token, currentPage, sizePerPage}) {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
    token,
    currentPage,
    sizePerPage,
  };
}
