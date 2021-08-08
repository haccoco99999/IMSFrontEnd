import {
  GET_DETAILS_STOCKTAKE_REQUEST,
  GET_DETAILS_STOCKTAKE_RESPONSE,
  GET_DETAILS_STOCKTAKE_ERROR,
  REJECT_STOCKTAKE_REQUEST,
  REJECT_STOCKTAKE_RESPONSE,
  REJECT_STOCKTAKE_ERROR,
  SUBMIT_REQUEST,
  SUBMIT_ERROR,
  SUBMIT_RESPONSE,
  ADJUST_REQUEST,
  ADJUST_RESPONSE,
  ADJUST_ERROR,
  UPDATE_STOCKTAKE_REQUEST,
  UPDATE_STOCKTAKE_RESPONSE,
  UPDATE_STOCKTAKE_ERROR,
  RESET,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  stocktake: {
    groupLocations: [],
    stockTakeOrderType: "",
    id: "",
    transaction: {
      transactionRecord: [
        {
          date: "",
          applicationUser: { fullName: "", phoneNumber: "", email: "" },
        },
      ],
      transactionRecordCompacts: [
        { transactionName: "", user: "", date: "", action: "" },
      ],
    },
  },
};

export function getDetailsStocktakeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_DETAILS_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        stocktake: action.json.singleResult,
      };
    case GET_DETAILS_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: true,
        stocktake: {},
      };

    case RESET:
      return initialState;
    default:
      return state;
  }
}

const updateState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function updateStocktakeReducer(state = updateState, action) {
  switch (action.type) {
    case UPDATE_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: false,
      };
    case UPDATE_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return updateState;
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

export function rejectStocktakeReducer(state = rejectState, action) {
  switch (action.type) {
    case REJECT_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case REJECT_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Reject Success",
        errors: false,
      };
    case REJECT_STOCKTAKE_ERROR:
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
const adjustState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function adjustStocktakeReducer(state = adjustState, action) {
  switch (action.type) {
    case ADJUST_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case ADJUST_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Adjust Success",
        errors: false,
      };
    case ADJUST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return adjustState;
    default:
      return state;
  }
}
const submitState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function submitStocktakeReducer(state = submitState, action) {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case SUBMIT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Submit Success",
        errors: false,
      };
    case SUBMIT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return submitState;
    default:
      return state;
  }
}
