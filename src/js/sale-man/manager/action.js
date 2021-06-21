import { GET_ALL_PR_REQUEST } from "./constants";

export function getAllPRAction({ currentPage, sizePerPage }) {
  return { type: GET_ALL_PR_REQUEST, currentPage, sizePerPage };
}
