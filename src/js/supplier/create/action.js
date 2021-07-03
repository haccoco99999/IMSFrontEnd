import { CREAT_SUPPLIER_REQUEST } from "./constants";

export function createSupplierAction({ data, token }) {
  return { type: CREAT_SUPPLIER_REQUEST, data, token };
}
