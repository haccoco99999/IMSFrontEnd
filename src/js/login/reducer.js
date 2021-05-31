import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_BANNED,
} from './constants'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: [],
}

const reducer = function loginReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            
            return {
                requesting: true,
                successful: false,
                messages: [],
                errors: "",
            }
        case LOGIN_SUCCESS:
           
            return {
                requesting: false,
                successful: true,
                messages: [],
                errors: "",
            }
        case LOGIN_BANNED:
            
            return {
                errors: "banned",
                messages: ["TÀI KHOẢN BỊ KHÓA, LIÊN HỆ VỚI QUẢN LÝ"],
                requesting: false,
                successful: false,
            }
        case LOGIN_ERROR:
            // console.log(action.error.toString())
            let errorMessages
             if(action.error.toString() === "Error: Unauthorized"){
                errorMessages= "Username or password is incorrect!!!"
             }
            return {
                errors: "error-login-opacity",
                messages: [errorMessages],
                requesting: false,
                successful: false,
            }
        default:
            return state
    }
}

export default reducer