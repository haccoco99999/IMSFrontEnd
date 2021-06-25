import { GET_DETAILS_PR_REQUEST,SUBMIT_REQUEST } from "./constants";

export function getPRDetailsAction({ id }) {
  return { type: GET_DETAILS_PR_REQUEST, id };
}

export function submitAction({ id }) {
  return {type:SUBMIT_REQUEST,id}
}