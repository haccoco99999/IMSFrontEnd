import { GET_ALL_GOOD_ISSUE_REQUEST } from "./constants";

export function getAllGoodIssueAction({ token, currentPage, sizePerPage }) {
  return { type: GET_ALL_GOOD_ISSUE_REQUEST, token, currentPage, sizePerPage };
}
