import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./product.css";

//components
import Empty from "./empty";
import Manager from "./manager/manager";
import Create from "./create/create-new-product-begining";

// test
//import CreateBeginT from './product-manager/create-new-product-beggining'

export default function () {
  return (
    //<CreateBeginT/>
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/product">
            <Manager />
          </Route>
          <Route path="/homepage/product/create">
            <Create />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
