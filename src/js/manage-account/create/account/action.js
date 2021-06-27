import {CREATE_ACC_REQUEST} from './constants'

export  function CreateAccountAction({data,token}){
    return { type:CREATE_ACC_REQUEST,data,token}
}