import { GET_ALL_GOOD_ISSUE_REQUESTING } from "./contants";

export function getAllGoodIssue(filter){
    return {
        type:GET_ALL_GOOD_ISSUE_REQUESTING,
        filter,
    }   
}