import { GET_ALL_GOOD_ISSUE_REQUESTING, GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING } from "./contants";

export function getAllGoodsIssue({filter, token}){
    return {
        type:GET_ALL_GOOD_ISSUE_REQUESTING,
        filter,
        token
    }   
}
export function getAllGoodsIssueRequisition(){
    return {
        type:GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING,
        
    }   
}