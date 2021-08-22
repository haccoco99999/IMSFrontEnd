import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCompany } from './action'
import { UPDATE_COMPANY_CLEAN, UPDATE_PROFILE_CLEAN } from './contants'
import './companyInfo.css'
import Swal from 'sweetalert2'
import { uploadAvatarImg } from '../manage-account/create/account/action'
import { UPDATE_IMAGE_CLEAN } from '../manage-account/create/account/constants'
import moment from 'moment'
const initValue = {

}

export default function CompanyInfo() {
  const dispatch = useDispatch()


  const { companyInfo, token, companyInfoStatus } = useSelector(state => ({
    companyInfo: state.client.companyInfo,
    token: state.client.token,
    companyInfoStatus: state.updateCompany
  }))
  let [isEditProfile, setIsEditProfile] = useState(false)
  // let [isUpdateProfile, setIsUpdateProfile] = useState(false)
  let [companyInfoState, setCompanyInfoState] = useState(companyInfo)
  // const [isChangePassword, setIsChangePassword] = useState(false)
  useEffect(() => {
    setCompanyInfoState(
      companyInfo
    )
  }, [companyInfo])
  function onChangeCompanyInfo(event) {
    setCompanyInfoState(
      (state) => ({
        ...state, [event.target.name]: event.target.value
      })
    )
  }
  function cancelUpdate() {
    setCompanyInfoState(
      companyInfo
    )
    setIsEditProfile(false);
  }
  function saveUpdate(event) {


    const form = document.getElementById("valid-form-update-profile");
    if (!form.checkValidity()) {
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

            companyName: companyInfoState.companyName,
            phoneNumber: companyInfoState.phoneNumber,
            address: companyInfoState.address,
            companyProfilePic: companyInfoState.companyProfilePic
          };
          dispatch(updateCompany({ token: token, data: dataUpdate, formData: undefined }))
          form.classList.remove("was-validated");
          setIsEditProfile(false);
        }
      });


    }

  }


  useEffect(() => {
    if (companyInfoStatus.requesting) {
      Swal.fire({
        title: 'Updating!',
        html: 'Waiting...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

        },

      })
    }
    else if (companyInfoStatus.successful) {

      Swal.fire(
        'Success!',
        'Click to Close!',
        'success'

      )
      dispatch({ type: UPDATE_COMPANY_CLEAN })
    }
    else if (companyInfoStatus.errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something wrong',

      })
      dispatch({ type: UPDATE_COMPANY_CLEAN })
    }

  }, [companyInfoStatus])

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


          companyName: companyInfoState.companyName,
          phoneNumber: companyInfoState.phoneNumber,
          address: companyInfoState.address,
          companyProfilePic: companyInfoState.companyProfilePic


        }
        dispatch(updateCompany({ data: data, formData: formData, token: token }))
      }
    });







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
                <h5>Company Info:</h5>
              </div>
              <div>
                <div class="profile-pic">
                  <label class="-label" for="file">
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onChange={changeUploadAvatar} />
                  <img id="output" width="200" src={companyInfoState.companyProfilePic} />
                </div>



              </div>
              <form className="needs-validation" id="valid-form-update-profile">



                <div class="form-group form-group-profile-client">
                  <label for="">Company Name:</label>
                  <input type="text" onChange={onChangeCompanyInfo} required value={companyInfoState.companyName}
                    class="form-control" name="companyName" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Please enter company name
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">Address</label>
                  <input type="text" onChange={onChangeCompanyInfo} required value={companyInfoState.address}
                    class="form-control" name="address" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Please enter address
                  </div>
                </div>
                <div class="form-group form-group-profile-client">
                  <label for="">Phone Number</label>
                  <input type="text" onChange={onChangeCompanyInfo} required pattern="((09|03|07|08|05|028|024)+([0-9]{8})\b)" required value={companyInfoState.phoneNumber}
                    class="form-control" name="phoneNumber" id="" aria-describedby="helpId" placeholder="" disabled={!isEditProfile} />
                  <div class="invalid-feedback">
                    Phone Number is invalid!
                  </div>
                </div>

                {isEditProfile ? "" : <button type="button" class="btn btn-sm btn-primary" onClick={() => setIsEditProfile(true)}>Edit</button>}
                {isEditProfile ? <button type="button" onClick={() => { cancelUpdate() }} class="btn btn-sm btn-primary btn-danger me-2">Cancel</button> : ""}
                {isEditProfile ? <button type="button" onClick={() => { saveUpdate() }} class="btn btn-sm btn-primary btn-success">Update</button> : ""}
              </form>
            </div>

          </div>
        </div>



        {/* ################################# */}
      </div>
    </div >
  );
}

