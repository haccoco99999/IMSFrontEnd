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
  UPDATE_VARIANTS_REQUEST,
  UPDATE_VARIANTS_RESPONSE,
  UPDATE_VARIANTS_ERROR,
  RESET,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  productDetails: {
    brand: {},
    category: {},
    productVariants: null,
  },
};

export function getDetailsProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
        // productDetails: {},
      };
    case GET_DETAILS_PRODUCT_RESPONSE:
      console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        productDetails: action.json.product,
      };
    case GET_DETAILS_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        productDetails: {},
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

const updateProductState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function updateProductReducer(state = updateProductState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_PRODUCT_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Duplicate",
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Update Product Success",
          errors: false,
        };
    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return updateProductState;
    default:
      return state;
  }
}
const updateVariantState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function updateVariantReducer(state = updateVariantState, action) {
  switch (action.type) {
    case UPDATE_VARIANTS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_VARIANTS_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: action.errorMsg,
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Update Variant success",
          errors: false,
        };

    case UPDATE_VARIANTS_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return updateVariantState;
    default:
      return state;
  }
}

const packageState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  package: {
    productVariant: {},
    supplier: {},
    location: {},
    goodsReceiptOrder: {
      receivedDate: "",
    },
    importedDate: "",
  },
};
export function gePackageReducer(state = packageState, action) {
  switch (action.type) {
    case GET_DETAILS_PACKAGE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_DETAILS_PACKAGE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        package: action.json.package,
      };
    case GET_DETAILS_PACKAGE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        package: {},
      };
    case RESET:
      return packageState;
    default:
      return state;
  }
}
const variantState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  productVariant: {
    packages: null,
  },
};
export function getDetailsVariantReducer(state = variantState, action) {
  switch (action.type) {
    case GET_DETAILS_VARIANT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_DETAILS_VARIANT_RESPONSE:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
        productVariant: action.json.productVariant,
      };
    case GET_DETAILS_VARIANT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return variantState;
    default:
      return state;
  }
}

const brandState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  productDetails: {
    brand: {},
    category: {},
    productVariants: null,
  },
  listBrand: [],
};
export function getBrandReducer(state = brandState, action) {
  switch (action.type) {
    case GET_BRAND_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_BRAND_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listBrand: action.json.paging.resultList,
      };
    case GET_BRAND_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        listBrand: [],
      };

    default:
      return state;
  }
}
