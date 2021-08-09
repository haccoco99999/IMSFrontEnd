// import { LOGOUT_REQUESTING } from "../login/constants";
// import { call, put, takeEvery } from "redux-saga/effects";
// import store from '../store'
import { history  } from "../history";
export default function  handleApiErrors (response) {  

    if (response.status !== 200) { 
      if(response.status === 401){
        history.push("/login", {messsages:"Sesstion time out!!!"})
        throw Error(response.statusText)
      }
      else{
        throw Error(response.statusText)
      }
    }
   
    return response;
  }

