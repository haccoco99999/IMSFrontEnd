import React, { Component } from "react";

import AccountManagerContent from "./AccountManagerContent";

import "./accountmanager.css";

export default class AccountManagerView extends Component {
  render() {
    return (
      <div class="manager-background">
        <h1>Account Manager</h1> 
         <AccountManagerContent />
        {/* <RoleManager /> */}
      </div>
    );
  }
}
