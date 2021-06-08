import React, {useState} from "react";
import "./product.css";

import Empty from "./Empty";
import ProductView from "./ProductView";
import CategoryView from "./CategoryView";
import CreateProduct from './CreateNewProduct';
export default function ProductManager() {
    const [isChecked,setIsChecked] = useState(true);
    const [isProductView,setIsProductView] = useState(true);

    const onChangeValue = event =>{
        if (event.target.value == "product") {
            setIsProductView(true)
          } else {
            setIsProductView(false)
          }
          //giai quyet duplicate cua react
         // this.setState({ checked: !this.state.checked });
         setIsChecked(!isChecked);
    }

  return (
  //   <CreateProduct/>
    <div className="wrapper">
      <h1>Product Manager</h1>
      <div className="d-flex justify-content-center">
        <div className="wrapper-content">
          <div class="d-flex justify-content-center" onChange={onChangeValue}>
          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="success-outlined"
            autocomplete="off"
            value="product"
            checked={isChecked}
          />
          <label
            class=" shadow btn btn-outline-warning button-options button-options-account border border-dark"
            for="success-outlined"
          >
            Product
          </label>

          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="danger-outlined"
            autocomplete="off"
            value="category"
          />
          <label
            class=" shadow btn btn-outline-warning button-options button-options-role border border-dark"
            for="danger-outlined"
          >
            Category
          </label>
          </div>

          {isProductView ? <ProductView/> : <CategoryView/>}


        </div>
      </div>


    </div>
  );
}
