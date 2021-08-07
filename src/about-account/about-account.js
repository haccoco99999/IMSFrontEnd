import React from "react";
import "./about-account.css";
import { connect } from "react-redux";
//todo: update request
import updateRequest from "./action";
import ErrorMessages from "../error-components/error-component";
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_modal: false,
      isEdit: false,
      isEditFullname: true,
      isEditPhone: true,
      isEditDate: true,
      fullname: this.props.client.fullname,
      phoneNumber: this.props.client.phoneNumber,
      dateOfBirth: this.props.client.dateOfBirth,
      isConfirmPassword: false,
      isError: false,
      isValidPassword: false,
    };
    this.password = React.createRef();
    this.newPassword = React.createRef();
    this.confirmPassword = React.createRef();
    this.clickModal = this.clickModal.bind(this);

    this.onChangeValue = this.onChangeValue.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.clickCancelEdit = this.clickCancelEdit.bind(this);
    this.clickSaveEdit = this.clickSaveEdit.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
  }

  clickModal() {
    this.setState({
      status_modal: !this.state.status_modal,
    });
  }

  clickEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
      fullname: this.props.client.fullname,
      phoneNumber: this.props.client.phoneNumber,
      dateOfBirth: this.props.client.dateOfBirth,
    });
  }
  clickCancelEdit() {
    this.setState({
      isEdit: !this.state.isEdit,
      fullname: this.props.client.fullname,
      phoneNumber: this.props.client.phoneNumber,
      dateOfBirth: this.props.client.dateOfBirth,
    });
  }
  clickSaveEdit() {
    let password = null;
    let newPassword = null;
    if (this.state.isConfirmPassword && this.state.isValidPassword) {
      password = this.password.current.value;
      newPassword = this.newPassword.current.value;
    }
    if (
      (this.state.isConfirmPassword && this.state.isValidPassword) ||
      this.state.isEdit
    ) {
      var dataUpdate = {
        oldPassword: password,
        newPassword: newPassword,
        fullname: this.state.fullname,
        phoneNumber: this.state.phoneNumber,
        address: this.props.client.address,
        dateOfBirth: this.state.dateOfBirth,
      };
      //todo: redux start

      this.props.updateRequest({
        token: this.props.client.token,
        dataUpdate: dataUpdate,
      });
    }

    if (this.state.isConfirmPassword && this.state.isValidPassword) {
      this.password.current.value = "";
      this.newPassword.current.value = "";
      this.confirmPassword.current.value = "";
      this.setState({
        status_modal: !this.state.status_modal,
        isConfirmPassword: !this.state.isConfirmPassword,
        isValidPassword: !this.state.isValidPassword,
      });
    } else if (this.state.isEdit) {
      this.setState({
        isEdit: !this.state.isEdit,
      });
    }
  }
  checkPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  }

  changeConfirmPassword(event) {
    const newPassword = this.newPassword.current.value;
    const confirmPassword = this.confirmPassword.current.value;
    console.log(
      newPassword == confirmPassword &&
        newPassword != "" &&
        confirmPassword != ""
    );
    if (this.checkPassword(newPassword)) {
      this.setState({
        isValidPassword: true,
      });
    } else {
      this.setState({
        isValidPassword: false,
      });
    }
    if (newPassword == confirmPassword) {
      this.setState({
        isConfirmPassword: true,
      });
    } else {
      this.setState({
        isConfirmPassword: false,
      });
    }
  }
  onChangeValue(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="home_content background-about-account">
        <div className="text">
          {/* ############################ */}
          <div>
            bv
            <ErrorMessages error={this.props.updateProfile.errors} />
            <ErrorMessages error={this.props.updateProfile.messages} />
            <div
              className={
                "modal  modal-customize-about-" + this.state.status_modal
              }
              id="exampleModalCenter"
              tabIndex={-1}
              aria-labelledby="exampleModalCenterTitle"
              aria-modal="true"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content customize-model-content">
                  <div className="modal-body">
                    <h3>Change your password</h3>
                    <p>Enter your curent password and new password</p>
                    {/* <div class="alert alert-danger password-not-found" role="alert">
                                            {this.props.updateProfile.errors}
                                        </div> */}
                    <div className="form-group">
                      <label>CURRENT PASSWORD</label>
                      <input
                        type="text"
                        onChange={(event) => this.changeConfirmPassword(event)}
                        ref={this.password}
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>NEW PASSWORD</label>
                      <input
                        onChange={(event) => this.changeConfirmPassword(event)}
                        ref={this.newPassword}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <small
                        class={"valid-password-" + this.state.isValidPassword}
                      >
                        Minimum eight characters,uppercase letter, owercase
                        letter,number and special characte
                      </small>
                    </div>
                    <div className="form-group">
                      <label>CONFIRM PASSWORD</label>
                      <input
                        onChange={(event) => this.changeConfirmPassword(event)}
                        ref={this.confirmPassword}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <small
                        class={
                          "valid-confirm-password-" +
                          this.state.isConfirmPassword
                        }
                      >
                        Please make sure your password match
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.clickModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.clickSaveEdit}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2>My Account</h2>
            <div className="container-account">
              <div className="name-avatar-account">
                <img
                  className="avatar-img"
                  src="https://i.pinimg.com/736x/76/07/5c/76075c11bfe509ee9a11d9baa991c40d.jpg"
                  alt="avatar"
                />
                <div className="avatar-info">
                  <p>{this.props.client.userRole}</p>
                  <p>{this.props.client.fullname}</p>
                </div>
                <p onClick={this.clickModal}>Change password</p>
              </div>

              {!this.state.isEdit ? (
                <p className="edit-profile" onClick={this.clickEdit}>
                  Edit
                </p>
              ) : (
                <div>
                  {" "}
                  <p className="edit-profile" onClick={this.clickSaveEdit}>
                    Save
                  </p>
                  <p className="edit-profile" onClick={this.clickCancelEdit}>
                    Cancel
                  </p>
                </div>
              )}

              <div className="container-edit-account">
                <div className="form-info">
                  <label>Email</label>
                  <p>{this.props.client.email}</p>
                </div>
                <div className="form-info">
                  <label>Username</label>

                  <input
                    type="text"
                    name="fullname"
                    value={
                      this.state.isEdit
                        ? this.state.fullname
                        : this.props.client.fullname
                    }
                    onChange={(event) => this.onChangeValue(event)}
                    className={
                      "input-edit-profile edit-profile-" + this.state.isEdit
                    }
                  />
                </div>
                <div class="form-info">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={
                      this.state.isEdit
                        ? this.state.phoneNumber
                        : this.props.client.phoneNumber
                    }
                    onChange={(event) => this.onChangeValue(event)}
                    className={
                      "input-edit-profile edit-profile-" + this.state.isEdit
                    }
                  />
                </div>
                <div class="form-info">
                  <label>Date of birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      this.state.isEdit
                        ? this.state.dateOfBirth
                        : this.props.client.dateOfBirth
                    }
                    onChange={(event) => this.onChangeValue(event)}
                    className={
                      "input-edit-profile edit-profile-" + this.state.isEdit
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ################################# */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
  updateProfile: state.updateProfile,
});
//todo: update reqeuset chay den reducer
//param:
const connected = connect(mapStateToProps, { updateRequest })(Account);
export default connected;
