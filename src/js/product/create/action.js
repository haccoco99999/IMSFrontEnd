import {
  CREATE_PRODUCT_REQUEST,
  GET_ALL_CATEGORY_CREATED_REQUEST,
} from "./constants";

export function createProduct({ data, token }) {
  return { type: CREATE_PRODUCT_REQUEST, data, token };
}

export function getCategoriesAllAction() {
  return { type: GET_ALL_CATEGORY_CREATED_REQUEST };
}
