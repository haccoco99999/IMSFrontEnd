import React, { useEffect, useRef, useState } from 'react'
import './create-account.css'
import RoleManagerAction from "../../manager/role-manager/action";
import { CreateAccountAction } from './action';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../../navigation-bar-component/NavigationBar';
export default function CreateAccount() {
  const [infoAccountState, setInfoAccountState] = useState({

    password: "dellDell123*",
    email: "",
    roleId: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: ""
  })

  const confirmPassword = useRef()
  const newPassword = useRef()
  const [isvalidPassword, setIsvalidPassword] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null
  })
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

    if (confirmPassword.current.value === newPassword.current.value) {
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
  let { listRoles, token } = useSelector((state) => ({
    listRoles: state.getAllRoleReducer.listRoles,
    token: state.client.token,
  }));
  const dispatch = useDispatch()
  function onchangeInputInfoAccount(event) {
    
    setInfoAccountState(state => ({
      ...state, [event.target.name]: event.target.value
    }))
  }



  function createAccountInfo(event) {
    if(isvalidPassword.isValidNewPassword && isvalidPassword.isConfirmPassword){
    dispatch(CreateAccountAction({ data: infoAccountState, token: token }));
    }
    else{
      alert("ko hop le")
    }
  }
  useEffect(() => {
    dispatch(
      RoleManagerAction({
        currentPage: 0,
        sizePerPage: 0,
        token: token,
      })
    );
  }, []);

  function changeUploadAvatar(e) {
    console.log("okkk")

    var image = document.getElementById('output-avatar');
    console.log(image)
    image.src = URL.createObjectURL(event.target.files[0]);

  }
  const listButton = [{
    isShow: true,
    title: "Create User",
    action: createAccountInfo,
    style: {
      background: "#4e9ae8"
    }
  },
  ]
  // console.log(listRoles)
  function ClickGoBack() {
    history.go(-1)
  }
  return (
    <div>
      {/* ############################ */}
      {/* <input  type="text" accept="image/*" name="image" id="fileaaa" onchange={changeUploadAvatar} /> */}

      {/* <p><input type="file" accept="image/*" name="image" id="filexx" onchange={changeUploadAvatar}/></p>
    <p><label for="filexx" >Upload Image</label></p> */}
      {/* <p><img id="output" width="200" /></p> */}

      <NavigationBar vigationBar listButton={listButton} actionGoBack={ClickGoBack}/>
      <div className="container container-create-account">
        <div class="avatar-upload-contain">
          <img id="output-avatar" src="https://i.stack.imgur.com/l60Hf.png" class="img-fluid img-thumbnail " alt="..." />
          <input name="image" id="fileaaa" type="file" onChange={changeUploadAvatar} style={{ display: "none" }} />
          <div className="change-avatar-edit"> <label for="fileaaa"><i class='bx bxs-edit-alt'></i>Change Avatar </label></div>

        </div>




        <div class="form-group">
          <label for="">Full Name:</label>
          <input type="text" onChange={onchangeInputInfoAccount} name="fullName"
            class="form-control" aria-describedby="helpId" placeholder="" />
          <div></div>
        </div>
        <div class="form-group">
          <label for="">Email:</label>
          <input type="text" onChange={onchangeInputInfoAccount} name="email"
            class="form-control" aria-describedby="helpId" placeholder="" />

        </div>
        <div class="form-group">
          <label for="">Phone Number:</label>
          <input type="text" onChange={onchangeInputInfoAccount} name="phoneNumber"
            class="form-control" id="" aria-describedby="helpId" placeholder="" />

        </div>
        <div class="form-group">
          <label for="">Address:</label>
          <input type="text" onChange={onchangeInputInfoAccount} name="address"
            class="form-control" aria-describedby="helpId" placeholder="" />

        </div>
        <div class="form-group">
          <label for="">Birthday</label>
          <input type="date" onChange={onchangeInputInfoAccount} name="dateOfBirth"
            class="form-control" aria-describedby="helpId" placeholder="" />

        </div>
        <div class="form-group">
          <label for="">Select Role</label>
          <select onChange={onchangeInputInfoAccount} class="form-control" name="roleId" id="">
            <option value="" disabled selected>  -- No Selected --  </option>
            {listRoles.map((item, index) => {
              return (<option key={index} value={item.id}>{item.name}</option>)
            })}
          </select>
        </div>
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
{/* 
      <h3>Set password </h3>
      <div className="container container-create-account">
        


      </div> */}


      {/* ################################# */}
    </div>

  );
}
