import { GET_VALUE_DASHBOARD_ERROR, GET_VALUE_DASHBOARD_REQUESTING, GET_VALUE_DASHBOARD_SUCCESS } from './constant'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: true,
    dataDashBoard:{
        top5SellingMonth:[],
        top5SellingYear:[]
    }
}
export function getValueDashboard(state = initalState, action){
    switch(action.type){
        case GET_VALUE_DASHBOARD_REQUESTING:
            console.log("okkkkkkk")
            return{
                requesting: true,
                successful: false,
                messages: "",
                errors: false,
                dataDashBoard:{
                    top5SellingMonth:[],
                    top5SellingYear:[]
                }
            }
        case GET_VALUE_DASHBOARD_SUCCESS:
            
            return{
                requesting: false,
                successful: true,
                messages: "",
                errors: false,
                dataDashBoard: action.json.dataDashBoard
                        
            }
        case GET_VALUE_DASHBOARD_ERROR:
            return{
                requesting: false,
                successful: false,
                messages: "",
                errors: true,
                dataDashBoard:{
                    top5SellingMonth:[],
                    top5SellingYear:[]
                }
            }
        default:
            return state
    }
}

