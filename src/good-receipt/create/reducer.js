// component
import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_CONFIRMED_PURCHASE_ORDER_RESPONSE,
  GET_CONFIRMED_PURCHASE_ORDER_ERROR,

  //PO
  GET_DETAILS_PO_REQUEST,
  GET_DETAILS_PO_RESPONSE,
  GET_DETAILS_PO_ERROR,

  //SAVE
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_RESPONSE,
  SEND_CREATING_GOODS_RECEIPT_ERROR,
  RESET,
  //LOCATION
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
  //CHECK
  CHECK_DUPLICATE_REQUEST,
  CHECK_DUPLICATE_RESPONSE,
  CHECK_DUPLICATE_ERROR,
  //CHECK_EXISTING_
  CHECK_SKUEXISTS_REQUEST,
  CHECK_SKUEXISTS_RESPONSE,
  CHECK_SKUEXISTS_ERROR,
  //RESET
} from "./constant";

const confirmedPOState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  listConfirmedPurchaseOrder: [],
};

export function getAllConfirmedPurchaseOrderReducer(
  state = confirmedPOState,
  action
) {
  switch (action.type) {
    case GET_CONFIRMED_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
        // listConfirmedPurchaseOrder: [],
      };
    case GET_CONFIRMED_PURCHASE_ORDER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listConfirmedPurchaseOrder: action.json.paging.resultList,
      };
    case GET_CONFIRMED_PURCHASE_ORDER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        // listConfirmedPurchaseOrder: [],
      };
    case RESET:
      return confirmedPOState;
    default:
      return state;
  }
}

const detailsPOState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  listProducts: {
    purchaseOrderProduct: [],
  },
};
export function getDetailsPOReducer(state = detailsPOState, action) {
  switch (action.type) {
    case GET_DETAILS_PO_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case GET_DETAILS_PO_RESPONSE:
      return {
        ...state,

        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listProducts: action.json.purchaseOrder,
      };

    case GET_DETAILS_PO_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        listProducts: [],
      };
    case RESET:
      return detailsPOState;
    default:
      return state;
  }
}

const submitPRState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function submitPRReducer(state = submitPRState, action) {
  switch (action.type) {
    case SEND_CREATING_GOODS_RECEIPT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case SEND_CREATING_GOODS_RECEIPT_RESPONSE:
      // console.log(action.json.createdGoodsReceiptId);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdGoodsReceiptId,
        errors: false,
      };

    case SEND_CREATING_GOODS_RECEIPT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return submitPRState;
    default:
      return state;
  }
}

const checkDupState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  hasMatch: false,
};
export function checkDuplicateSKUReducer(state = checkDupState, action) {
  switch (action.type) {
    case CHECK_DUPLICATE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
        hasMatch: false,
      };
    case CHECK_DUPLICATE_RESPONSE:
      console.log(action.json);
      let databaseMatchList = action.json.databaseMatchList;
      let redisMatchList = action.json.redisMatchList;
      // if (redisMatchList.length > 0 && databaseMatchList.length === 0)
      //   return {
      //     ...state,
      //     requesting: true,
      //     successful: false,
      //     messages: "",
      //     errors: false,
      //     hasMatch: true,
      //   };
      // else if (redisMatchList.length === 0 && databaseMatchList.length > 0)
      //   return {
      //     ...state,
      //     requesting: true,
      //     successful: false,
      //     messages: "",
      //     errors: false,
      //     hasMatch: true,
      //   };
      if (redisMatchList.length > 0 || databaseMatchList.length > 0)
        return {
          ...state,
          requesting: true,
          successful: false,
          messages: "",
          errors: false,
          hasMatch: true,
        };
      else
        return {
          ...state,
          requesting: true,
          successful: false,
          messages: "",
          errors: false,
          hasMatch: false,
        };
    case CHECK_DUPLICATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        hasMatch: false,
      };

    default:
      return state;
  }
}

const checkSKUExistsState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  existRedisVariantSkus: [],
};

export function checkSKUExistsReducer(state = checkSKUExistsState, action) {
  switch (action.type) {
    case CHECK_SKUEXISTS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case CHECK_SKUEXISTS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        existRedisVariantSkus: action.json.existRedisVariantSkus,
      };

    case CHECK_SKUEXISTS_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        existRedisVariantSkus: [],
      };
    default:
      return state;
  }
}
