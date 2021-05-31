import React, { Component } from 'react'
import { connect } from 'react-redux'
import loginRequest from './actions'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            passwordIsvalid: false,
            emailIsvalid: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailIsvalid = this.emailIsvalid.bind(this);
        this.passwordIsvalid = this.passwordIsvalid.bind(this);
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
        
        if(event.target.name === "email" && this.emailIsvalid(event.target.value)){
            this.setState({
                emailIsvalid : true
            });
            
        }
        else if(event.target.name === "password" && this.passwordIsvalid(event.target.value)){
            this.setState({
                passwordIsvalid: true
            });
        }
        
        
    }
    handleSubmit(event) {
        if(this.state.emailIsvalid && this.state.passwordIsvalid){
            this.props.loginRequest(this.state);
        }
        

        event.preventDefault();
    }
    emailIsvalid(email){
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    }
    passwordIsvalid(password){
        // return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))
         return (/^(?=.*\w).{8,}$/.test(password))
        
    }

    render() {
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
                   <div className={"alert alert-danger error-login " + this.props.login.errors} role="alert">{this.props.login.messages}</div>
                    
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group login-form-group">
                        <label >Email address</label>
                        <input type="text" className="form-control input-login" name="email" value={this.state.value} onChange={this.handleChange}  placeholder="Email" />
                        <div className="icon-contain-login">
                        <img className="icon-input-login" src="..\src\js\images\user-regular.svg" alt="icon" />
                        </div>
                        <small id="helpId" className={"form-text text-muted status-valid-email-" + this.state.emailIsvalid}>Invalid email address</small>


                    </div>
                    <div className="form-group login-form-group">
                        <label >Password</label>
                        <label className="lb-reset-password">Reset password</label>
                        <input type="password" className="form-control input-login " name="password" value={this.state.value} onChange={this.handleChange} placeholder="Password" />
                        <div className="icon-contain-login">
                        <img className="icon-input-login" src="..\src\js\images\key.png" alt="icon" />
                        </div>
                        <small id="helpId" className={"form-text text-muted status-valid-password-"+ this.state.passwordIsvalid}>Password is not valid</small>


                    </div>
                    <button type="submit" className="btn btn-primary  btn-signin"> Sign in</button>
                    </form>

                </div>
                {this.props.login.successful ? <Redirect to="/homepage" /> : null}
            </div>








            // <div class="main-container">
            //     <div class="main-left">
            //         <img src="..\src\js\images\Logo.png" class="logo-login" alt="logo" />
            //         <img src="src\js\images\Shrink-1024x479.png" class="logo-login-bottom" alt="logo" />
            //     </div>
            //     <div class="main-right">
            //         <div class="main-login">
            //             <div class="form-title">
            //                 <div class="welcome">
            //                     <h3>Welcome to IMS</h3>
            //                 </div>
            //                 <div class="title-login">
            //                     <h1>Login into your Account</h1>
            //                 </div>


            //             </div>

            //             <form class="form-login" onSubmit={this.handleSubmit}>
            //                 <div class="input-user">
            //                     <div class="input-bottom-container">
            //                         <label class="text-label-input">Username</label>
            //                         <div class="decorate-input">

            //                             <input type="text" name="email" value={this.state.value} onChange={this.handleChange} class="input-control" placeholder="Enter email of company" />
            //                             <div class="icon">
            //                                 <img src="..\src\js\images\user-regular.svg" alt="icon" />
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="input-password">
            //                     <div class="input-bottom-container">
            //                         <label class="text-label-input">Password</label>
            //                         <label class="text-label-input reset-password">Reset password</label>
            //                         <div class="decorate-input">

            //                             <input type="password" name="password" value={this.state.value} onChange={this.handleChange} class="input-control" placeholder="Enter your password" />
            //                             <div class="icon">
            //                                 <img src="..\src\js\images\key.png" alt="icon" />
            //                             </div>

            //                         </div>
            //                     </div>


            //                 </div>
            //                 <div class="buttom-submit">
            //                     <button type="submit" class="decorate-submit">Sign in</button>
            //                 </div>

            //             </form>

            //         </div>
            //         <div class="version">
            //             <span>Version 1.0</span>
            //             <span>Copyright 2021</span>
            //         </div>

            //     </div>



            //     {this.props.login.successful ? <Redirect to="/homepage" /> : null}
            // </div>

        );
    }
}
const mapStateToProps = state => ({
    login: state.login,
})

const connected = connect(mapStateToProps, { loginRequest })(Login)
export default connected