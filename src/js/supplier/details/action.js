import { GET_DETAILS_SUPPLIER_REQUEST } from "./constants";

export function getDetailsSupplierAction({ id }) {
  return { type: GET_DETAILS_SUPPLIER_REQUEST, id };
}
