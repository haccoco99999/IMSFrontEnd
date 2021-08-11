import {
  AGREE_UPDATE_SKU_REQUEST,
  AGREE_UPDATE_SKU_RESPONSE,
  AGREE_UPDATE_SKU_ERR,
  REJECT_UPDATE_SKU_REQUEST,
  REJECT_UPDATE_SKU_RESPONSE,
  REJECT_UPDATE_SKU_ERR,
  RESET,
} from "../constants";


const agreeUpDateState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function agreeUpdateRequestSkuReducer(state = agreeUpDateState, action) {
  switch (action.type) {
    case AGREE_UPDATE_SKU_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case AGREE_UPDATE_SKU_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
      };

    case AGREE_UPDATE_SKU_ERR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return agreeUpDateState;
    default:
      return state;
  }
}

const rejectState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function rejectUpdateRequestSkuReducer(state = rejectState, action) {
  switch (action.type) {
    case REJECT_UPDATE_SKU_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case REJECT_UPDATE_SKU_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
      };

    case REJECT_UPDATE_SKU_ERR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };

    case RESET:
      return rejectState;
    default:
      return state;
  }
}
