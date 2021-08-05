import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./supplier.css";

//component
import Empty from "./empty";
import Details from "./details/supplier-details";
import Create from "./create/create-supplier";
import Manager from "./manager/supplier-manager";
export default function () {
  return (
    //<Empty />
    // <Create />
    <div className="home_content ">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/supplier">
            <Manager />
          </Route>
          <Route path="/homepage/supplier/create">
            <Create />
          </Route>

          <Route path="/homepage/supplier/details">
            <Details />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
