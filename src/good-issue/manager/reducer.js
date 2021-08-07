
import {GET_ALL_GOOD_ISSUE_ERROR,GET_ALL_GOOD_ISSUE_REQUESTING,GET_ALL_GOOD_ISSUE_SUCCESS,
GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING,GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS, GET_ALL_GOOD_ISSUE_REQUISITION_ERROR
} from './contants'


  const initalListGoodIssuesState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
    infoListGoodIssue:{
        listGoodIssue:[{
      
        }],
        currentPage: 0,
        pageCount: 0,
        sizePerPage: 0,
        rowCountTotal: 0,
        skipValue: 0

    }
  };
  
  export const GetAllGoodsIssues = function getAllGoodIssues(state = initalListGoodIssuesState, action) {
    switch (action.type) {
      case GET_ALL_GOOD_ISSUE_REQUESTING:
        return {
        ...state,
        infoListGoodIssue:{...state.infoListGoodIssue,listGoodIssue:[] },
          requesting: true,
          successful: false,
          messages: "",
          errors: false,
         
        };
      case GET_ALL_GOOD_ISSUE_SUCCESS:
        
        return {
      
          requesting: false,
          successful: true,
          messages: "",
          errors: false,
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
          successful: false,
          messages: "",
          errors: true,
          
        };
      default:
        return state;
    }
  };
  const initalListGoodIssuesRequisitionState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
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
  
  export const getAllGoodsIssuesRequisition = function getAllGoodIssuesRequisitionReducer(state = initalListGoodIssuesRequisitionState, action) {
    switch (action.type) {
      case GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING:
        return {
        ...state,
          requesting: true,
          successful: false,
          messages: "",
          errors: false,
         
        };
      case GET_ALL_GOOD_ISSUE_REQUISITION_SUCCESS:
        
        return {
          requesting: false,
          successful: true,
          messages: "",
          errors: false,
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
          successful: false,
          messages: "",
          errors: true,
          
        };
      default:
        return state;
    }
  };