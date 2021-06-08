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
