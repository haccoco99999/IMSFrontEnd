import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import loginRequest from './actions'
import { Redirect } from 'react-router-dom'
// import Multistep from 'react-multistep'
// import StepZilla from "react-stepzilla";
// import { ProgressBar } from '../components/progress-bar/ProgressBar'
// import cloudinary from "cloudinary";
import Swal from 'sweetalert2'
import { LOGIN_CLEAN } from './constants'
import './login.css'


export default function Login(props) {

    const dispatch = useDispatch()
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: "",
    })
    const {loginStatus} = useSelector((state) =>({
        loginStatus : state.login
    }))
    function handleChange(event) {

        setDataLogin((state) =>({
            ...state, [event.target.name]: event.target.value
        }));

        

    }

    function submitLogin() {

        const form = document.getElementById("valid-form-login");
    
        if (!form.checkValidity()) {
            form.classList.add("was-validated");

        } else {
            dispatch(loginRequest({ email:dataLogin.email, password: dataLogin.password }))


        }


    }


    useEffect(() => {

        if (loginStatus.requesting === true) {
            Swal.fire({
                title: 'Login!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            })
        }
        if (loginStatus.successful === true) {

            Swal.fire(
                ' Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: LOGIN_CLEAN })
        }
        if (loginStatus.errors === true) {
            Swal.fire({
                icon: 'error',
                title: 'Update fail!...',
                text: 'Something went wrong!',
               
              })
            dispatch({ type: LOGIN_CLEAN })
        }


    }, [loginStatus])




    return (

        <div className=" container-login">
            <div className="left-side">
                <img src="..\src\js\images\Logo.png" className="logo-inventory" />
                <img src="..\src\js\images\Shrink-1024x479.png" className="logo-bottom-inventory" />
            </div>
            <div className="right-side">

                <p>Welcome to IMS</p>
                <h2>Login into your </h2>
                <h2>Account</h2>
                {/* <div className={"alert alert-danger error-login " + this.props.login.errors} role="alert">{this.props.login.messages}</div> */}
                <form class="row g-3 needs-validation" id="valid-form-login" noValidate>
                    {/* <form onSubmit={this.handleSubmit} > */}



                    <div className="form-group login-form-group">
                        <label >Email address</label>
                        <input type="text" className="form-control input-login" required name="email" value={dataLogin.email} onChange={handleChange} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" placeholder="Email" />
                        <div class="invalid-feedback">
                            Email invalid!
                        </div>
                        <div className="icon-contain-login">
                            <img className="icon-input-login" src="..\src\js\images\user-regular.svg" alt="icon" />
                        </div>

                        {/* <small id="helpId" className={"form-text text-muted status-valid-email-" + this.state.emailIsvalid}>Invalid email address</small> */}


                    </div>
                    <div className="form-group login-form-group">
                        <label >Password</label>


                        {/* <label className="lb-reset-password">Reset password</label> */}
                        <input type="password" className="form-control input-login " required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" name="password" value={dataLogin.password} onChange={handleChange} placeholder="Password" />
                        <div class="invalid-feedback">
                            Password invalid!
                        </div>
                        <div className="icon-contain-login">
                            <img className="icon-input-login" src="..\src\js\images\key.png" alt="icon" />
                        </div>

                        {/* <small id="helpId" className={"form-text text-muted status-valid-password-" + this.state.passwordIsvalid}>Password is not valid</small> */}


                    </div>
                    <button type="button" onClick={() => submitLogin()} className="btn btn-primary  btn-signin"> Sign in</button>
                </form>

            </div>
            {/* {this.props.login.successful ? <Redirect to="/homepage" /> : null} */}
        </div>







    );

}

