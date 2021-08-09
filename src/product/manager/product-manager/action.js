import { GET_ALL_PRODUCTS_REQUEST, GET_ALL_UPDATES_REQUEST } from "../constants";

export function getAllProductAction({token, filter}) {
  return {
    type: GET_ALL_PRODUCTS_REQUEST,
    token,
    filter
  };
}

export function getAllUpdateProductAction({ token }) {
  return {
    type: GET_ALL_UPDATES_REQUEST,
    token,
  };
}

