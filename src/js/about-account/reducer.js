import{
    UPDATE_PROFILE_REQUESTING,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    CLEAER_UPDATE_PROFILE
} from './contants'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}


const reducer = function updateReducer(state = initalState, action){
    switch(action.type){
        case UPDATE_PROFILE_REQUESTING:
           console.log("update");
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",                
            }
        case UPDATE_PROFILE_SUCCESS:
            return  {
                requesting: false,
                successful: true,
                messages: "Update Success",
                errors: "",               
            }
        case UPDATE_PROFILE_ERROR:
            
            return {
                errors: action.error.toString(),
                messages: "",
                requesting: false,
                successful: false,               
            } 
        case CLEAER_UPDATE_PROFILE:
            return{
                requesting: false,
                successful: false,
                messages: "",
                errors: "",               
            }
        default:
            return state
    }
}

export default reducer