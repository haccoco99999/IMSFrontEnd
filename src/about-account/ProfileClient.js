import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import updateRequest from './action'
import { UPDATE_PROFILE_CLEAN } from './contants'
import './profile-client.css'
import Swal from 'sweetalert2'
import { uploadAvatarImg } from '../manage-account/create/account/action'
import { UPDATE_IMAGE_CLEAN } from '../manage-account/create/account/constants'
import moment from 'moment'
const initValue = {

}

export default function ProfileClient() {
  const dispatch = useDispatch()


  const { infoProfileStore, updateProfileClientStatus, updateImageStatus } = useSelector(state => ({
    updateImageStatus: state.updateImage,
    infoProfileStore: state.client,
    updateProfileClientStatus: state.updateProfileClient
  }))
  let [isEditProfile, setIsEditProfile] = useState(false)
  let [isUpdateProfile, setIsUpdateProfile] = useState(false)
  let [infoProfile, setInfoProfile] = useState(infoProfileStore)
  const [isChangePassword, setIsChangePassword] = useState(false)
  const isValidBirthdate = useState(false)
  function onChangeValueProfile(event) {
    const date = document.getElementById("dateOfBirth");

    if (event.target.name === "dateOfBirth" && moment().diff(moment(event.target.value), "years") >= 15) {
      console.log("valid")
      date.classList.add("is-valid")
      date.classList.remove("is-invalid")
    }
    else if (event.target.name === "dateOfBirth" && moment().diff(moment(event.target.value), "years") < 15) {
      console.log("invalid")
      date.classList.add("is-invalid")
      date.classList.remove("is-valid")

    }
    setInfoProfile({ ...infoProfile, [event.target.name]: event.target.value })
  }
  function cancelUpdate() {
    setInfoProfile(infoProfileStore)
    setIsEditProfile(false);
  }
  function saveUpdate(event) {
    let checkValidDate = false
    const date = document.getElementById("dateOfBirth");
    const form = document.getElementById("valid-form-update-profile");
    if (moment().diff(moment(infoProfile.dateOfBirth), "years") >= 15) {
      checkValidDate = true
    }

    if (!form.checkValidity() || !checkValidDate) {
      form.classList.add("was-validated");
    }
    else {



      Swal.fire({
        title: "Are you sure",
        text: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: " #d33",
        confirmButtonText: "Confirm",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          var dataUpdate = {

            fullname: infoProfile.fullname,
            phoneNumber: infoProfile.phoneNumber,
            address: infoProfile.address,
            dateOfBirth: infoProfile.dateOfBirth,
          };
          dispatch(updateRequest({ token: infoProfileStore.token, dataUpdate: dataUpdate }))
          form.classList.remove("was-validated");
          date.classList.remove("is-invalid")
          date.classList.remove("is-valid")
          setIsEditProfile(false);
        }
      });



    }




  }
  function saveChangePassword(dataPassword) {

    var dataUpdate = {
      oldPassword: dataPassword.oldPassword,
      newPassword: dataPassword.newPassword,
      fullname: infoProfile.fullname,
      phoneNumber: infoProfile.phoneNumber,
      address: infoProfile.address,
      dateOfBirth: infoProfile.dateOfBirth,
    };
    dispatch(updateRequest({ token: infoProfileStore.token, dataUpdate: dataUpdate }))

    setIsChangePassword(false)
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
      dispatch({ type: UPDATE_PROFILE_CLEAN })
    }
    else if (updateProfileClientStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Old Password is not connnect!',

      })
      dispatch({ type: UPDATE_PROFILE_CLEAN })
    }
    if (updateImageStatus.requesting) {
      Swal.fire({
        title: 'Updating Avatar!',
        html: 'Watting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (updateImageStatus.successful) {

      Swal.fire(
        'Update Success!',
        'Click to Close!',
        'success'

      )
      dispatch({ type: UPDATE_IMAGE_CLEAN })
    }
    else if (updateImageStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',

      })
      dispatch({ type: UPDATE_IMAGE_CLEAN })
    }
  }, [updateProfileClientStatus, updateImageStatus])
  function closeChangePasswordModal() {
    setIsChangePassword(!isChangePassword)
  }
  async function changeUploadAvatar(event) {

    Swal.fire({
      title: "Are you sure",
      text: "Do you want to save?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {

        let file = event.target.files[0];
        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", "rmwbm6go");
        let data = {

          userId: infoProfileStore.id,
          profileImageLink: infoProfileStore.profileImageLink

        }
        dispatch(uploadAvatarImg({ token: infoProfileStore.token, data: data, formData: formData, isUpdateUser: true }))
      }
    });



    // const url = "https://api.cloudinary.com/v1_1/ims2021/upload";

    // const formData = new FormData()



    // formData.append("file", file);
    // formData.append("upload_preset", "rmwbm6go");
    // await fetch(url, {
    //   method: "POST",

    //   body: formData,
    // })
    //   .then((response) => {
    //     return response.json();
    //   }).then((json) => {
    //     console.log(json);



    //  });

    // var image = document.getElementById('output');

    // image.src = URL.createObjectURL(file);

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
                  <input id="file" type="file" onChange={changeUploadAvatar} />
                  <img src={infoProfileStore.profileImageLink} id="output" width="200" />
                </div>
                <p

                  onClick={() => setIsChangePassword(!isChangePassword)}
                  className=" text-end text-success btn"><i class="bi bi-pen"></i> Change password</p>
              </div>
              {isChangePassword ? <ChangePasswordCompoent closeChangePasswordModal={closeChangePasswordModal} saveChangePassword={saveChangePassword} /> : ""}
              <form className="needs-validation" id="valid-form-update-profile">
                <div class="form-group form-group-profile-client">
                  <label for="">Email Adress</label>
                  <input type="text" disabled value={infoProfile.email} pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$" required
                    class="form-control " name="" id="" aria-describedby="helpId" placeholder="" />
                  <div class="invalid-feedback">
                    Email is invalid!
                  </div>
                </div>

                <div class="form-group form-group-profile-client">
                  <label for="">Fullname</label>
                  <input type="text" value={infoProfile.fullname} onChange={onChangeValueProfile} required
                    class="form-control" name="fullname" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Please enter a fullname!
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">Address</label>
                  <input type="text" value={infoProfile.address} onChange={onChangeValueProfile} required
                    class="form-control" name="address" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Address is invalid!
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">Phone Number</label>
                  <input type="text" value={infoProfile.phoneNumber} onChange={onChangeValueProfile} required pattern="((09|03|07|08|05|028|024)+([0-9]{8})\b)"
                    class="form-control" name="phoneNumber" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Phone Number is invalid!
                  </div>
                </div>





              </form>
              <div class="form-group form-group-profile-client">
                <label for="">Birthdate</label>

                <input value={moment(infoProfile.dateOfBirth).format("YYYY-MM-DD")} onChange={onChangeValueProfile}
                  class="form-control" type="date" name="dateOfBirth" id="dateOfBirth" placeholder="" disabled={!isEditProfile} />
                <div class="invalid-feedback">

                  Age must be minimum of 15 years!
                </div>
              </div>
              {isEditProfile ? "" : <button type="button" class="btn btn-sm btn-primary" onClick={() => setIsEditProfile(true)}>Edit</button>}
              {isEditProfile ? <button type="button" onClick={() => { cancelUpdate() }} class="btn btn-sm btn-primary btn-danger me-2">Cancel</button> : ""}
              {isEditProfile ? <button type="button" onClick={() => { saveUpdate() }} class="btn btn-sm btn-primary btn-success">Update</button> : ""}
            </div>

          </div>
        </div>



        {/* ################################# */}
      </div>
    </div >
  );
}

export function ChangePasswordCompoent(props) {
  const oldPassword = useRef()
  const confirmPassword = useRef()
  const newPassword = useRef()
  const [isvalidPassword, setIsvalidPassword] = useState({
    isValidNewPassword: null,
    isConfirmPassword: null,
  })
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

      oldPassword.current.classList.add("is-valid")
      oldPassword.current.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isValidNewPassword = false

      oldPassword.current.classList.add("is-invalid")
      oldPassword.current.classList.remove("is-valid")
    }
    if (checkValidPassword(newPassword.current.value)) {

      isvalidPassword.isValidNewPassword = true
      newPassword.current.classList.add("is-valid")
      newPassword.current.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isValidNewPassword = false
      newPassword.current.classList.add("is-invalid")
      newPassword.current.classList.remove("is-valid")
    }


    if (confirmPassword.current.value === newPassword.current.value && confirmPassword.current.value !== "") {
      isvalidPassword.isConfirmPassword = true
      confirmPassword.current.classList.add("is-valid")
      confirmPassword.current.classList.remove("is-invalid")
    }
    else {
      isvalidPassword.isConfirmPassword = false
      confirmPassword.current.classList.add("is-invalid")
      confirmPassword.current.classList.remove("is-valid")
    }

    setIsvalidPassword(isvalidPassword)
  }

  function checkValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  }
  function changePassword() {
    if (isvalidPassword.isConfirmPassword && isvalidPassword.isValidNewPassword) {
      let dataPassword = {
        oldPassword: oldPassword.current.value,
        newPassword: newPassword.current.value
      }
      props.saveChangePassword(dataPassword)
    }
  }
  return (
    <div>
      <div className="modal-backdrop fade show"></div>
      <div
        style={{ display: "block" }}
        class="modal show">

        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title ">Change passsword</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => props.closeChangePasswordModal()} aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="form-signin needs-validation" id="form-valid-change-password">
                <div class="form-group form-group-profile-client">
                  <label for="">Password</label>
                  <input type="password" ref={oldPassword} onChange={onChangePassword}
                    class="form-control form-control-sm" required name="" id="oldPassword" aria-describedby="helpId" placeholder="" />
                  <div class="invalid-feedback">
                    Please enter current password.
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">New Password</label>
                  <input type="password" ref={newPassword} onChange={onChangePassword}
                    class="form-control form-control-sm" required name="" id="newPassword" aria-describedby="helpId" placeholder="" />
                  <div class="invalid-feedback">
                    Please enter new password.
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">Confirm Password</label>
                  <input type="password" ref={confirmPassword} onChange={onChangePassword}
                    class="form-control form-control-sm" required name="" id="confirmPassword" aria-describedby="helpId" placeholder="" />
                  <div class="invalid-feedback">
                    Password not a match.
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={() => props.closeChangePasswordModal()} data-bs-dismiss="modal">Close</button>
              <button type="button" id="btnSubmitChangePassword" onClick={() => changePassword()} class="btn btn-primary">Save changes</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}