import {
  GET_DETAILS_PR_REQUEST,
  SUBMIT_REQUEST,
  UPDATE_PR_REQUEST,
  CLEAR_MESSAGE,
} from "./constants";

export function getPRDetailsAction({ id, token }) {
  return { type: GET_DETAILS_PR_REQUEST, id, token };
}

export function submitAction({ id, token }) {
  return { type: SUBMIT_REQUEST, id, token };
}

export function updateAction({ data, token }) {
  return { type: UPDATE_PR_REQUEST, data, token };
}

export function clearMessageAction() {
  return { type: CLEAR_MESSAGE };
}
