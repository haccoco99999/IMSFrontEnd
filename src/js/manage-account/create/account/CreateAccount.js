import React, { useEffect, useRef, useState } from 'react'
import './create-account.css'
import RoleManagerAction from "../../manager/role-manager/action";
import { CreateAccountAction, getUserAccountDetail } from './action';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../../navigation-bar-component/NavigationBar';
import { useLocation } from 'react-router-dom';
export default function CreateAccount() {
 

 
  const [eventPage, setEventPage] = useState({
    isShowEdit: true
  })
  const confirmPassword = useRef()
  const newPassword = useRef()
  const [isvalidPassword, setIsvalidPassword] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null
  })


  const {  token,infoDetailAccountStore } = useSelector((state) => ({
  
    token: state.client.token,
    infoDetailAccountStore: state.getUserAccountDetail.infoDetailAccount
  }));

  const [infoAccountState, setInfoAccountState] = useState({...infoDetailAccountStore })
  // password: "dellDell123*",
  // email: "",
  // roleId: "",
  // fullName: "",
  // phoneNumber: "",
  // address: "",
  // dateOfBirth: ""
  const location = useLocation()
  const[statusUser, setStatusUser] = useState("")
  useEffect(() =>{
    if(location.state.status === "EDITUSER") {
      setStatusUser(location.state.status )
      dispatch(
       
        getUserAccountDetail({ userID: location.state.userId, token: token })
      );
    }
    else if(location.state.status === "CREATEUSER"){
      setStatusUser(location.state.status )
    }
    else{

    }
  },[])

  useEffect(() =>{
    setInfoAccountState(infoDetailAccountStore)
  },[infoDetailAccountStore])
  

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
  // let { listRoles, token } = useSelector((state) => ({
  //   listRoles: state.getAllRoleReducer.listRoles,
  //   token: state.client.token,
  // }));
  const dispatch = useDispatch()
  function onchangeInputInfoAccount(event) {

    setInfoAccountState(state => ({
      ...state, [event.target.name]: event.target.value
    }))
  }



  function createAccountInfo(event) {

    if (isvalidPassword.isValidNewPassword && isvalidPassword.isConfirmPassword) {
      const data = { ...infoAccountState, password: newPassword.current.value }
      dispatch(CreateAccountAction({ data: data, token: token }));
      // history.go(-1)
    }
    else {
      alert("ko hop le")
    }
  }


  function changeUploadAvatar(e) {
    console.log("okkk")

    var image = document.getElementById('output-avatar');
    console.log(image)
    image.src = URL.createObjectURL(event.target.files[0]);

  }
  function clickCancel(){
    setInfoAccountState(infoDetailAccountStore)
    setClickEdit();
  }
  function clickUpdate(){
    
    if(isvalidPassword.isValidNewPassword !== false && isvalidPassword.isConfirmPassword !== false ){
    let data={
      userId: infoAccountState.userID, 
      email: infoAccountState.email,
      phoneNumber: infoAccountState.phoneNumber,
      address: infoAccountState.address,
      roleId: infoAccountState.roleID,
      dateOfBirth: infoAccountState.dateOfBirth,
      fullname: infoAccountState.fullname
    }
  //neu data hop le //co 3 trang thai null(ko dien vao gi het) true("thi add vao update product") false("ko cho update")
    if(isvalidPassword.isValidNewPassword && isvalidPassword.isConfirmPassword){
      data = {...data,password: newPassword.current.value }
    }

    //  dispatch(updateUserAccountDetail({data: data, token:token}))
     setClickEdit();
    }
    else{alert("nhap sai mat khau")}
    
  }

  function setClickEdit(){
    setEventPage((state) =>({
      ...state, isShowEdit: ! state.isShowEdit
    }))
  }
  function setListButton(status){
    if(status ==="CREATEUSER"){
     return [{
        isShow: true,
        title: "Create User",
        action: () =>createAccountInfo,
        style: {
          background: "#4e9ae8"
        }
      },
      ]
    }
    else if(status ==="EDITUSER"){
      return [
        {
          isShow: eventPage.isShowEdit,
          title: "Edit",
          action: setClickEdit,
          style: {
              background: "#4e9ae8"
          }
        },
        {
          isShow: !eventPage.isShowEdit,
          title: "Cancel",
          action: clickCancel,
          style: {
              background: "#4e9ae8"
          }
        },
        {
          isShow: !eventPage.isShowEdit,
          title: "Save",
          action: clickUpdate,
          style: {
              background: "#4e9ae8"
          }
        },  ]
    }
    return []
  }
  const listButton = setListButton(statusUser)
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

      <NavigationBar vigationBar listButton={listButton} actionGoBack={ClickGoBack} />

      <div style={{ height: 600 }} className="card mt-2">
        <div className="row h-100">
          <div className="col-md-3   d-flex justify-content-center mt-3">
            <div class="card w-75 border-0" style={{ width: "18rem;" }}>
              <img id="output-avatar" class="card-img-top rounded-pill" width="90px" height="300px" src="https://i.stack.imgur.com/l60Hf.png" alt="Card image cap" />


            



              <div class="card-body">
                <span class="badge badge-success">Success</span>
                <input name="image" id="fileaaa" type="file" onChange={changeUploadAvatar} style={{ display: "none" }} />
                <div className="btn btn-primary"> <label for="fileaaa"><i class='bx bxs-edit-alt'></i>Change Avatar </label></div>
              </div>
            </div>
          </div>
          <div className="col-md-5 border-start border-end pt-5">
            <h3>Profile Detail</h3>


            <div class="form-group">
              <label for="">Full Name:</label>
              <input type="text" onChange={onchangeInputInfoAccount} name="fullname" value={infoAccountState.fullname}
                class="form-control" aria-describedby="helpId" placeholder="" />
              <div></div>
            </div>
            <div class="form-group">
              <label for="">Email:</label>
              <input type="text" onChange={onchangeInputInfoAccount} name="email" value={infoAccountState.email} disabled={status!=="CREATEUSER"}
                class="form-control" aria-describedby="helpId" placeholder="" />

            </div>
            <div class="form-group">
              <label for="">Phone Number:</label>
              <input type="text" onChange={onchangeInputInfoAccount} name="phoneNumber" value={infoAccountState.phoneNumber}
                class="form-control" id="" aria-describedby="helpId" placeholder="" />

            </div>
            <div class="form-group">
              <label for="">Address:</label>
              <input type="text" onChange={onchangeInputInfoAccount} name="address"   value={infoAccountState.address}
                class="form-control" aria-describedby="helpId" placeholder="" />

            </div>
            <div class="form-group">
              <label for="">Birthday</label>
              <input type="date" onChange={onchangeInputInfoAccount} name="dateOfBirth"  value={infoAccountState.dateOfBirth.split("T")[0]}
                class="form-control" aria-describedby="helpId" placeholder="" />

            </div>
            <div class="form-group">
              <label for="">Select Role</label>
              <select onChange={onchangeInputInfoAccount} class="form-control" name="roleId" id="">
                <option value="" disabled selected>  -- No Selected --  </option>
                <option value="Manager" >Manager</option>
                <option value="Accountant" >Accountant</option>
                <option value="StockKeeper" >StockKeeper</option>
                <option value="Saleman" >Saleman</option>

              </select>
            </div>

          </div>
          <div className="col-md-4 pt-5">
            <h3>Set Password</h3>

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
        </div>

      </div>








      {/* <div className="container container-create-account">
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
 */}


      {/* 
      <h3>Set password </h3>
      <div className="container container-create-account">
        


      </div> */}


      {/* ################################# */}
    </div>

  );
}
