
import {
  GET_GOOD_ISSUE_DETAIL_REQUEST,
  GET_GOOD_ISSUE_DETAIL_SUCCESS,
  GET_GOOD_ISSUE_DETAIL_ERROR,
  CREATE_GOOD_ISSUEL_REQUEST,
  CREATE_GOOD_ISSUE_ERROR,
  CREATE_GOOD_ISSUE_SUCCESS,
  UPDATE_GOOD_ISSUEL_REQUEST,
  UPDATE_GOOD_ISSUE_ERROR,
  UPDATE_GOOD_ISSUE_SUCCESS,
  REJECT_GOOD_ISSUE_REQUEST,
  REJECT_GOOD_ISSUE_SUCCESS,
  REJECT_GOOD_ISSUE_ERROR,
  REJECT_GOOD_ISSUE_CLEAN,
  CREATE_GOOD_ISSUE_CLEAN,
  UPDATE_GOOD_ISSUE_CLEAN,
  GET_GOOD_ISSUE_DETAIL_CLEAN,

} from './contants'
const initalGoodIssueDetailState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  infoGoodIssueDetail: {
    id: "",
    customerName: "",
    customerPhoneNumber: "",
    deliveryDate: "",
    deliverMethod: "",
    createdDate: "",
    status: "",
    infoCreater: {
      fullname: "",
      address: "",
      phoneNumber: "",
      email: ""
    },
    listGoodIssueProducts: [
      // {
      //   discountAmount: "",
      //   sku: "",
      //   quantity: "",
      //   price: "",
      //   nameProduct: "",
      //   listPackages: []
      // }

    ]
  }
};

export const DetailGoodIssue = function getDetailGoodIssue(state = initalGoodIssueDetailState, action) {
  switch (action.type) {
    case GET_GOOD_ISSUE_DETAIL_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,

      };
    case GET_GOOD_ISSUE_DETAIL_SUCCESS:
      console.log(action.json.goodsIssueOrder.transaction)

      let transaction
      action.json.goodsIssueOrder.transaction.transactionRecord.forEach(element => {
        if (element.userTransactionActionType === 0) {
          transaction = element
        }
        else {
          transaction = element
        }

      })
      let listProducts
      if (action.json.productPackageFIFO !== undefined ) {
        listProducts = action.json.productPackageFIFO.map(item => {
          return {
            discountAmount: item.orderItem.discountAmount,
            sku: item.orderItem.productVariant.sku,
            quantity: item.orderItem.orderQuantity,
            price: item.orderItem.price,
            nameProduct: item.orderItem.productVariant.name,
            listPackages: item.packagesAndQuantitiesToGet.map(packageItem => {
              return {

                locationName: packageItem.packageToGet.location.locationName,
                locationBar: packageItem.packageToGet.location.locationBarcode,
                quantity: packageItem.quantityToGet,


              }
            })
          }
        })
      }
      else {
        listProducts = action.json.goodsIssueOrder.goodsIssueProducts.map(item => {
          return {
            discountAmount: item.discountAmount,
            sku: item.productVariant.sku,
            quantity: item.orderQuantity,
            price: item.price,
            nameProduct: item.productVariant.name,
            listPackages: []
          }
        })
      }
     
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        infoGoodIssueDetail: {
          id: action.json.goodsIssueOrder.id,
          status: action.json.goodsIssueOrder.goodsIssueOrderStatusString,
          customerName: action.json.goodsIssueOrder.customerName,
          customerPhoneNumber: action.json.goodsIssueOrder.customerPhoneNumber,
          deliveryDate: action.json.goodsIssueOrder.deliveryDate.split("T")[0],
          deliverMethod: action.json.goodsIssueOrder.deliveryMethod,
          createdDate: transaction.date.split("T")[0],
          infoCreater: {
            fullname: transaction.applicationUser.fullname,
            address: transaction.applicationUser.address,
            phoneNumber: transaction.applicationUser.phoneNumber,
            email: transaction.applicationUser.email
          },
          listGoodIssueProducts: listProducts
        }
      }

    case GET_GOOD_ISSUE_DETAIL_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,

      };
    case GET_GOOD_ISSUE_DETAIL_CLEAN:
      return initalGoodIssueDetailState
    default:
      return state;
  }
};

const initalGoodIssueState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",

};

export const createGoodIssue = function createGoodIssue(state = initalGoodIssueState, action) {
  switch (action.type) {
    case CREATE_GOOD_ISSUEL_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",

      };
    case CREATE_GOOD_ISSUE_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case CREATE_GOOD_ISSUE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",

      };
    case CREATE_GOOD_ISSUE_CLEAN:
      return initalGoodIssueState;
    default:
      return state;
  }
};



const initalUpdateGoodIssueState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,

};
export const upadateGoodIssue = function upadateGoodIssue(state = initalUpdateGoodIssueState, action) {
  switch (action.type) {
    case UPDATE_GOOD_ISSUEL_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,

      };
    case UPDATE_GOOD_ISSUE_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: false,

      };
    case UPDATE_GOOD_ISSUE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,

      };
    case UPDATE_GOOD_ISSUE_CLEAN:
      return initalUpdateGoodIssueState
    default:
      return state;
  }
};

const rejectGoodIssueState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",

};
export const RejectGoodIssue = function rejectGoodIssueReducer(state = rejectGoodIssueState, action) {
  switch (action.type) {
    case REJECT_GOOD_ISSUE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",

      };
    case REJECT_GOOD_ISSUE_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case REJECT_GOOD_ISSUE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",

      };
      case REJECT_GOOD_ISSUE_CLEAN:
        return rejectGoodIssueState
    default:
      return state;
  }
};