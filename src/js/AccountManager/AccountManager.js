import React, { Component } from "react";

import AccountContent from "./AccountContent";

import "./accountmanager.css";

export default class AccountManager extends Component {
  render() {
    return (
      <div class="manager-background">
        <h1>Account Manager</h1>
        <AccountContent />
      </div>
    );
  }
}
