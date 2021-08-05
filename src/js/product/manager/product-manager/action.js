import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_UPDATES_REQUEST,
} from "../constants";

export function getAllProductAction({ token, currentPage, sizePerPage }) {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
    token,
    currentPage,
    sizePerPage,
  };
}

export function getAllUpdateProductAction({ token }) {
  return {
    type: GET_ALL_UPDATES_REQUEST,
    token,
  };
}
