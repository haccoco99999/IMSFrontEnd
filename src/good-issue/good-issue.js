import React from "react";
import { Route, Switch } from "react-router-dom";
//css
import "./goodissue.css";
//components
import DetailGoodIssue from "./good-issue-detail/GoodIssueDetail";
import Manager from "./manager/manager"
export default function () {
  return (


    <div className="home_content">
 <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/good-issue">
            <Manager />
          </Route>
          <Route path="/homepage/good-issue/detail">
            <DetailGoodIssue />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>

    
    </div>
  );
}
