import { GET_LOCATION_REQUEST,GET_PACKAGE_REQUEST,CREATE_STOCKTAKE_REQUEST } from "./constants";



export function getAllLocationsAction({token}){
    return { type:GET_LOCATION_REQUEST,token}
}

export function getListPackageAction({token,id}){
    return {type:GET_PACKAGE_REQUEST, token, id}
}

export function createStocktkaeAction({token,data}){
    return {type:CREATE_STOCKTAKE_REQUEST,token,data}
}