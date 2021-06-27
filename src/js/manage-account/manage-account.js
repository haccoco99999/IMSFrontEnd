import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./accountmanager.css";

//component
import Manager from "./manager/manager";
import CreateRole from './create/role/create-role'
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
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
