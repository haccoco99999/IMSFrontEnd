import { GET_ALL_ROLE_REQUEST } from "../../constants";

export default function ({ currentPage, sizePerPage, token }) {
  return {
    type: GET_ALL_ROLE_REQUEST,
    currentPage,
    sizePerPage,
    token,
  };
}
