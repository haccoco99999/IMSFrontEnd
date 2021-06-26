import { GET_ALL_ACCOUNT_REQUEST } from "../../constants";

export default function action({ currentPage, sizePerPage, token }) {
  return {
    type: GET_ALL_ACCOUNT_REQUEST,
    currentPage,
    sizePerPage,
    token,
  };
}
