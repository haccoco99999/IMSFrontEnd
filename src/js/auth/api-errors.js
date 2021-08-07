// import { LOGOUT_REQUESTING } from "../login/constants";
// import { call, put, takeEvery } from "redux-saga/effects";
// import store from '../store'

export default function  handleApiErrors (response) {  

    if (response.status !== 200) { 
      if(response.status === 401){
        throw Error(response.statusText)
      
      }
      else{
        throw Error(response.statusText)
      }
    }
   
    return response;
  }

