import React from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./stocktake.css";

//components
import Create from './create/create'
import Manager from "./manager/stoctake-manager"

export default function () {
  return (
   // <Details/>

    <div className="home_content wrapper">
     <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/stock-take">
            <Manager />
          </Route>
          <Route path="/homepage/stock-take/create">
            <Create />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
