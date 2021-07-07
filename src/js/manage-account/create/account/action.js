import {CREATE_ACC_REQUEST, GET_DETAIL_ACC_REQUEST, UPDATE_DETAIL_ACC_REQUEST} from './constants'

export  function CreateAccountAction({data,token}){
    return { type:CREATE_ACC_REQUEST,data,token}
}
export  function GET({data,token}){
    return { type:CREATE_ACC_REQUEST,data,token}
}
export function getUserAccountDetail({userID,token}){
    console.log(userID)
    return{
        type: GET_DETAIL_ACC_REQUEST,
        userID,
        token,
    }
}

export function updateUserAccountDetail({data,token}){
  
    return{
        type: UPDATE_DETAIL_ACC_REQUEST,
        data,
        token,
    }
}
