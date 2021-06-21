import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";

// css
import "./goodreceipt.css";

// components
import Empty from "./empty";
import Filter from "./filter";
import Create from "./create/create";
import Details from "./details/details";
import Manager from "./manager/good-receipt-manager";

export default function () {
  return (
    //<Details/>
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        {/* Route trong goods receipt */}

        <Switch>
          {/* default manager path  */}
          <Route exact path="/homepage/good-receipt">
            <Manager />
          </Route>

          {/* create good receipt path */}
          <Route path="/homepage/good-receipt/create-goods-receipt">
            <Create />
          </Route>

          <Route path="/homepage/good-receipt/details"><Details/></Route>
        </Switch>

        {/* ################################# */}
      </div>

      <Filter />
    </div>
  );
}
