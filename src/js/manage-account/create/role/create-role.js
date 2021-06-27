import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../accountmanager.css";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function AddNewRole() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [categorySelected, setCategorySelected] = useState({});

  //9 loai trang khac nhau
  const [productPermission, setProductPermission] = useState([]);
  const [goodReceiptPermission, setGoodReceiptPermission] = useState([]);
  const [purchaseOrderPermission, setPurchaseOrderPermission] = useState([]);
  const [purchaseRequisitionPermission, setPurchaseRequisitionPermission] =
    useState([]);
  const [priceQuoteOrder, setPriceQuoteOrder] = useState([]);
  const [goodIssuePermission, setGoodIssuePermission] = useState([]);
  const [stocktakePermission, setStocktakePermission] = useState([]);
  const [supplierPermission, setSupplierPermission] = useState([]);
  const [accountPermission, setAccountPermission] = useState([]);
  const [reportPermission, setReportPermission] = useState([]);
  const [pageClaimDictionary, setPageClaimDictionary] = useState({});

  const handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  function goBackClick() {
    history.goBack();
  }

  function onSaveClick(e) {
    e.preventDefault();

    dataDictionary();
  }

  function dataDictionary(e) {
    Object.entries(formData).map(([name, value]) => {
      console.log(name);
      console.log(value);
      if (name !== "name") {
        var str = name.split(".");
        if (name !== "productPermission") {
          if (str[0] === "productPermission" && value) {
            setProductPermission((oldArray) => [...oldArray, str[1]]);
          }
        }
        if (name !== "goodReceiptPermission") {
          if (str[0] === "goodReceiptPermission" && value) {
            setGoodReceiptPermission((oldArray) => [...oldArray, str[1]]);
          }
        }
        if (name !== "PurchaseOrder") {
          if (str[0] === "PurchaseOrder" && value) {
            setPurchaseOrderPermission((oldArray) => [...oldArray, str[1]]);
          }
        }
        if (name !== "PriceQuoteOrder") {
          if (str[0] === "PriceQuoteOrder" && value) {
            setPriceQuoteOrder((oldArray) => [...oldArray, str[1]]);
          }
        }
      }
    });
    console.log(productPermission);
  }
  console.log(pageClaimDictionary);


  return (
    <div className="home_content ">
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          {/* testing */}
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new Role</h2>
          <div>
            <button
              type="button"
              className="btn btn-primary button-tab me-3 text-white"
              onClick={dataDictionary}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper space-top">
        {/* content 1 */}
        <div className="wrapper-content shadow">
          <div className="title-heading mt-2">
            <span>Role Details</span>
          </div>
          <form>
            <div class="d-flex  justify-content-center">
              <div class="flex-fill">
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name of role"
                  value=""
                />
              </div>
            </div>
          </form>
        </div>

        {/* content 2 */}
        <div className="wrapper-content shadow mt-3">
          {/* check1 */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="productPermission"
              data-bs-toggle="collapse"
              data-bs-target="#collapsediv1"
              onChange={handleChange}
              checked={formData["productPermission"] || false}
            />
            <label class="form-check-label">Product</label>
          </div>
          <div id="collapsediv1" class="collapse">
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Read"
                  checked={formData["productPermission.Read"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Read product</label>
              </div>

              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Create"
                  checked={formData["productPermission.Create"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Create new product</label>
              </div>
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Update"
                  checked={formData["productPermission.Update"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Update product</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Delete"
                  checked={formData["productPermission.Delete"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Delete product</label>
              </div>

              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Approve"
                  checked={formData["productPermission.Approve"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Approve</label>
              </div>

              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="productPermission.Reject"
                  checked={formData["productPermission.Reject"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Reject</label>
              </div>
            </div>
          </div>
          {/* Check2 */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="goodReceiptPermission"
              data-bs-toggle="collapse"
              data-bs-target="#collapsediv2"
              onChange={handleChange}
              checked={formData["goodReceiptPermission"] || false}
            />
            <label class="form-check-label">Goods Receipt</label>
          </div>

          <div id="collapsediv2" class="collapse">
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Read"
                  checked={formData["goodReceiptPermission.Read"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Read product</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Create"
                  checked={formData["goodReceiptPermission.Create"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Read product</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Update"
                  checked={formData["goodReceiptPermission.Update"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Update</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Delete"
                  checked={formData["goodReceiptPermission.Delete"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Delete</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Approve"
                  checked={formData["goodReceiptPermission.Approve"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Approve </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="goodReceiptPermission.Reject"
                  checked={formData["goodReceiptPermission.Reject"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Reject </label>
              </div>
            </div>
          </div>

          {/* Check3 */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="PriceQuoteOrder"
              data-bs-toggle="collapse"
              data-bs-target="#collapsediv2"
              onChange={handleChange}
              checked={formData["PriceQuoteOrder"] || false}
            />
            <label class="form-check-label">PriceQuoteOrder</label>
          </div>

          <div id="collapsediv2" class="collapse">
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Read"
                  checked={formData["PriceQuoteOrder.Read"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Read </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Create"
                  checked={formData["PriceQuoteOrder.Create"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Create </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Update"
                  checked={formData["PriceQuoteOrder.Update"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Update</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Delete"
                  checked={formData["PriceQuoteOrder.Delete"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Delete</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Approve"
                  checked={formData["PriceQuoteOrder.Approve"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Approve </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PriceQuoteOrder.Reject"
                  checked={formData["PriceQuoteOrder.Reject"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Reject </label>
              </div>
            </div>
          </div>

          {/* Check4 */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="PurchaseOrder"
              data-bs-toggle="collapse"
              data-bs-target="#collapsediv2"
              onChange={handleChange}
              checked={formData["PurchaseOrder"] || false}
            />
            <label class="form-check-label">Purchase Order</label>
          </div>

          <div id="collapsediv2" class="collapse">
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Read"
                  checked={formData["PurchaseOrder.Read"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Read </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Create"
                  checked={formData["PurchaseOrder.Create"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Create </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Update"
                  checked={formData["PurchaseOrder.Update"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Update</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Delete"
                  checked={formData["PurchaseOrder.Delete"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Delete</label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Approve"
                  checked={formData["PurchaseOrder.Approve"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Approve </label>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="form-check d-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="PurchaseOrder.Reject"
                  checked={formData["PurchaseOrder.Reject"] || false}
                  onChange={handleChange}
                />
                <label class="form-check-label">Reject </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function ComponentCheck(){
  
}