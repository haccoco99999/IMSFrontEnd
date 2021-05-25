import React from 'react'
import './about-account.css'

class Account extends React.Component {
    render() {
        return (
            <div className="home_content background-about-account">
                <div className="text">
                    {/* ############################ */}
                    <div>

                        <h2>My Account</h2>
                        <div class="container-account">
                            <div class="name-avatar-account">
                                <img class="avatar-img" src="https://i.pinimg.com/736x/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg" alt="avatar" />
                                <div class="avatar-info">
                                    <p>Stockkeper</p>
                                    <p>Huy Nguyen</p>

                                </div>
                                <p>Change password</p>

                            </div>




                            <div class="container-edit-account">
                                <div class="form-info">
                                    <label>Email</label>
                                    <p>Huynhqse13165@gmail.com</p>

                                </div>
                                <div class="form-info">
                                    <label>Username</label>
                                    <p>Huy Nguyen</p>
                                    <button type="button" name="" id="" class="btn btn-primary">Edit</button>
                                </div>
                                <div class="form-info">
                                    <label>Phone</label>
                                    <p>You have't added a phone number yet</p>
                                    <button type="button" name="" id="" class="btn btn-primary">Edit</button>
                                </div>
                                <div class="form-info">
                                    <label>Date of birth</label>
                                    <p>mm/dd/yyyy</p>
                                    <button type="button" name="" id="" class="btn btn-primary">Edit</button>
                                </div>


                                {/* <label>Fullname</label>
        <p>Huy Nguyen</p> */}
                                {/* <button type="submit" class="btn-edit-account" >ABCDS</button>
        <label>Phone number</label>
        <p>0123456789</p> */}
                                {/* <button type="submit" class="btn-edit-account" >ABCDS</button>
        <label>Date of birth</label> */}
                                {/*     
        <p>mm/dd/yyyy</p>
        <button type="submit" class="btn-edit-account" >ABCDS</button> */}

                            </div>
                        </div>
                    </div>



                    {/* ################################# */}
                </div>
            </div>

        );
    }

}

export default Account