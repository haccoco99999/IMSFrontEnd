import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_CREATE_PAGE_REQUEST,
} from "../../constants";

export function GetAllCategoryAction() {
  return {
    type: GET_ALL_CATEGORY_REQUEST,
  };
}

export function GetAllCategoryCreatePageAction() {
  return { type: GET_ALL_CATEGORY_CREATE_PAGE_REQUEST };
}
