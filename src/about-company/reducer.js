import{
    UPDATE_COMPANY_CLEAN,
    UPDATE_COMPANY_ERROR,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_REQUESTING,
} from './contants'

const companyState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}


export function  updateCompany (state = companyState, action){
    switch(action.type){
        case UPDATE_COMPANY_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,                
            }
        case UPDATE_COMPANY_SUCCESS:
            return  {
                requesting: false,
                successful: true,
                messages: "Update Success",
                errors: false,               
            }
        case UPDATE_COMPANY_ERROR:
            
            return {
                errors: true,
                messages: "",
                requesting: false,
                successful: false,               
            } 
        case UPDATE_COMPANY_CLEAN :
            return companyState
        default:
            return state
    }
}

