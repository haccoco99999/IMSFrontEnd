import {
  GET_DETAILS_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_REQUEST,
  CLEAR_MESSAGE,
} from "./constants";

export function getDetailsSupplierAction({ id, token }) {
  return { type: GET_DETAILS_SUPPLIER_REQUEST, id, token };
}
export function updateDetailsSupplierAction({ data, token }) {
  return { type: UPDATE_SUPPLIER_REQUEST, data, token };
}

export function deleteSupplierAction({ id, token }) {
  return { type: DELETE_SUPPLIER_REQUEST, id, token };
}

export function clearMessageAction() {
  return { type: CLEAR_MESSAGE };
}
