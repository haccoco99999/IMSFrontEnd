import React from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./stocktake.css";

//components
import Create from "./create/CreateStocktake";
import Manager from "./manager/StocktakeManager";
import StocktakeDetails from "./details/stocktake-details";
import CheckedLocationDetails from './details/stocktake-checkedlocation-details'
import Details2 from "./details/StocktakeDetails2"
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
            {/* <StocktakeDetails /> */}
            <Details2/>
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
