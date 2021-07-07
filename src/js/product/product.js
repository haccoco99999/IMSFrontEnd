import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./product.css";

//components
import Empty from "./empty";
import Manager from "./manager/manager";
import Manager2 from "./manager/manager2";
import Create from "./create/create-new-product-begining";
import Variants from "./create/create-with-variants/create-with-variants";
import NoVariants from "./create/create-no-variants/create-no-variants";
import ProductDetails from "./details/product-details";
import VariantDetails from "./details/product-variants-details";
import PackageDetails from "./details/product-variants-package-details";
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
            {/* <Manager /> */}
            <Manager2 />
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
          <Route exact path="/homepage/product/details">
            <ProductDetails />
          </Route>
          <Route path="/homepage/product/details/variant">
            <VariantDetails />
          </Route>
          <Route path="/homepage/product/details/package">
            <PackageDetails />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
