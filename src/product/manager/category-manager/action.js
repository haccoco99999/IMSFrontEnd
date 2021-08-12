import {
  GET_ALL_CATEGORY_REQUEST,
  CREATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST,
} from "../constants";

export function GetAllCategoryAction({ filter, token }) {
  return {
    type: GET_ALL_CATEGORY_REQUEST,
    filter,
    token,
  };
}

export function CreateCategoryAction({ data, token }) {
  return { type: CREATE_CATEGORY_REQUEST, data, token };
}

export function UpdateCategoryAction({ data, token,needCheckName }) {
  return { type: UPDATE_CATEGORY_REQUEST, data, token ,needCheckName};
}
