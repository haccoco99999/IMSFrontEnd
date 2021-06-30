import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./product.css";

//components
import Empty from "./empty";
import Manager from "./manager/manager";
import Create from "./create/create-new-product-begining";
import Variants from "./create/create-with-variants/create-with-variants";
import NoVariants from "./create/create-no-variants/create-no-variants";
import ProductDetails from "./details/product-details";
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
          <Route exact path="/homepage/product/create">
            <Create />
          </Route>
          <Route path="/homepage/product/create/novariants">
            <NoVariants />
          </Route>
          <Route path="/homepage/product/create/variants">
            <Variants />
          </Route>
          <Route path="/homepage/product/details">
            <ProductDetails/>
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
