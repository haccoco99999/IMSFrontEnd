import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import loginRequest from "./actions";
import { Redirect, useLocation } from "react-router-dom";
// import Multistep from 'react-multistep'
// import StepZilla from "react-stepzilla";
// import { ProgressBar } from '../components/progress-bar/ProgressBar'
// import cloudinary from "cloudinary";
import Swal from "sweetalert2";
import { LOGIN_CLEAN } from "./constants";
import "./login.css";
//images
import logo from "../images/Logo.png";
import logoShrink from "../images/Shrink-1024x479.png";
import key from "../images/key.png";
import userregular from "../images/user-regular.svg";
export default function Login(props) {
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const location = useLocation()
  const { loginStatus } = useSelector((state) => ({
    loginStatus: state.login,
  }));
  function handleChange(event) {
    setDataLogin((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function submitLogin() {
    const form = document.getElementById("valid-form-login");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
    } else {
      dispatch(
        loginRequest({ email: dataLogin.email, password: dataLogin.password })
      );
    }
  }
  useEffect(() => {
    dispatch({ type: "CLEAN_ALL_STORE" })
  }, [])
  useEffect(() => {
    if (loginStatus.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if (loginStatus.successful === true) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 600
      })
      dispatch({ type: LOGIN_CLEAN });
    }
    if (loginStatus.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email or Password is incorrect!",
      });
      dispatch({ type: LOGIN_CLEAN });
    }
  }, [loginStatus]);
  async function resetPassword() {
    // const { value: email } = await Swal.fire({
    //   title: 'Reset your password',
    //   input: 'email',
    //   inputLabel: 'Your email address',
    //   inputPlaceholder: 'Enter your email address',
    //   showCancelButton: true,
    // })

    // if (email) {
    //   Swal.fire(`Entered email: ${email}`)
    // }

    Swal.fire({
      title: 'Reset your password',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return fetch(`http://imspublicapi.herokuapp.com/api/resetlead`, {
          

            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              'Origin': '',
            },

            credentials: "include",

            body: JSON.stringify({ email }),
          }
        )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error}`
        )
      })
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }
})
  }
return (
  <div className=" container-login">
    <div className="left-side">
      <img src={logo} className="logo-inventory" />
      <img src={logoShrink} className="logo-bottom-inventory" />
    </div>
    <div className="right-side">
      <p>Welcome to IMS</p>
      <h2>Login into your </h2>
      <h2>Account</h2>
      {/* <div className={"alert alert-danger error-login " + this.props.login.errors} role="alert">{this.props.login.messages}</div> */}
      <form class="row g-3 needs-validation" id="valid-form-login" noValidate>
        {/* <form onSubmit={this.handleSubmit} > */}

        <div className="form-group login-form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control input-login"
            required
            name="email"
            value={dataLogin.email}
            onChange={handleChange}
            pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
            placeholder="Email"
          />
          <div class="invalid-feedback">Email invalid!</div>
          <div className="icon-contain-login">
            <img className="icon-input-login" src={userregular} alt="icon" />
          </div>

          {/* <small id="helpId" className={"form-text text-muted status-valid-email-" + this.state.emailIsvalid}>Invalid email address</small> */}
        </div>
        <div className="form-group login-form-group">
          <label>Password</label>

          <label onClick={() => resetPassword()} className="lb-reset-password pointer">Reset password</label>
          <input
            type="password"
            className="form-control input-login "
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            name="password"
            value={dataLogin.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div class="invalid-feedback">Password invalid!</div>
          <div className="icon-contain-login">
            <img className="icon-input-login" src={key} alt="icon" />
          </div>

          {/* <small id="helpId" className={"form-text text-muted status-valid-password-" + this.state.passwordIsvalid}>Password is not valid</small> */}
        </div>
        <button
          type="button"
          onClick={() => submitLogin()}
          className="btn btn-primary  btn-signin"
        >
          {" "}
          Sign in
        </button>
      </form>
    </div>
    {/* {this.props.login.successful ? <Redirect to="/homepage" /> : null} */}
  </div>
);
}
