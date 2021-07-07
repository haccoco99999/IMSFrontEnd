import React, { useState } from "react";

//css
import "../product.css";

//components
import ProductManager from "./product-manager/product-manager";
import CategoryManager from "./category-manager/category-manager";

export default function manager() {
  const [isChecked, setIsChecked] = useState(true);
  const [isProductView, setIsProductView] = useState(true);

  const onChangeValue = (event) => {
    if (event.target.value == "product") {
      setIsProductView(true);
    } else {
      setIsProductView(false);
    }
    // todo: giai quyet duplicate cua react
    // this.setState({ checked: !this.state.checked });
    setIsChecked(!isChecked);
  };

  return (
    <div className="space-top-heading">
      {" "}
      {/* title */}
      <div className="title-heading mt-2">
        <span>Product Manager</span>
      </div>
      {/* content block */}
      <div className="wrapper-content shadow">
        {/* button options  */}
        <div className="d-flex justify-content-center" onChange={onChangeValue}>
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
            class=" text-dark border-end-0 shadow btn btn-outline-warning button-options-products button-options--account border border-dark"
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
            class="text-dark border-start-0 shadow btn btn-outline-warning button-options-products button-options--role border border-dark"
            for="danger-outlined"
          >
            Category
          </label>
        </div>

        {isProductView ? <ProductManager /> : <CategoryManager />}
      </div>
    </div>
  );
}
