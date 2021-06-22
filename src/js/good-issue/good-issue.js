import React from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./goodissue.css";
import goodIssue from "./containers/goods-issue-render";
//components
export default function () {
  return (


    <div className="home_content wrapper">
 <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/good-issue">
            <goodIssue/>
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
