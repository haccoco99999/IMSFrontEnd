import React, { useEffect, useRef, useState } from 'react'
import './create-account.css'
import { getUserAccountDetail, updateUserAccountDetail } from './action';
import RoleManagerAction from "../../manager/role-manager/action";
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../../navigation-bar-component/NavigationBar';
import { useLocation, useHistory } from 'react-router-dom';


export default function EditUserAccount() {
  // var cloudinary = require('cloudinary').v2;
  // cloudinary.config({ 
  //   cloud_name: 'sample', 
  //   api_key: '172825112783497', 
  //   api_secret: 'OSGtNv2rDf-BVGGJ19IzLu-DD78',
  //   secure: true
  // });
  // const dataUser = {
  //   email:"tmh1799@gmail.com",
  //   fullName: "Huy Beo",
  //   id:"92e8edac-ad54-4ae6-ae22-0e0c502da611",
  //   phoneNumber:"0231654",
  //   address:"135/4655/2354/46579",
  //   dateOfBirth:""
  // }
 

  let location = useLocation()
  const dispatch = useDispatch()

  function createAccountInfo(event) {

  }
  const confirmPassword = useRef()
  const newPassword = useRef()
  const [isvalidPassword, setIsvalidPassword] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null
  })
  let { listRoles, token,infoDetailAccount } = useSelector((state) => ({
    listRoles: state.getAllRoleReducer.listRoles,
    token: state.client.token,
    infoDetailAccount: state.getUserAccountDetail.infoDetailAccount
  }));
  const [infoAccountState, setInfoAccountState] = useState(
    infoDetailAccount
  )
  function onchangeInputInfoAccount(event) {
    console.log(event.target.name ," ", event.target.value)
    setInfoAccountState(state => ({
      ...state, [event.target.name]: event.target.value
    }))
  }
  console.log()
  useEffect(() => {
    
    dispatch(
      RoleManagerAction({
        currentPage: 0,
        sizePerPage: 0,
        token: token,
      } )
    );
   
    dispatch(
      getUserAccountDetail({ userID: location.state.userID, token: token })
    );
  }, []);

  useEffect(() =>{
    setInfoAccountState(infoDetailAccount)
  },[infoDetailAccount])
  
 function changeUploadAvatar(event){
   console.log("okkk")
   
      var image = document.getElementById('output-avatar');
      console.log(image)
      image.src = URL.createObjectURL(event.target.files[0]);

  }
  function clickUpdate(){
    
 
    const data={
      userId: infoAccountState.userID, 
      email: infoAccountState.email,
      phoneNumber: infoAccountState.phoneNumber,
      address: infoAccountState.address,
      roleId: infoAccountState.roleID,
      dateOfBirth: infoAccountState.dateOfBirth,
      fullname: infoAccountState.fullname
    }
    console.log(data)
     dispatch(updateUserAccountDetail({data: data, token:token}))
  }
  function clickCancel(){
    setInfoAccountState(infoDetailAccount)
  }
  const listButton= [{
    isShow: true,
    title: "Edit",
    action: createAccountInfo,
    style: {
        background: "#4e9ae8"
    }
  },
  {
    isShow: true,
    title: "Cancel",
    action: clickCancel,
    style: {
        background: "#4e9ae8"
    }
  },
  {
    isShow: true,
    title: "Save",
    action: clickUpdate,
    style: {
        background: "#4e9ae8"
    }
  },  ]
  
  function checkValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  }
  function onChangePassword() {
    let isvalidPassword = {
      isValidNewPassword: null,
      isConfirmPassword: null,
    }


    if (checkValidPassword(newPassword.current.value)) {

      isvalidPassword.isValidNewPassword = true

    }
    else {

      if (newPassword.current.value === "") {
        isvalidPassword.isValidNewPassword = null

      }
      else {
        isvalidPassword.isValidNewPassword = false
      }

    }

    if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
      isvalidPassword.isConfirmPassword = true

    }
    else {

      if (confirmPassword.current.value === "") {
        isvalidPassword.isConfirmPassword = null

      }
      else {
        isvalidPassword.isConfirmPassword = false
      }


    }
    setIsvalidPassword(isvalidPassword)
  }

  // console.log(listRoles)
  return (
 
      <div >
        {/* ############################ */}
        {/* <input  type="text" accept="image/*" name="image" id="fileaaa" onchange={changeUploadAvatar} /> */}
      
        {/* <p><input type="file" accept="image/*" name="image" id="filexx" onchange={changeUploadAvatar}/></p>
    <p><label for="filexx" >Upload Image</label></p> */}
    {/* <p><img id="output" width="200" /></p> */}

    <NavigationBar listButton={listButton} />
        <div className="container container-create-account">
         

          <div class="avatar-upload-contain">
            <div style={{width:"150px" , height:"150px"}}>
            <img   id="output-avatar" src="https://i.stack.imgur.com/l60Hf.png" class="img-fluid img-thumbnail " alt="..." />
           </div>
            <input name="image" id="fileaaa" type="file" onChange={changeUploadAvatar} style={{display: "none"}}/>
            <div className="change-avatar-edit"> <label for="fileaaa"><i class='bx bxs-edit-alt'></i>Change Avatar </label></div>
         
          </div>
         
    

          {/* <AdvancedImage cldImg={myImage} /> */}

          <div class="form-group">
            <label for="">Full Name:</label>
            <input type="text" onChange={onchangeInputInfoAccount} name="fullname" value={infoAccountState.fullname}
              class="form-control" aria-describedby="helpId" placeholder="" />
            <div></div>
          </div>
          <div class="form-group">
            <label for="">Email:</label>
            <input type="text" onChange={onchangeInputInfoAccount} name="email" value={infoAccountState.email}
              class="form-control" aria-describedby="helpId" placeholder="" />

          </div>
          <div class="form-group">
            <label for="">Phone Number:</label>
            <input type="text" onChange={onchangeInputInfoAccount} name="phoneNumber" value={infoAccountState.phoneNumber}
              class="form-control" id="" aria-describedby="helpId" placeholder="" />

          </div>
          <div class="form-group">
            <label for="">Address:</label>
            <input type="text" onChange={onchangeInputInfoAccount} name="address" value={infoAccountState.address}
              class="form-control" aria-describedby="helpId" placeholder="" />

          </div>
          <div class="form-group">
            <label for="">Birthday</label>
            <input  type="date" onChange={onchangeInputInfoAccount}  name="dateOfBirth" value={infoAccountState.dateOfBirth.split("T")[0]}
              class="form-control" aria-describedby="helpId" placeholder="" />

          </div>
          <div class="form-group">
            <label for="">Select Role</label>
        
            <select value={infoAccountState.roleID} onChange={onchangeInputInfoAccount}   class="form-control" name="roleID" id="">
              
              {listRoles.map((item, index) => {
                return (<option value={item.id}>{item.name} </option>)
              })}
            </select>
          </div>
          
        </div>

        <h3>Set password </h3>
        <div className="container container-create-account">
        <div class="form-group">
          <label for="">Password:</label>
          <input type="text" ref={newPassword} onChange={onChangePassword}
            class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />

        </div>
        <div class="form-group">
          <label for="">Confirm apssword:</label>
          <input type="text" ref={confirmPassword} onChange={onChangePassword}
            class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />

        </div>


        </div>
      

        {/* ################################# */}
      </div>

  );
}
