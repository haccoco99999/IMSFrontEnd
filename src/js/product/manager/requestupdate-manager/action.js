import { GET_ALL_VARIANTS_REQUEST } from "../constants";

export function getAllVariantsAction({ token, currentPage, sizePerPage }) {
  return { type: GET_ALL_VARIANTS_REQUEST, token, currentPage, sizePerPage };
}
