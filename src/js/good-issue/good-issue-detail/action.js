import {GET_GOOD_ISSUE_DETAIL_REQUEST, CREATE_GOOD_ISSUEL_REQUEST, UPDATE_GOOD_ISSUEL_REQUEST} from './contants'

export function getDetailGoodIssue({issueId, token }){
    return {
        type: GET_GOOD_ISSUE_DETAIL_REQUEST,
        issueId,
        token,
    }
}
export function createGoodIssue({data, token }){
    return {
        type: CREATE_GOOD_ISSUEL_REQUEST,
        data,
        token,
    }
}
export function updateGoodIssue({data, token }){
    return {
        type: UPDATE_GOOD_ISSUEL_REQUEST,
        data,
        token,
    }
}
export function reactjsGoodIssue({data, token }){
    return {
        type: GET_GOOD_ISSUE_DETAIL_REQUEST,
        data,
        token,
    }
}