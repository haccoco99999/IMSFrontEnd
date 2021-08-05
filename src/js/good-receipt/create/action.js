import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_DETAILS_PO_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
  GET_LOCATION_REQUEST,
  CHECK_DUPLICATE_REQUEST,
  CHECK_SKUEXISTS_REQUEST,
} from "./constant";

export function getConfirmedPOAction({ token }) {
  return {
    type: GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
    token,
  };
}

export function getConfirmedPODetailsAction({ id, token }) {
  return {
    type: GET_DETAILS_PO_REQUEST,
    id,
    token,
  };
}

export function createGoodsReceiptAction({ data, token }) {
  return { type: SEND_CREATING_GOODS_RECEIPT_REQUEST, data, token };
}
export function getAllLocationsAction({ token }) {
  return { type: GET_LOCATION_REQUEST, token };
}

export function checkDuplicateSKUAction({ data, token }) {
  return { type: CHECK_DUPLICATE_REQUEST, data, token };
}

export function checkSKUExistedAction({ id, token }) {
  return { type: CHECK_SKUEXISTS_REQUEST, id, token };
}
