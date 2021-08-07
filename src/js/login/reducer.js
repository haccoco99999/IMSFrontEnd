import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_BANNED,
    LOGIN_CLEAN,
} from './constants'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

const reducer = function loginReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            
            return {
                requesting: true,
                successful: false,
                messages: [],
                errors: false,
            }
        case LOGIN_SUCCESS:
           
            return {
                requesting: false,
                successful: true,
                messages: [],
                errors: false,
            }
        case LOGIN_BANNED:
            
            return {
                errors: true,
                messages: ["Account was Banned"],
                requesting: false,
                successful: false,
            }
        case LOGIN_ERROR:
            // console.log(action.error.toString())
           
            return {
                errors: true,
                messages: "Username or password is not correct!",
                requesting: false,
                successful: false,
            }
        case LOGIN_CLEAN:
            return initalState
        default:
            return state
    }
}

export default reducer