
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

} from './contants'
const initalGoodIssueDetailState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  infoGoodIssueDetail:{
    customerName:"",
    customerPhoneNumber:"",
    deliveryDate:"",
    deliverMethod:"",
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
      console.log(action)
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        infoGoodIssueDetail:{
          customerName:action.json.goodsIssueOrder.customerName,
          customerPhoneNumber:action.json.goodsIssueOrder.customerPhoneNumber,
          deliveryDate:action.json.goodsIssueOrder.deliveryDate,
          deliverMethod:action.json.goodsIssueOrder.deliveryMethod,
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
    case GET_GOOD_ISSUE_DETAIL_REQUEST:
      return {
      ...state,
        requesting: true,
        success: false,
        messages: "",
        errors: "",
       
      };
    case GET_GOOD_ISSUE_DETAIL_SUCCESS:
      
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        
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