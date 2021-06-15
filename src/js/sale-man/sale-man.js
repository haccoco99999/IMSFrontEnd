import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./sale-man.css";

//components
import Manager from "./manager/salesman-manager";
import Create from "./create/create-purchase-requisition";

export default function () {
  return (
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/sale-man">
            <Manager />
          </Route>
          <Route path="/homepage/sale-man/create-purchase-requisition">
            <Create />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
