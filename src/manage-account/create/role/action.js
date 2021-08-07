import {CREATE_ROLE_REQUESTING, GET_DETAIL_ROLE_REQUESTING , UPDATE_DETAIL_ROLE_REQUESTING} from './contants'

export function createRole({data, token}){
    return {
        type: CREATE_ROLE_REQUESTING,
        data,
        token,
    }
}
export function getRoldeDetail({roleId, token}){
    return {
        type: GET_DETAIL_ROLE_REQUESTING,
        roleId,
        token,
    }
}

export function updateRoleDetail({ data, token}){
    return {
        type: UPDATE_DETAIL_ROLE_REQUESTING,
        token,
        data,
    }
}