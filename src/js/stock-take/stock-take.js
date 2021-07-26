import React from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./stocktake.css";

//components
import Create from "./create/CreateStocktake";
import Manager from "./manager/StocktakeManager";
import CheckedLocationDetails from './details/stocktake-checkedlocation-details'
import StocktakeDetails from "./details/StocktakeDetails"
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
          <Route exact path="/homepage/stock-take/details">
            <StocktakeDetails />
          </Route>
          <Route path="/homepage/stock-take/location-details">
            <CheckedLocationDetails/>
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
