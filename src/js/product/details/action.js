import {
  GET_DETAILS_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
} from "./constants";

export function getDetailsProductAction({ id, token }) {
  return { type: GET_DETAILS_PRODUCT_REQUEST, id, token };
}

export function updateProductAction({ data, token }) {
  return { type: UPDATE_PRODUCT_REQUEST, data, token };
}
