import { combineReducers } from "redux";
import client from './user/reducer' 
import login from './login/reducer'
import updateProfile from './about-account/reducer'
// import updateProfile from './about-account/reducer'
const IndexReducer = combineReducers({
    login,
    client,
    updateProfile,
    
   
})

export default IndexReducer