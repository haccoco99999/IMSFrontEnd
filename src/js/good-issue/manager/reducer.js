
import {GET_ALL_GOOD_ISSUE_ERROR,GET_ALL_GOOD_ISSUE_REQUESTING,GET_ALL_GOOD_ISSUE_SUCCESS,
GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING,GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS, GET_ALL_GOOD_ISSUE_REQUISITION_ERROR
} from './contants'
  const initalListGoodIssuesState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    infoListGoodIssue:{
        listGoodIssue:[{
            id:"",
            transactionId:"",
            goodsIssueNumber:"",
            goodsIssueRequestNumber:"",
            deliveryMethod:"",
            status:"",
            createdByName:"",
            deliveryDate:"",
            createdDate:"",

        }],
        currentPage: 0,
        pageCount: 0,
        sizePerPage: 0,
        rowCountTotal: 0,
        skipValue: 0

    }
  };
  
  export const GetAllGoodIssues = function getAllGoodIssues(state = initalListGoodIssuesState, action) {
    switch (action.type) {
      case GET_ALL_GOOD_ISSUE_REQUESTING:
        return {
        ...state,
          requesting: true,
          success: false,
          messages: "",
          errors: "",
         
        };
      case GET_ALL_GOOD_ISSUE_SUCCESS:
        
        return {
      
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          infoListGoodIssue:{
            listGoodIssue:(action.json.paging.resultList.map(item => {
                return {
                    id: item.id,
                    transactionId: item.transactionId,
                    goodsIssueNumber: item.goodsIssueNumber,
                    goodsIssueRequestNumber: item.goodsIssueRequestNumber,
                    deliveryMethod: item.deliveryMethod,
                    status: item.status,
                    createdByName: item.createdByName,
                    deliveryDate: item.deliveryDate.split("T")[0],
                    createdDate: item.createdDate.split("T")[0],  
                }
            })),
            currentPage: action.json.paging.currentPage,
            pageCount: action.json.paging.pageCount,
            sizePerPage: action.json.paging.sizePerPage,
            rowCountTotal:action.json.paging.rowCountTotal,
            skipValue: 0
    
        }
        };
      case GET_ALL_GOOD_ISSUE_ERROR:
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
  const initalListGoodIssuesRequisitionState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    infoListGoodIssueRequisition:{
        listGoodIssueRequisition:[{
            id:"",
            transactionId:"",
            goodsIssueNumber:"",
            goodsIssueRequestNumber:"",
            deliveryMethod:"",
            status:"",
            createdByName:"",
            deliveryDate:"",
            createdDate:"",

        }],
        currentPage: 0,
        pageCount: 0,
        sizePerPage: 0,
        rowCountTotal: 0,
        skipValue: 0

    }
  };
  
  export const getAllGoodIssuesRequisition = function getAllGoodIssuesRequisitionReducer(state = initalListGoodIssuesRequisitionState, action) {
    switch (action.type) {
      case GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING:
        return {
        ...state,
          requesting: true,
          success: false,
          messages: "",
          errors: "",
         
        };
      case GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS:
        
        return {
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          infoListGoodIssueRequisition:{
            listGoodIssueRequisition:(action.json.paging.resultList.map(item => {
                return {
                    id: item.id,
                    transactionId: item.transactionId,
                    goodsIssueNumber: item.goodsIssueNumber,
                    goodsIssueRequestNumber: item.goodsIssueRequestNumber,
                    deliveryMethod: item.deliveryMethod,
                    status: item.status,
                    createdByName: item.createdByName,
                    deliveryDate: item.deliveryDate.split("T")[0],
                    createdDate: item.createdDate.split("T")[0],  
                }
            })),
            currentPage: action.json.paging.currentPage,
            pageCount: action.json.paging.pageCount,
            sizePerPage: action.json.paging.sizePerPage,
            rowCountTotal:action.json.paging.rowCountTotal,
            skipValue: 0
    
        }
        };
      case GET_ALL_GOOD_ISSUE_REQUISITION_ERROR:
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