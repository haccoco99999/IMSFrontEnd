import {
  REJECT_UPDATE_SKU_REQUEST,
  AGREE_UPDATE_SKU_REQUEST,
 
} from "../constants";

export function agreeUpdateSKUAction({ token, data }) {
  return { type: AGREE_UPDATE_SKU_REQUEST, token, data };
}
export function rejectUpdateSKUAction({ token, data }) {
  return { type: REJECT_UPDATE_SKU_REQUEST, token, data };
}
