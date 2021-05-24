import React, { Component } from "react";

import "./accountmanager.css";

import AccountManager from "./AccountManager";
import RoleManager from "./RoleManager";

export default class AccountManagerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAccountManager: true,
      checked: true,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(event) {
    if (event.target.value == "account") {
      this.setState({ isAccountManager: true });
    } else {
      this.setState({ isAccountManager: false });
    }
    //giai quyet duplicate cua react
    this.setState({ checked: !this.state.checked });
  }

  render() {
    let manageView;

    if (this.state.isAccountManager) {
      manageView = <AccountManager />;
    } else {
      manageView = <RoleManager />;
    }

    return (
      <div class="manager-contents ">
        <div
          onChange={this.onChangeValue}
          class="d-flex justify-content-center "
        >
          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="success-outlined"
            autocomplete="off"
            value="account"
            checked={this.state.checked}
          />
          <label
            class=" shadow btn btn-outline-warning button-options button-options-account border border-dark"
            for="success-outlined"
          >
            Account
          </label>

          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="danger-outlined"
            autocomplete="off"
            value="role"
          />
          <label
            class=" shadow btn btn-outline-warning button-options button-options-role border border-dark"
            for="danger-outlined"
          >
            Role
          </label>
        </div>

        {manageView}
      </div>
    );
  }
}

{
  /* <div>
          <a class="btn btn-default me-md-2 add" onClick={() => this.toggle()}>
            <AddModal
              isShowing={this.state.isShowing}
              hide={this.state.toggle}
            />{" "}
            *
            <svg
              class="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#4caf50"
              class="bi bi-plus-lg"
              viewBox="0 0 20 20"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
            </svg>
            Add
          </a>

        {/* <RoleManager /> */
}
