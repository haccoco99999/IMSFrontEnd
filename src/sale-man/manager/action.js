import { GET_ALL_PR_REQUEST } from "./constants";

export function getAllPRAction({ filter ,token }) {
  return { type: GET_ALL_PR_REQUEST, filter ,token };
}
