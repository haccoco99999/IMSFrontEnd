import React from "react";
import { Route, Switch } from "react-router-dom";

//css
import "./product.css";

//components
import Empty from "./empty";
import Manager from "./manager/manager";
import Manager2 from "./manager/manager2";
import Create from "./create/CreateNewProduct";
import Variants from "./create/create-with-variants/CreateWithVariants";
import NoVariants from "./create/create-no-variants/CreateNoVariants";
import ProductDetails from "./details/ProductDetails";
import VariantDetails from "./details/VariantDetails";
import PackageDetails from "./details/PackageDetails";
import CreateVariant from "./details/CreateVariant";
import CreateProductManager from "./create/CreateProductManager"
export default function () {
  return (
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <Switch>
          <Route exact path="/homepage/product">
            {/* <Manager /> */}
            <Manager2 />
          </Route>
          <Route exact path="/homepage/product/create">
            {/* <Create /> */}
            {/* <CreateTest2/> */}
            <CreateProductManager/>
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
          <Route path="/homepage/product/details/create-variant">
            <CreateVariant />
          </Route>
        </Switch>

        {/* ################################# */}
      </div>
    </div>
  );
}
