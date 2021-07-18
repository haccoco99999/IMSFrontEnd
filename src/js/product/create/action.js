import {
  CREATE_PRODUCT_REQUEST,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  // GET_BRAND_REQUEST,
} from "./constants";

export function createProduct({ data, token }) {
  return { type: CREATE_PRODUCT_REQUEST, data, token };
}

export function getCategoriesAllAction({ token }) {
  return { type: GET_ALL_CATEGORY_CREATED_REQUEST, token };
}

// export function getAllBrandAction({ token }) {
//   return { type: GET_BRAND_REQUEST, token };
// }
