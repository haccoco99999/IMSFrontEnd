import { UPDATE_COMPANY_REQUESTING } from "./contants";

export function updateCompany({data, formData, token}){
    return{
        type: UPDATE_COMPANY_REQUESTING,
        data, formData, token
    }
}