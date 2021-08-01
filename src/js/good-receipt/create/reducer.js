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
} from "./constant";

// const initialState = {
//   requesting: false,
//   successful: false,
//   messages: "",
//   errors: false,
//   listConfirmedPurchaseOrder: [],
//   listProducts: {
//     purchaseOrderProduct: [],
//   },
//   listLocations: [],
// };

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     //Details

//     case GET_LOCATION_REQUEST:
//       return {
//         ...state,
//         requesting: true,
//         successful: false,
//         messages: "",
//         errors: false,
//       };
//     case GET_LOCATION_RESPONSE:
//       return {
//         ...state,
//         requesting: false,
//         successful: true,
//         messages: "",
//         errors: false,
//         listLocations: action.json.paging.resultList,
//       };
//     case GET_LOCATION_ERROR:
//       return {
//         ...state,
//         requesting: false,
//         successful: false,
//         messages: "",
//         errors: true,
//         listLocations: [],
//       };
//     default:
//       return state;
//   }
// }

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
