import { GET_DETAILS_PR_REQUEST } from "./constants";

export function getPRDetailsAction({ id }) {
  return { type: GET_DETAILS_PR_REQUEST, id };
}
