import { GET_DETAILS_STOCKTAKE_REQUEST } from "./constants";

export function getDetailsStockTakeAction({ token, id }) {
  return { type: GET_DETAILS_STOCKTAKE_REQUEST, token, id };
}
