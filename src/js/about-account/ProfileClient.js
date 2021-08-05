import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import updateRequest from './action'
import { UPDATE_PROFILE_CLEAN } from './contants'
import './profile-client.css'
import Swal from 'sweetalert2'

const initValue = {

}

export default function ProfileClient() {
  const dispatch = useDispatch()
  const oldPassword = useRef()
  const confirmPassword = useRef()
  const newPassword = useRef()
  console.log(confirmPassword)
  const [isvalidPassword, setIsvalidPassword] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null
  })
  let { infoProfileStore, updateProfileClientStatus } = useSelector(state => ({ infoProfileStore: state.client, updateProfileClientStatus: state.updateProfileClient }))
  let [isEditProfile, setIsEditProfile] = useState(false)
  let [isUpdateProfile, setIsUpdateProfile] = useState(false)
  let [infoProfile, setInfoProfile] = useState(infoProfileStore)


  function onChangeValueProfile(event) {
    setInfoProfile({ ...infoProfile, [event.target.name]: event.target.value })
  }
  function cancelUpdate() {
    setInfoProfile(infoProfileStore)
  }
  function saveUpdate(event) {
    var dataUpdate = {
     
      fullname: infoProfile.fullname,
      phoneNumber: infoProfile.phoneNumber,
      address: infoProfile.address,
      dateOfBirth: infoProfile.dateOfBirth,
    };
    dispatch(updateRequest({ token: infoProfileStore.token, dataUpdate: dataUpdate }))


  }
  function changePassword() {
    if (isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword) {
      var dataUpdate = {
        oldPassword: oldPassword.current.value,
        newPassword: newPassword.current.value,
        fullname: infoProfile.fullname,
        phoneNumber: infoProfile.phoneNumber,
        address: infoProfile.address,
        dateOfBirth: infoProfile.dateOfBirth,
      };
      dispatch(updateRequest({ token: infoProfileStore.token, dataUpdate: dataUpdate }))
      // confirmPassword.current.value = undefined
      // newPassword.current.value = undefined
      // oldPassword.current.value = undefined
    }
  }

  useEffect(() => {
    if (updateProfileClientStatus.requesting) {
      Swal.fire({
        title: 'Updating!',
        html: 'Watting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (updateProfileClientStatus.successful) {

      Swal.fire(
        'Update Success!',
        'Click to Close!',
        'success'

      )
      dispatch({type: UPDATE_PROFILE_CLEAN})
    }
    else if (updateProfileClientStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      
      })
      dispatch({type: UPDATE_PROFILE_CLEAN})
    }
  }, [updateProfileClientStatus])

  function onChangePassword() {
    let isvalidPassword = {
      isValidNewPassword: null,
      isConfirmPassword: null,
    }

    const confirmPasswordHTML = document.getElementById("confirmPassword")
    const newPasswordHTML = document.getElementById("newPassword")
    const oldPasswordHTML = document.getElementById("oldPassword")


    if (checkValidPassword(oldPassword.current.value)) {

      isvalidPassword.isValidNewPassword = true

      oldPasswordHTML.classList.add("is-valid")
      oldPasswordHTML.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isValidNewPassword = false

      oldPasswordHTML.classList.add("is-invalid")
      oldPasswordHTML.classList.remove("is-valid")
    }
    if (checkValidPassword(newPassword.current.value)) {

      isvalidPassword.isValidNewPassword = true
      newPasswordHTML.classList.add("is-valid")
      newPasswordHTML.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isValidNewPassword = false
      newPasswordHTML.classList.add("is-invalid")
      newPasswordHTML.classList.remove("is-valid")
    }


    if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
      isvalidPassword.isConfirmPassword = true
      confirmPasswordHTML.classList.add("is-valid")
      confirmPasswordHTML.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isConfirmPassword = false
      confirmPasswordHTML.classList.add("is-invalid")
      confirmPasswordHTML.classList.remove("is-valid")
    }

    setIsvalidPassword(isvalidPassword)
  }
  function checkValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  }
  return (
    <div className="home_content">
      <div className="text">
        {/* ############################ */}
        <div className="container container-profile-client">
          <h4 className="title-profile-client">EDIT PROFILE</h4>
          <div class="row row-profile-client">


            <div className="col-sm-7 edit-profile-client">
              <div className="col-12 title-profile-client">
                <h5>Edit Profile</h5>
              </div>
              <div>
                <div class="profile-pic">
                  <label class="-label" for="file">
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onchange="loadFile(event)" />
                  <img src="https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg" id="output" width="200" />
                </div>
                <p
                  data-bs-target="#ChangePasswordModal"
                  data-bs-toggle="modal"

                  className=" text-end text-success btn"><i class="bi bi-pen"></i> Change password</p>
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Email Adress</label>
                <input type="text" disabled value={infoProfile.email}
                  class="form-control " name="" id="" aria-describedby="helpId" placeholder="" />
              </div>

              <div class="form-group form-group-profile-client">
                <label for="">Fullname</label>
                <input type="text" value={infoProfile.fullname} onChange={onChangeValueProfile}
                  class="form-control" name="fullname" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Address</label>
                <input type="text" value={infoProfile.address} onChange={onChangeValueProfile}
                  class="form-control" name="address" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Phone Number</label>
                <input type="text" value={infoProfile.phoneNumber} onChange={onChangeValueProfile}
                  class="form-control" name="phoneNumber" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Birthdate</label>
                <input type="text" value={infoProfile.dateOfBirth} onChange={onChangeValueProfile}
                  class="form-control" type="date" name="dateOfBirth" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
              </div>
              {isEditProfile ? "" : <button type="button" class="btn btn-primary" onClick={() => setIsEditProfile(true)}>Edit Profile</button>}
              {isEditProfile ? <button type="button" onClick={() => { setIsEditProfile(false); cancelUpdate() }} class="btn btn-primary">Cancel</button> : ""}
              {isEditProfile ? <button type="button" onClick={() => { setIsEditProfile(false); saveUpdate() }} class="btn btn-primary">Update Profile</button> : ""}
            </div>
          </div>
        </div>
    
        <div
          tabIndex="-1"
          id="ChangePasswordModal"
          data-bs-keyboard="false"
          data-bs-backdrop="static" class="modal ">

          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title ">Change passsword</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="form-signin needs-validation" id="form-valid-change-password">
                  <div class="form-group form-group-profile-client">
                    <label for="">Password</label>
                    <input type="text" ref={oldPassword} onChange={onChangePassword}
                      class="form-control form-control-sm" required name="" id="oldPassword" aria-describedby="helpId" placeholder="" />
                    <div class="invalid-feedback">
                      Please enter current password.
                    </div>
                  </div>
                  <div class="form-group form-group-profile-client">
                    <label for="">New Password</label>
                    <input type="text" ref={newPassword} onChange={onChangePassword}
                      class="form-control form-control-sm" required name="" id="newPassword" aria-describedby="helpId" placeholder="" />
                    <div class="invalid-feedback">
                      Please enter new password.
                    </div>
                  </div>
                  <div class="form-group form-group-profile-client">
                    <label for="">Confirm Password</label>
                    <input type="text" ref={confirmPassword} onChange={onChangePassword}
                      class="form-control form-control-sm" required name="" id="confirmPassword" aria-describedby="helpId" placeholder="" />
                    <div class="invalid-feedback">
                      Password not a match.
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="btnSubmitChangePassword" onClick={(event) => changePassword(event)} class="btn btn-primary">Save changes</button>
              </div>

            </div>
          </div>
        </div>

        {/* ################################# */}
      </div>
    </div >
  );
}
