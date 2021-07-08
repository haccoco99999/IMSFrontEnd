import { CREATE_STOCKTAKE_REQUEST } from "./constants";

export function createGoodIssueRequest({token,data})
{
    return {type:CREATE_GOODISSUE_REQUEST,token}
}

