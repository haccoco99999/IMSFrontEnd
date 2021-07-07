

const updateRequest = function updateRequest({token, dataUpdate}){
    
    return{
        
        type: "UPDATE_PROFILE_REQUESTING",
        //ppppppppppppppppppayload
        token,
        dataUpdate,
       
    }
}
export default updateRequest  