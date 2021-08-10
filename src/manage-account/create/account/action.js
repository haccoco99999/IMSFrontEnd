import {CREATE_ACC_REQUEST, GET_DETAIL_ACC_REQUEST, SET_ACTIVE_ACC_REQUEST, UPDATE_DETAIL_ACC_REQUEST, UPDATE_IMAGE_REQUEST} from './constants'

export  function CreateAccountAction({data,token, formData}){
    return { type:CREATE_ACC_REQUEST,data,token, formData
    
    }
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
export function setActiveAccountAction({data,token}){
    console.log(data)
    return{
        type: SET_ACTIVE_ACC_REQUEST,
        data,
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
export function uploadAvatarImg({formData,token,data, isUpdateUser}){
  
    return{
        type: UPDATE_IMAGE_REQUEST,
        formData,
        data,
        token,
        //Nếu false là dành cho Manager Acccount , true là edit account chính mình
        isUpdateUser: isUpdateUser
    }
}
