import { CREATE_PRODUCT_REQUEST,GET_ALL_CATEGORY_CREATED_REQUEST } from "./constants";

export function createProduct({ data }) {
  return { type: CREATE_PRODUCT_REQUEST, data };
}

export function getCategoriesAllAction(){
  return {type:GET_ALL_CATEGORY_CREATED_REQUEST}
}


