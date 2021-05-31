

const updateRequest = function updateRequest({token, dataUpdate}){
    
    return{
        type: "UPDATE_PROFILE_REQUESTING",
        token,
        dataUpdate,
       
    }
}
export default updateRequest  