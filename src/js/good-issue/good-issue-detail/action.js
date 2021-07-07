import {GET_GOOD_ISSUE_DETAIL_REQUEST} from './contants'

export function getDetailGoodIssue({issueId, token }){
    return {
        type: GET_GOOD_ISSUE_DETAIL_REQUEST,
        issueId,
        token,
    }
}
export function createGoodIssue({data, token }){
    return {
        type: GET_GOOD_ISSUE_DETAIL_REQUEST,
        data,
        token,
    }
}
export function updateGoodIssue({data, token }){
    return {
        type: GET_GOOD_ISSUE_DETAIL_REQUEST,
        data,
        token,
    }
}