import React, { Component } from 'react'
import { connect } from 'react-redux'
import loginRequest from './actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value

        });
        console.log(this.state)
    }
    handleSubmit(event) {
        this.props.loginRequest(this.state)

        event.preventDefault();
    }

    render() {
        return (
            
        //     <div className=" container-login">
        //     <div className="left-side">
        //       <img src="images\Logo.png" className="logo-inventory" />
        //       <img src="images\Shrink-1024x479.png" className="logo-bottom-inventory" />
        //     </div>
        //     <div className="right-side">
        //       <p>Welcome to IMS</p>
        //       <h2>Login into your </h2>
        //       <h2>Account</h2>
        //       <div className="alert alert-danger error-login" role="alert">
        //         A simple danger alert—check it out!
        //       </div>
        //       <div className="form-group">
        //         <label htmlFor>Email address</label>
        //         <input type="text" className="form-control input-login" name id aria-describedby="helpId" placeholder />
        //         <small id="helpId" className="form-text text-muted">Tài khoản phải là gmail</small>
        //         <label htmlFor>Password</label>
        //         <label className="lb-reset-password">Reset password</label>
        //         <input type="text" className="form-control input-login" name id aria-describedby="helpId" placeholder />
        //         <small id="helpId" className="form-text text-muted">Mật khẩu có ít nhất 8 ký từ</small>
        //         <button type="button" name id className="btn btn-primary  btn-signin"> Sign in</button>
        //       </div>
        //     </div>
        //   </div>
          







            <div class="main-container">
                <div class="main-left">
                    <img src="..\src\js\images\Logo.png" class="logo-login" alt="logo" />
                    <img src="src\js\images\Shrink-1024x479.png" class="logo-login-bottom" alt="logo" />
                </div>
                <div class="main-right">
                    <div class="main-login">
                        <div class="form-title">
                            <div class="welcome">
                                <h3>Welcome to IMS</h3>
                            </div>
                            <div class="title-login">
                                <h1>Login into your Account</h1>
                            </div>


                        </div>

                        <form class="form-login" onSubmit={this.handleSubmit}>
                            <div class="input-user">
                                <div class="input-bottom-container">
                                    <label class="text-label-input">Username</label>
                                    <div class="decorate-input">

                                        <input type="text" name="email" value={this.state.value} onChange={this.handleChange} class="input-control" placeholder="Enter email of company" />
                                        <div class="icon">
                                            <img src="..\src\js\images\user-regular.svg" alt="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-password">
                                <div class="input-bottom-container">
                                    <label class="text-label-input">Password</label>
                                    <label class="text-label-input reset-password">Reset password</label>
                                    <div class="decorate-input">

                                        <input type="password" name="password" value={this.state.value} onChange={this.handleChange} class="input-control" placeholder="Enter your password" />
                                        <div class="icon">
                                            <img src="..\src\js\images\key.png" alt="icon" />
                                        </div>

                                    </div>
                                </div>


                            </div>
                            <div class="buttom-submit">
                                <button type="submit" class="decorate-submit">Sign in</button>
                            </div>

                        </form>

                    </div>
                    <div class="version">
                        <span>Version 1.0</span>
                        <span>Copyright 2021</span>
                    </div>

                </div>



                {this.props.login.successful ? <Redirect to="/homepage" /> : null}
            </div>

        );
    }
}
const mapStateToProps = state => ({
    login: state.login,
})

const connected = connect(mapStateToProps, { loginRequest })(Login)
export default connected