import {
  GET_DETAILS_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  GET_DETAILS_VARIANT_REQUEST,
  GET_BRAND_REQUEST,
  GET_DETAILS_PACKAGE_REQUEST,
  UPDATE_VARIANTS_REQUEST,
} from "./constants";

export function getDetailsProductAction({ id, token }) {
  return { type: GET_DETAILS_PRODUCT_REQUEST, id, token };
}

export function updateProductAction({ data, token }) {
  return { type: UPDATE_PRODUCT_REQUEST, data, token };
}

export function getDetailsVariant({ id, token }) {
  return { type: GET_DETAILS_VARIANT_REQUEST, id, token };
}
export function getAllBrandAction({ token }) {
  return { type: GET_BRAND_REQUEST, token };
}
export function getDetailsPackageAction({ id, token }) {
  return { type: GET_DETAILS_PACKAGE_REQUEST, id, token };
}

export function updateVariantAction({ data, token }) {
  return { type: UPDATE_VARIANTS_REQUEST, data, token };
}
