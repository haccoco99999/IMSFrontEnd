import { GET_ALL_CATEGORY_REQUEST } from "../../constants";

export function GetAllCategoryAction({ currentPage, sizePerPage, token }) {
  return {
    type: GET_ALL_CATEGORY_REQUEST,
    currentPage,
    sizePerPage,
    token,
  };
}

export function CreateCategoryAction({ data,token}){
  return {}
}
