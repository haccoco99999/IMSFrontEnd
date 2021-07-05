import { CREATE_GOODISSUE_REQUEST, ADD_GOODISSUE_REQUEST } from "./constants";

export function createGoodIssueRequest({token})
{
    return {type:CREATE_GOODISSUE_REQUEST,token}
}

export function addGoodIssueRequest({data,token})
{
    return {type:ADD_GOODISSUE_REQUEST,data,token}
}