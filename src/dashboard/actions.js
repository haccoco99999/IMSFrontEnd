import { GET_VALUE_DASHBOARD_REQUESTING } from "./constant";

export  function getListDashBoard({token}){
    
    return {
        type: GET_VALUE_DASHBOARD_REQUESTING,
        token,

 }
}