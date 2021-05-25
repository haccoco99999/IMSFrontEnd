import { combineReducers } from "redux";
import client from './user/reducer' 
import login from './login/reducer'

const IndexReducer = combineReducers({
    login,
    client,
})

export default IndexReducer