import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_BANNED,
} from './constants'

const initalState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function loginReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            
            return {
                requesting: true,
                successful: false,
                messages: [],
                errors: [],
            }
        case LOGIN_SUCCESS:
            console.log("thanh cong");
            return {
                requesting: false,
                successful: true,
                messages: [],
                errors: [],
            }
        case LOGIN_BANNED:
            
            return {
                errors: [],
                messages: ["TÀI KHOẢN BỊ KHÓA, LIÊN HỆ VỚI QUẢN LÝ"],
                requesting: false,
                successful: false,
            }
        case LOGIN_ERROR:
            
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        default:
            return state
    }
}

export default reducer