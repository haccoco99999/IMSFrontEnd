import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./accountmanager.css";

//component
import Manager from "./manager/manager";
import CreateRole from './create/role/create-role'
import CreateAccount from "./create/account/CreateAccount";
import EditUserAccount from "./create/account/EditUserAccount";
import EditRole from "./create/role/DetailRole";
export default function () {
  return (
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/manage-account">
            <Manager />
          </Route>
          <Route path="/homepage/manage-account/create-role">
            <CreateRole />
          </Route>
          <Route path="/homepage/manage-account/detail-role">
            <EditRole />
          </Route>
          <Route path="/homepage/manage-account/edit-user-account">
            <EditUserAccount />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
