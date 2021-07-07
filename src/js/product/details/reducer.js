import {
  GET_DETAILS_PRODUCT_REQUEST,
  GET_DETAILS_PRODUCT_RESPONSE,
  GET_DETAILS_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESPONSE,
  UPDATE_PRODUCT_ERROR,
  GET_DETAILS_VARIANT_REQUEST,
  GET_DETAILS_VARIANT_RESPONSE,
  GET_DETAILS_VARIANT_ERROR,
  GET_BRAND_RESPONSE,
  GET_BRAND_REQUEST,
  GET_BRAND_ERROR,
  GET_DETAILS_PACKAGE_REQUEST,
  GET_DETAILS_PACKAGE_RESPONSE,
  GET_DETAILS_PACKAGE_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  productDetails: {
    brand: {},
    productVariants: null,
  },
  productVariant: {
    packages: null,
  },
  listBrand: [],
  package: {
    productVariant: {},
    supplier: {},
    goodsReceiptOrder: {
      receivedDate: "",
    },
    importedDate: "",
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        // productDetails: {},
      };
    case GET_DETAILS_PRODUCT_RESPONSE:
      console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        productDetails: action.json.product,
      };
    case GET_DETAILS_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        productDetails: {},
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_PRODUCT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: "",
      };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_DETAILS_VARIANT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_DETAILS_VARIANT_RESPONSE:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        productVariant: action.json.productVariant,
      };
    case GET_DETAILS_VARIANT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_BRAND_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_BRAND_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listBrand: action.json.paging.resultList,
      };
    case GET_BRAND_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listBrand: [],
      };
    case GET_DETAILS_PACKAGE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_DETAILS_PACKAGE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        package: action.json.package,
      };
    case GET_DETAILS_PACKAGE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        package: {},
      };
    default:
      return state;
  }
}
