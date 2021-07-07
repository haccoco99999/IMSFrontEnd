import { GET_ALL_PR_REQUEST } from "./constants";

export function getAllPRAction({ currentPage, sizePerPage,token }) {
  return { type: GET_ALL_PR_REQUEST, currentPage, sizePerPage,token };
}
