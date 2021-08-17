import {
  CREATE_STOCKTAKE_REQUEST,
  CREATE_STOCKTAKE_RESPONSE,
  CREATE_STOCKTAKE_ERROR,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_RESPONSE,
  GET_PACKAGE_ERROR,
  RESET,
} from "./constants";

// const initalState = {
//   requesting: false,
//   successful: false,
//   messages: "",
//   errors: "",
//   listLocations: [],
//   listPackages: [],
// };

// export function temp(state = initalState, action) {
//   switch (action.type) {
//     case GET_LOCATION_REQUEST:
//       return {
//         ...state,
//         requesting: true,
//         successful: false,
//         messages: "",
//         errors: "",
//       };
//     case GET_LOCATION_RESPONSE:
//       return {
//         ...state,
//         requesting: false,
//         successful: true,
//         messages: "",
//         errors: "",
//         listLocations: action.json.paging.resultList,
//       };
//     case GET_LOCATION_ERROR:
//       return {
//         ...state,
//         requesting: false,
//         successful: false,
//         messages: "",
//         errors: "",
//         listLocations: [],
//       };
//   }
// }

//todo:get details package
const getDetailsPackage = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listPackages: [],
};

export function getDetailsPackageReducer(state = getDetailsPackage, action) {
  switch (action.type) {
    case GET_PACKAGE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listPackages: [],
      };
    case GET_PACKAGE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listPackages: action.json.paging.resultList,
      };
    case GET_PACKAGE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listPackages: [],
      };
      case RESET:
        return getDetailsPackage
    default:
      return state;
  }
}

//todo: create stocktake

const createStocktake = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function createStocktakeReducer(state = createStocktake, action) {
  switch (action.type) {
    case CREATE_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case CREATE_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.stockTakeOrderId,
        errors: false,
      };
    case CREATE_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return createStocktake;
    default:
      return state;
  }
}
