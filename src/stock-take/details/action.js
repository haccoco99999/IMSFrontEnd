import {
  GET_DETAILS_STOCKTAKE_REQUEST,
  SUBMIT_REQUEST,
  REJECT_STOCKTAKE_REQUEST,
  ADJUST_REQUEST,
  UPDATE_STOCKTAKE_REQUEST,
} from "./constants";

export function getDetailsStockTakeAction({ token, id }) {
  return { type: GET_DETAILS_STOCKTAKE_REQUEST, token, id };
}

export function submitAction({ token, data }) {
  return { type: SUBMIT_REQUEST, token, data };
}
export function rejectAction({ token, data }) {
  return { type: REJECT_STOCKTAKE_REQUEST, token, data };
}
export function adjustAction({ token, data }) {
  return { type: ADJUST_REQUEST, token, data };
}
export function updateAction({ token, data }) {
  return { type: UPDATE_STOCKTAKE_REQUEST, token, data };
}
