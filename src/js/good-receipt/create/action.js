import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_DETAILS_PO_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
  GET_LOCATION_REQUEST
} from "./constant";

export function getConfirmedPOAction(token) {
  return {
    type: GET_CONFIRMED_PURCHASE_ORDER_REQUEST,token
  };
}

export function getConfirmedPODetailsAction({ id, token }) {
  return {
    type: GET_DETAILS_PO_REQUEST,
    id,token
  };
}

export function setCreateingGRRequestAction({ data,token }) {
  return { type: SEND_CREATING_GOODS_RECEIPT_REQUEST, data,token };
}
export function getAllLocationsAction({token}){
  return { type:GET_LOCATION_REQUEST,token}
}


