import React from 'react'
import './profile-client.css'
const initValue ={

}
export default function () {
  
  const oldPassword = useRef()
  const confirmPassword = useRef()
  const newPassword = useRef()
  return (
    <div className="home_content">
      <div className="text">
        {/* ############################ */}
   
        <div className="container container-profile-client">
        <h4 className="title-profile-client">EDIT PROFILE</h4>
          <div class="row row-profile-client">
       
            <div className="col-sm-4 my-profile-client">
              <div className="col-12 title-profile-client">
                <h5>My Profile</h5>
              </div>
              <div className="avatar-profile-client-container">
                <img className="avatar-profile-client" src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.6435-9/131338347_3220004818103542_4826785720274733011_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=Z-lnhdA7CoIAX_aGY2V&_nc_ht=scontent.fvca1-1.fna&oh=e5f621590618df4e95519c029ebd8db4&oe=60DCE6FB" />
                <div className="name-role-profile-client">
                  <h4>Huy Beo</h4>
                  <span>Manager</span>
                </div>
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Email Adress</label>
                <input type="text" disabled
                  class="form-control " name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Password</label>
                <input type="text" ref={oldPassword}
                  class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">New Password</label>
                <input type="text" ref={newPassword}
                  class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Confirm Password</label>
                <input type="text" ref={confirmPassword}
                  class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />

              </div>
              <div class="form-group form-group-profile-client">
               
              
                <button type="text" class="form-control btn btn-primary" >Save</button>

              </div>
              

            </div>
            <div className="col-sm-7 edit-profile-client">
            <div className="col-12 title-profile-client">
                <h5>Edit Profile</h5>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="form-group form-group-profile-client">
                    <label for="">First Name</label>
                    <input type="text"
                      class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group form-group-profile-client">
                    <label for="">Last name</label>
                    <input type="text"
                      class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
                  </div>
                </div>

              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Address</label>
                <input type="text"
                  class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Phone Number</label>
                <input type="text"
                  class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <div class="form-group form-group-profile-client">
                <label for="">Birthdate</label>
                <input type="text"
                  class="form-control"  type="date" name="" id="" aria-describedby="helpId" placeholder="" />
              </div>
              <button type="button" class="btn btn-primary">Update Profile</button>
            </div>
          </div>
        </div>



        {/* ################################# */}
      </div>
    </div>
  );
}
