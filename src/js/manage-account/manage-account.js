import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./accountmanager.css";

//component
import Manager from "./manager/manager";
export default function () {
  return (
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/manage-account">
            <Manager />
          </Route>
          {/* <Route path="/homepage/sale-man/create-purchase-requisition">
            <Create />
          </Route> */}
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
