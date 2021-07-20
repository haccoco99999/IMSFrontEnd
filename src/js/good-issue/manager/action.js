import { GET_ALL_GOOD_ISSUE_REQUESTING, GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING } from "./contants";

export function getAllGoodIssue(filter){
    return {
        type:GET_ALL_GOOD_ISSUE_REQUESTING,
        filter,
    }   
}
export function getAllGoodIssueRequisition(){
    return {
        type:GET_ALL_GOOD_ISSUE_REQUISITION_REQUESTING,
        
    }   
}