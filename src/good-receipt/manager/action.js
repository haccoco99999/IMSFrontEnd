import { SEARCH_GOODS_RECEIPT } from "./constant";

export function searchGoodsReceiptAction({ filter, token }) {
  return {
    type: SEARCH_GOODS_RECEIPT,
    filter,
    token
  };
}
