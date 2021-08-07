import {
  CREATE_PR_REQUEST,
  CLEAR_MESSAGE,
  GET_ALL_SUPPLIER_REQUEST,
} from "./constants";

export function createPurchaseRequisitionAction({ data, token }) {
  return { type: CREATE_PR_REQUEST, data, token };
}

export function getALlSuppliersAction({ token }) {
  return { type: GET_ALL_SUPPLIER_REQUEST, token };
}

export function clearMessageAction() {
  return { type: CLEAR_MESSAGE };
}
