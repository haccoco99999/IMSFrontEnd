import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//css
import "../stocktake.css";
//components
import TableProduct from "../../list-products-table/ListProductsTable";

export default function CheckedLocationsDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const [listCheckedItems, setListCheckedItems] = useState([]);

  const { token } = useSelector((state) => ({
    token: state.client.token,
  }));
  const [listValueColumn, setListValueColumn] = useState([
    {
      packageId: "Package ID",
      input: false,
    },
    {
      productVariantId: "Variant ID",
      input: false,
    },
    {
      quantity: "Quantity",
      input: false,
    },
    {
      actualQuantity: "Counted",
      input: "true",
    },
  ]);
  function goBackClick() {
    history.goBack();
  }
  useEffect(() => {
    if (location.state.checkItems !== [])
      setListCheckedItems(
        location.state.checkItems.map((item) => {
          (item.quantity = item.package.quantity),
            (item.productVariantId = item.package.productVariantId);
          return {
            packageId: item.packageId,
            actualQuantity: item.actualQuantity,
            quantity: item.quantity,
            productVariantId: item.productVariantId,
            note: item.note,
          };
        })
      );
  }, []);
  console.log(listCheckedItems);
  return (
    <div>
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <h2 className="id-color fw-bold me-auto">Create Stock take</h2>
            <div>
              <button className="btn btn-default button-tab">Cancel</button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Submit
              </button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          <TableProduct
            listColumn={listValueColumn}
            listData={listCheckedItems}
          />
        </div>
      </div>
    </div>
  );
}
