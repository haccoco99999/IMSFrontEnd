import React, { useEffect, useRef, useState } from 'react'
import './create-account.css'
import RoleManagerAction from "../../manager/role-manager/action";
import { CreateAccountAction, getUserAccountDetail, setActiveAccountAction, updateUserAccountDetail, uploadAvatarImg } from './action';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../../components/navbar/navbar-component';
import { useHistory, useLocation } from 'react-router-dom';
import { CREATE_ACC_CLEAN, GET_DETAIL_ACC_CLEAN, SET_ACTIVE_ACC_CLEAN, UPDATE_DETAIL_ACC_CLEAN, UPDATE_IMAGE_CLEAN } from './constants';
import Swal from 'sweetalert2'
import { ChangePasswordAccountManagerCompoent, ChangePasswordCompoent } from '../../../components/change-password/ChangePasswordComponent';
import { TableLoading } from '../../../components/loading/loading-component';
import moment from 'moment';
export default function CreateAccount() {


  const history = useHistory()
  const [eventPage, setEventPage] = useState({
    isShowEdit: true,
    isShowChangePassword: false,

  })
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false)
  const confirmPassword = useRef("")
  const newPassword = useRef("")
  const [isvalidPassword, setIsvalidPassword,] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null
  })
  const [base64Img, setBase64Img] = useState("")

  const { token, infoDetailAccountStore, createUserAccountStatus,
    setActiveAccountStatus, updateAccountDetailStatus,
    updateImageStatus, getUserAccountDetailStore
  } = useSelector((state) => ({

    token: state.client.token,
    infoDetailAccountStore: state.getUserAccountDetail.infoDetailAccount,
    getUserAccountDetailStore: state.getUserAccountDetail,
    createUserAccountStatus: state.createUserAccount,
    setActiveAccountStatus: state.setActiveAccount,
    updateAccountDetailStatus: state.updateAccountDetail,
    updateImageStatus: state.updateImage

  }));

  const [infoAccountState, setInfoAccountState] = useState({ ...infoDetailAccountStore })
  // password: "dellDell123*",
  // email: "",
  // roleId: "",
  // fullName: "",
  // phoneNumber: "",
  // address: "",
  // dateOfBirth: ""
  const location = useLocation()
  const [statusUser, setStatusUser] = useState("")
  useEffect(() => {
    if (location.state.status === "EDITUSER") {

      dispatch(

        getUserAccountDetail({ userID: location.state.userId, token: token })
      );

    }

    else {

    }
    return () => {
      dispatch({ type: GET_DETAIL_ACC_CLEAN })
    }
  }, [])

  useEffect(() => {
    setInfoAccountState(infoDetailAccountStore)
    if (infoDetailAccountStore.isActive !== undefined) {
      setEventPage(state => ({
        ...state, isShowEdit: true, isShowChangePassword: false
      }))
      setStatusUser("EDITUSER")
    }
    else {
      setEventPage(state => ({
        ...state, isShowEdit: false, isShowChangePassword: true
      }))
      setStatusUser("CREATEUSER")
    }
  }, [infoDetailAccountStore])

  useEffect(() => {
    if (createUserAccountStatus.requesting) {
      Swal.fire({
        title: 'Progressing',
        html: 'Waiting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (createUserAccountStatus.successful) {

      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      })
      dispatch({ type: "EDIT_PRICE_QUOTE_RESET" })
      dispatch({ type: CREATE_ACC_CLEAN })
    }
    else if (createUserAccountStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',

      })
      dispatch({ type: CREATE_ACC_CLEAN })
    }
    if (setActiveAccountStatus.requesting) {
      Swal.fire({
        title: 'Progressing',
        html: 'Waiting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (setActiveAccountStatus.successful) {

      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      })
      dispatch({ type: "EDIT_PRICE_QUOTE_RESET" })
      dispatch({ type: SET_ACTIVE_ACC_CLEAN })
    }
    else if (setActiveAccountStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong !',

      })
      dispatch({ type: SET_ACTIVE_ACC_CLEAN })
    }
    if (updateAccountDetailStatus.requesting) {
      Swal.fire({
        title: 'Progressing!',
        html: 'Waiting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (updateAccountDetailStatus.successful) {

      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      })
      dispatch({ type: "EDIT_PRICE_QUOTE_RESET" })
      dispatch({ type: UPDATE_DETAIL_ACC_CLEAN })
    }
    else if (updateAccountDetailStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong !',

      })
      dispatch({ type: UPDATE_DETAIL_ACC_CLEAN })
    }
    if (updateImageStatus.requesting) {
      Swal.fire({
        title: 'Progressing',
        html: 'Waiting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (updateImageStatus.successful) {

      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      })
      dispatch({ type: UPDATE_IMAGE_CLEAN })
    }
    else if (updateImageStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',

      })
      dispatch({ type: UPDATE_IMAGE_CLEAN })
    }



  }, [createUserAccountStatus, setActiveAccountStatus, updateAccountDetailStatus, updateImageStatus])

  function setIsShowChangePassword() {
    setEventPage((state) => ({
      ...state, isShowChangePassword: !state.isShowChangePassword
    }))
  }
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
      newPassword.current.classList.add("is-valid")
      newPassword.current.classList.remove("is-invalid")
    }
    else {


      isvalidPassword.isValidNewPassword = false
      newPassword.current.classList.remove("is-valid")
      newPassword.current.classList.add("is-invalid")


    }

    if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
      isvalidPassword.isConfirmPassword = true
      confirmPassword.current.classList.add("is-valid")
      confirmPassword.current.classList.remove("is-invalid")
    }
    else {


      isvalidPassword.isConfirmPassword = false
      confirmPassword.current.classList.remove("is-valid")
      confirmPassword.current.classList.add("is-invalid")


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
    if(statusUser ==="EDITUSER"){
      clickUpdate()
    }
  }



  function createAccountInfo() {



    const form = document.getElementById("checkValidProfile");

    if (!form.checkValidity() || base64Img === "" || !isvalidPassword.isValidNewPassword || !isvalidPassword.isConfirmPassword) {
      form.classList.add("was-validated");
      if (!isvalidPassword.isValidNewPassword || !isvalidPassword.isConfirmPassword) {
        newPassword.current.value = ""
        confirmPassword.current.value = ""
        newPassword.current.classList.add("is-invalid")
        confirmPassword.current.classList.add("is-invalid")
      }
      if (base64Img === "") {

      }

    }

    else {
      if (isvalidPassword.isValidNewPassword && isvalidPassword.isConfirmPassword) {
        const formData = new FormData()
        formData.append("file", base64Img);
        formData.append("upload_preset", "rmwbm6go");
        const data = {

          email: infoAccountState.email,
          roleId: infoAccountState.roleID,
          fullName: infoAccountState.fullname,
          phoneNumber: infoAccountState.phoneNumber,
          address: infoAccountState.address,
          dateOfBirth: infoAccountState.dateOfBirth,
          password: newPassword.current.value,
          profileImageLink: "",
        }
        console.log(data)
        dispatch(CreateAccountAction({ data: data, token: token, formData: formData }));

        form.classList.remove("was-validated");
        // const url = "https://api.cloudinary.com/v1_1/ims2021/upload";




        // fetch(url, {
        //   method: "POST",

        //   body: formData,
        // })
        //   .then((response) => {
        //     return response.json();
        //   }).then((json) => {
        //     console.log(json);



        //   });

        // history.go(-1)
      }




    }

  }


  async function changeUploadAvatar(event) {
    let file = event.target.files[0];



    if (statusUser === "CREATEUSER") {
      setBase64Img(file)
      var image = document.getElementById('output-avatar');

      image.src = URL.createObjectURL(file);
    }
    else {
      const formData = new FormData()
      formData.append("file", file);
      formData.append("upload_preset", "rmwbm6go");
      let data = {

        userId: infoDetailAccountStore.userID,
        profileImageLink: infoDetailAccountStore.profileImageLink

      }
      dispatch(uploadAvatarImg({ token: token, data: data, formData: formData, isUpdateUser: false }))

    }



  }
  function clickCancel() {
    newPassword.current.value = ""
    confirmPassword.current.value = ""
    newPassword.current.classList.remove("is-invalid", "is-valid")
    confirmPassword.current.classList.remove("is-invalid", "is-valid")
    setInfoAccountState(infoDetailAccountStore)
    setClickEdit();
  }
  function clickUpdate() {
    const form = document.getElementById("checkValidProfile");
    if (!form.checkValidity()) {
      form.classList.add("was-validated");

    }
    else {
      let data = {
        userId: infoAccountState.userID,
        email: infoAccountState.email,
        phoneNumber: infoAccountState.phoneNumber,
        address: infoAccountState.address,
        roleId: infoAccountState.roleID,
        dateOfBirth: infoAccountState.dateOfBirth,
        fullname: infoAccountState.fullname
      }

      dispatch(updateUserAccountDetail({ data: data, token: token }))
      form.classList.remove("was-validated");
      // setClickEdit();
    }



  }

  function clickSetActiveAccount() {

    const data = {
      userId: infoDetailAccountStore.userID,
      isDeactivated: !infoDetailAccountStore.isActive
    }
    dispatch(setActiveAccountAction({ data: data, token: token }))
  }
  function setClickEdit() {
    setEventPage((state) => ({
      ...state, isShowEdit: !state.isShowEdit
    }))
  }


  const listButton = []
  // console.log(listRoles)
  function ClickGoBack() {
    history.replace("/homepage/manage-account")
  }
  function closeChangePasswordModal() {
    setIsShowPasswordModal(!isShowPasswordModal)
  }
  function saveChangePassword(dataPassword) {
    console.log(dataPassword)
    let data = {
      userId: infoAccountState.userID,
      email: infoAccountState.email,
      phoneNumber: infoAccountState.phoneNumber,
      address: infoAccountState.address,
      roleId: infoAccountState.roleID,
      dateOfBirth: infoAccountState.dateOfBirth,
      fullname: infoAccountState.fullname,
      password: dataPassword.newPassword,
    }
    dispatch(updateUserAccountDetail({ data: data, token: token }))

    closeChangePasswordModal()
  }
  return (
    <div>
      {/* ############################ */}
      {/* <input  type="text" accept="image/*" name="image" id="fileaaa" onchange={changeUploadAvatar} /> */}

      {/* <p><input type="file" accept="image/*" name="image" id="filexx" onchange={changeUploadAvatar}/></p>
    <p><label for="filexx" >Upload Image</label></p> */}
      {/* <p><img id="output" width="200" /></p> */}

      <NavigationBar
        home={"Manage User"}
        listButton={[]}
        currentPage={"User Detail"}
        actionGoBack={ClickGoBack} />




      <div className="card mt-2">
        <div class=" mt-3" >

          <div class="row g-0">
            <div class="pe-3 pt-3 col-md-4 d-flex align-items-end flex-column  ">
              <div>


                <div class="profile-pic">
                  <label class="-label" for="file">
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onChange={changeUploadAvatar} />
                  <img id="output-avatar" width="200" src={infoDetailAccountStore.profileImageLink !== "" ? infoDetailAccountStore.profileImageLink : "https://image.flaticon.com/icons/png/512/3135/3135715.png"} />
                </div>
                {statusUser === "CREATEUSER" ? base64Img === "" ? <p class="text-danger text-center">Set your avatar(*)</p> : <p class="text-success text-center">Avatar is valid</p> : ""}

                <p className="text-center">{infoAccountState.isActive === undefined ? "" : infoAccountState.isActive ?
                  <span onClick={() => clickSetActiveAccount()} class="btn pe-auto text-center badge bg-success"> <i class="bi bi-pen"></i> Active</span>
                  : <span onClick={() => clickSetActiveAccount()} class="btn pe-auto   badge bg-danger"> <i class="bi bi-pen"></i> In Active</span>}</p>

              </div>



            </div>

            <div class="col-md-8">

              <div class="card-body">

                <form novalidate id="checkValidProfile" className="needs-validation">

                  <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-10">
                      <input placeholder="test@example.com" type="text" onChange={onchangeInputInfoAccount} required name="email" value={infoAccountState.email} disabled={statusUser !== "CREATEUSER"}
                        class="form-control" aria-describedby="helpId" placeholder="test@example.com" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" />
                      <div class="invalid-feedback">
                        Email is  invalid!
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Fullname:</label>
                    <div class="col-sm-10">
                      <input type="text" onChange={onchangeInputInfoAccount} required disabled={eventPage.isShowEdit} name="fullname" value={infoAccountState.fullname}
                        class="form-control" aria-describedby="helpId" placeholder="Fullname" />
                      <div class="invalid-feedback">
                        Please enter a fullname!
                      </div>

                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Phone Number:</label>
                    <div class="col-sm-10">
                      <input type="text" onChange={onchangeInputInfoAccount} required disabled={eventPage.isShowEdit} name="phoneNumber" value={infoAccountState.phoneNumber}
                        class="form-control" id="" aria-describedby="helpId" placeholder="Your phone" pattern="((09|03|07|08|05|028|024)+([0-9]{8})\b)" />
                      <div class="invalid-feedback">
                        Phone number is invalid!
                      </div>

                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Address:</label>
                    <div class="col-sm-10">
                      <input type="text" onChange={onchangeInputInfoAccount} required disabled={eventPage.isShowEdit} name="address" value={infoAccountState.address}
                        class="form-control" aria-describedby="helpId" placeholder="etc." />
                      <div class="invalid-feedback">
                        Please enter a address!

                      </div>

                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Birthdate:</label>
                    <div class="col-sm-10">
                      <input type="date" onChange={onchangeInputInfoAccount} required disabled={eventPage.isShowEdit} name="dateOfBirth" value={moment(infoAccountState.dateOfBirth).format("YYYY-MM-DD")}
                        class="form-control" aria-describedby="helpId" />
                      <div class="invalid-feedback">
                        Please set a birthdate!
                      </div>

                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Select Role:</label>
                    <div class="col-sm-10">
                      <select onChange={onchangeInputInfoAccount} required  value={infoAccountState.roleID} class="form-control" name="roleID" id="">
                        <option value="" disabled selected>  -- No Selected --  </option>
                        <option value="IMS_MN" >Manager</option>
                        <option value="IMS_AC" >Accountant</option>
                        <option value="IMS_SK" >StockKeeper</option>
                        <option value="IMS_SM" >Saleman</option>

                      </select>
                      <div class="invalid-feedback">
                        Please select role!
                      </div>
                    </div>
                  </div>
                </form>
                {statusUser === "CREATEUSER" ? <form id="checkValidPassword" className="needs-validation">
                  <div className="form-text text-success" data-bs-toggle="collapse" data-bs-target="#collapseChangePassword" >
                    <p class="text-danger">Set password(*)</p>
                  </div>
                  <div class={statusUser === "CREATEUSER" ? " collapse show" : " collapse "} id="collapseChangePassword" >
                    <div class="mb-3 row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
                      <div class="col-sm-10">
                        <input type="password" required ref={newPassword} onChange={onChangePassword} disabled={eventPage.isShowEdit}
                          class="form-control" name="" id="newPassword" aria-describedby="helpId" placeholder="New passsowrd" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" />
                        <div class="invalid-feedback">
                          Password is invalid!
                        </div>
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Confirm Password:</label>
                      <div class="col-sm-10">
                        <input type="password" ref={confirmPassword} onChange={onChangePassword} required disabled={eventPage.isShowEdit}
                          class="form-control" name="" id="confirmPassword" aria-describedby="helpId" placeholder="Confirm password" />
                        <div class="invalid-feedback">
                          Confirm password not match!
                        </div>
                      </div>
                    </div>


                  </div>

                </form> : ""
                  // <div><p class="text-success btn dropdown-toggle" onClick={() => closeChangePasswordModal()} > <i class="bi bi-pen"></i> Change password</p>
                  //   {isShowPasswordModal ? <ChangePasswordAccountManagerCompoent closeChangePasswordModal={closeChangePasswordModal} saveChangePassword={saveChangePassword} />
                  //     : ""}

                  // </div>



                }



                {/* {statusUser === "EDITUSER" ? infoAccountState.isActive ?
                  <div>
                    {eventPage.isShowEdit ? <button onClick={() => setClickEdit()} type="button" class="btn btn-primary">EDIT</button> :

                      <div>
                        <button type="button" onClick={() => clickCancel()} class="btn btn-primary">CANCEL</button>
                        <button type="button" onClick={() => clickUpdate()} class="btn btn-primary">SAVE</button>
                      </div>

                    }

                  </div> : <p className="text-danger">You must unblock account </p> : <button type="button" onClick={() => createAccountInfo()} class="btn btn-primary">Create User</button>
                  } */}
        
                
                  

              </div>
            </div>
          </div>
        </div>



      </div>









      {/* ################################# */}
    </div>

  );
}
