import{
    UPDATE_PROFILE_REQUESTING,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_CLEAN
} from './contants'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}


const updateProfileClient = function updateReducer(state = initalState, action){
    switch(action.type){
        case UPDATE_PROFILE_REQUESTING:
           console.log("update");
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,                
            }
        case UPDATE_PROFILE_SUCCESS:
            return  {
                requesting: false,
                successful: true,
                messages: "Update Success",
                errors: false,               
            }
        case UPDATE_PROFILE_ERROR:
            
            return {
                errors: true,
                messages: "",
                requesting: false,
                successful: false,               
            } 
        case UPDATE_PROFILE_CLEAN:
            return initalState
        default:
            return state
    }
}

export default updateProfileClient