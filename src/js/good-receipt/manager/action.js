import { SEARCH_GOODS_RECEIPT } from "./constant";

export function searchGoodsReceiptAction({ currentPage, sizePerPage,token }) {
  return {
    type: SEARCH_GOODS_RECEIPT,
    currentPage,
    sizePerPage,
    token
  };
}
