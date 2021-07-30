import {LOGIN_REQUESTING} from './constants'

 const loginRequest = function loginRequest({email, password, history}){
    return{
        type: LOGIN_REQUESTING,
        email,
        password,
        history
    }
}
export default loginRequest  