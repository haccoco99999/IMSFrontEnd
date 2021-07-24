import React, { useState } from "react";

//css
import "../product.css";

//components
import ProductManager from "./product-manager/product-manager";
import CategoryManager from "./category-manager/category-manager";
import LocationManager from "./location-manager/LocationManager";
export default function Manager() {
  return (
    <>
      <div className="space-top-heading">
        {/* title */}
        <div className="title-heading mt-2">
          <span>Product Manager</span>
        </div>

        <div className="mt-3">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class=" nav-link active"
                id="pills-product-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-product"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Product
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-category-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-category"
                type="button"
                role="tab"
                aria-controls="pills-category"
                aria-selected="false"
              >
                Category
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-location-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-location"
                type="button"
                role="tab"
                aria-controls="pills-location"
                aria-selected="false"
              >
                Location
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-variant-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-variant"
                type="button"
                role="tab"
                aria-controls="pills-variant"
                aria-selected="false"
              >
                Variant
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-supplier-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-supplier"
                type="button"
                role="tab"
                aria-controls="pills-supplier"
                aria-selected="false"
              >
                Suppliers
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-product"
              role="tabpanel"
              aria-labelledby="pills-product-tab"
            >
             <ProductManager/>
            </div>
            <div
              class="tab-pane fade"
              id="pills-category"
              role="tabpanel"
              aria-labelledby="pills-category-tab"
            >
             <CategoryManager/>
            </div>
            <div
              class="tab-pane fade"
              id="pills-location"
              role="tabpanel"
              aria-labelledby="pills-location-tab"
            >
               <LocationManager/>
            </div>
            <div
              class="tab-pane fade"
              id="pills-variant"
              role="tabpanel"
              aria-labelledby="pills-variant-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-supplier"
              role="tabpanel"
              aria-labelledby="pills-supplier-tab"
            >
             ...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
