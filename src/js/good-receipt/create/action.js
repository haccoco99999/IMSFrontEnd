import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_DETAILS_PO_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
} from "./constant";

export function getConfirmedPOAction() {
  return {
    type: GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  };
}

export function getConfirmedPODetailsAction({ id }) {
  return {
    type: GET_DETAILS_PO_REQUEST,
    id,
  };
}

export function setCreateingGRRequestAction( {data} ) {
  return { type: SEND_CREATING_GOODS_RECEIPT_REQUEST, data };
}
