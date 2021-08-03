
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

} from './contants'
const initalGoodIssueDetailState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
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
      {
        discountAmount: "",
        sku: "",
        quantity: "",
        price: "",
        nameProduct: "",
        listPackages: []
      }

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
        errors: "",

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
      let listA
      if (action.json.productPackageFIFO !== undefined ) {
        listA = action.json.productPackageFIFO.map(item => {
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
        listA = action.json.goodsIssueOrder.goodsIssueProducts.map(item => {
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
        errors: "",
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
          listGoodIssueProducts: listA
        }
      }

    case GET_GOOD_ISSUE_DETAIL_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",

      };
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

export const CreateGoodIssue = function createGoodIssue(state = initalGoodIssueState, action) {
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
    default:
      return state;
  }
};



const initalUpdateGoodIssueState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",

};
export const UpadateGoodIssue = function upadateGoodIssue(state = initalUpdateGoodIssueState, action) {
  switch (action.type) {
    case UPDATE_GOOD_ISSUEL_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",

      };
    case UPDATE_GOOD_ISSUE_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case UPDATE_GOOD_ISSUE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",

      };
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
    default:
      return state;
  }
};