
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
  success: false,
  messages: "",
  errors: "",
  infoGoodIssueDetail:{
    id: "",
    customerName:"",
    customerPhoneNumber:"",
    deliveryDate:"",
    deliverMethod:"",
    createdDate:"",
    infoCreater:{
      fullname: "",
      address:"",
      phoneNumber:"",
      email:""
    },
    listGoodIssueProducts:[
      {
        discountAmount:"",
        sku:"",
        quantity:"",
        price:"",
        nameProduct:"",
        listPackages:[
         { 
           locationName:"",
           quantity:"",
           totalPrice:"",
        }
        ]
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
        success: false,
        messages: "",
        errors: "",
       
      };
    case GET_GOOD_ISSUE_DETAIL_SUCCESS:
      console.log(action.json.goodsIssueOrder.transaction)
      let transaction
      action.json.goodsIssueOrder.transaction.transactionRecord.forEach(element => {
        if(element.userTransactionActionType === 0){
          transaction = element
        }
        else{
          transaction = element
        }
      
      })
      console.log(transaction)
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        infoGoodIssueDetail:{
          id: action.json.goodsIssueOrder.id,
          customerName:action.json.goodsIssueOrder.customerName,
          customerPhoneNumber:action.json.goodsIssueOrder.customerPhoneNumber,
          deliveryDate:action.json.goodsIssueOrder.deliveryDate.split("T")[0],
          deliverMethod:action.json.goodsIssueOrder.deliveryMethod,
          createdDate: transaction.date.split("T")[0],
          infoCreater:{
            fullname: transaction.applicationUser.fullname,
            address: transaction.applicationUser.address,
            phoneNumber: transaction.applicationUser.phoneNumber,
            email:transaction.applicationUser.email
          },
          listGoodIssueProducts: action.json.goodsIssueOrder.goodsIssueProducts.map(item => {
            return {
              discountAmount: item.discountAmount,
              sku:item.productVariant.sku,
              quantity: item.orderQuantity,
              price: item.price,
              nameProduct: item.productVariant.name,
              listPackages:item.productVariant.packages.map(packageItem =>{
                return {
                  
                    locationName:packageItem.location.locationName,
                    quantity:packageItem.quantity,
                    totalPrice:packageItem.totalPrice,
                 
                }
              })
            }
          })
        }
      };
    case GET_GOOD_ISSUE_DETAIL_ERROR:
      return {
          ...state,
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        
      };
    default:
      return state;
  }
};

const initalGoodIssueState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  
};

export const CreateGoodIssue = function createGoodIssue(state = initalGoodIssueState, action) {
  switch (action.type) {
    case CREATE_GOOD_ISSUEL_REQUEST:
      return {
      ...state,
        requesting: true,
        success: false,
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
        success: false,
        messages: "",
        errors: "",
        
      };
    default:
      return state;
  }
};



const initalUpdateGoodIssueState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    
  };
export const UpadateGoodIssue = function upadateGoodIssue(state = initalUpdateGoodIssueState, action) {
  switch (action.type) {
    case UPDATE_GOOD_ISSUEL_REQUEST:
      return {
      ...state,
        requesting: true,
        success: false,
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
        success: false,
        messages: "",
        errors: "",
        
      };
    default:
      return state;
  }
};

const rejectGoodIssueState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    
  };
export const RejectGoodIssue = function rejectGoodIssueReducer(state = rejectGoodIssueState, action) {
  switch (action.type) {
    case REJECT_GOOD_ISSUE_REQUEST:
      return {
      ...state,
        requesting: true,
        success: false,
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
        success: false,
        messages: "",
        errors: "",
        
      };
    default:
      return state;
  }
};