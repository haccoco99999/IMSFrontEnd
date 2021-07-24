import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
//css
import "../sale-man.css";

//components
import SearchComponent from "../../search-component/SearchComponent";
// import ListProductsTable from "../../list-products-table/ListProductsTable";
import NavigationBar from "../../components/navbar/navbar-component";

import {
  createPRAction,
  clearMessageAction,
  getALlSuppliersAction,
} from "./action";

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  const [supplierSelected, setSupplierSelected] = useState({});
  const [purchaseOrderProduct, setPurchaseOrderProduct] = useState([]);
  const [deadline, setDeadline] = useState("");
  // const [listColumn, setListColumn] = useState([
  //   {
  //     name: "Product Name",
  //   },
  //   {
  //     unit: "Unit",
  //     //input: true,
  //   },
  //   {
  //     orderQuantity: "Quantity",
  //     input: true,
  //   },
  //   {
  //     price: "Unit Price",
  //     input: true,
  //   },
  //   {
  //     totalAmount: "Amount",
  //   },
  // ]);

  const { message, token, listSuppliers } = useSelector((state) => ({
    message: state.getCreatedFormPurchaseRequisitionReducer.messages,
    token: state.client.token,
    listSuppliers: state.getCreatedFormPurchaseRequisitionReducer.listSuppliers,
  }));

  //todo: declare button
  const columns = [
    {
      dataField: "productVariantId",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Product Name",
      editable: false,
    },
    { dataField: "unit", text: "Unit", editable: false },
    {
      dataField: "orderQuantity",
      text: "Order Quantity",
      // formatter: (cellContent, row, rowIndex) =>
      //   (purchaseOrderProduct[rowIndex].orderQuantity = row.orderQuantity),
      validator: (newValue, oldValue, row) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Quantity should be numeric",
          };
        }
      },
    },
    // { dataField: "price", text: "Price", editable: false },
    // {
    //   dataField: "totalAmount",
    //   text: "Total Amount",
    //   editable: false,
    //   formatter: (cellContent, row, rowIndex) => (
    //     <div>
    //       <span>
    //         {purchaseOrderProduct[rowIndex].orderQuantity * row.price}
    //       </span>
    //     </div>
    //   ),
    // },
    { dataField: "name", text: "Action",editable: false,
    formatter: (cellContent, row, rowIndex) => {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => clickDeleteCheckItems(rowIndex)}
        >
          Delete
        </button>
      );
    },},
  ];

  const handleChangeSuppliers = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    // console.log(event.target.id);
    setSupplierSelected({
      id: el.getAttribute("id"),
      name: el.getAttribute("value"),
    });
    console.log(supplierSelected);
  };

  //todo: function nav button
  const listButton = setListButtonNav();
  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Save",
        class: " btn-primary",
        action: () => onSaveClick(),
      },
    ];
  }

  //todo: go back click
  function goBackClick() {
    history.goBack();
  }

  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setPurchaseOrderProduct((state) => state.filter((_, i) => i !== rowIndex));
  }

  function clickToAddProduct(productRaw) {
    let product = {
      id: productRaw.productId,
      orderId: "",
      productVariantId: productRaw.id,
      orderQuantity: 1,
      unit: productRaw.unit,
      price: productRaw.price,
      discountAmount: 0,
      totalAmount: 1,
      name: productRaw.name,
    };
    console.log(product);
    setPurchaseOrderProduct([...purchaseOrderProduct, product]);
  }

  function onChangeValueProduct(event) {
    setPurchaseOrderProduct(
      purchaseOrderProduct.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
              totalAmount:
                [event.target.name] === "orderQuantity"
                  ? event.target.value * element.price
                  : event.target.value * element.orderQuantity,
            }
          : element
      )
    );
  }

  function onChangeDeadline(event) {
    setDeadline(moment.utc(event.target.value).format());
    console.log(deadline);
  }

  function onSaveClick() {
    if (deadline === "" || purchaseOrderProduct.length === 0) {
      Swal.fire({
        title: "Error",
        text: "There are invalid data!",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    } else {
      const data = {
        // supplierId: supplierSelected.id,
        deadline: deadline,
        orderItems: purchaseOrderProduct.map((product) => {
          return {
            productVariantId: product.productVariantId,
            orderQuantity: product.orderQuantity,
            unit: product.unit,
            price: 0,
            discountAmount: product.discountAmount,
            totalAmount:0,
          };
        }),
      };
      console.log(data);
      dispatch(createPRAction({ data: data, token: token }));
    }
  }

  useEffect(() => {
    if (message !== "") {
      dispatch(clearMessageAction());
      // console.log("ID:", message);
      history.push("/homepage/sale-man/details", {
        fromPage: "CreatePage",
        purchaseRequisitionId: message,
      });
    }
  }, [message]);

  useEffect(() => {
    dispatch(getALlSuppliersAction({ token: token }));
  }, []);
  console.log(purchaseOrderProduct);
  return (
    <div>
      <NavigationBar
        actionGoBack={goBackClick}
        titleBar="Create"
        status=""
        listButton={listButton}
      />

      {/* content */}
      <div className="wrapper space-top">
        <div class="card">
          <h5 class="card-header fw-bold">Purchase Requisition Information</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h5 class="card-title">Search product</h5>
              <SearchComponent clickToAddProduct={clickToAddProduct} />
            </li>
            <li class="list-group-item">
              <h5 class="card-title">Deadline</h5>
              <input
                type="datetime-local"
                name="deadline"
                id="deadline"
                class="form-control"
                onChange={onChangeDeadline}
              />
            </li>
            <li class="list-group-item">
              <h5 class="card-title">List of products</h5>
              <BootstrapTable
                keyField="productVariantId"
                data={purchaseOrderProduct}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,

                  afterSaveCell: (oldValue, newValue, row, column) => {
                    row.totalAmount = row.orderQuantity * row.price;
                    console.log(row.totalAmount);
                    console.log(row.price);
                    console.log(row.orderQuantity);
                  },
                })}
              />
              {/* <ListProductsTable
                clickToAddProduct={clickToAddProduct}
                onChangeValueProduct={onChangeValueProduct}
                listColumn={listColumn}
                listData={purchaseOrderProduct}
              /> */}
            </li>
          </ul>
        </div>
        {/* <div className="wrapper-content shadow">
          <div className="title-heading mt-2">
            <span>Select your product</span>
          </div>
        </div>
      </div>
      <div className="wrapper-content shadow mt-3">
        <div>
          <label for="deadline" class="form-label">
            Deadline
          </label>
        </div>
        <div className="mt-3">
          <label for="supplier" class="form-label">
            Supplier
          </label>
          <select
            name="categoryID"
            class="form-select"
            aria-label="Default select example"
            defaultValue=""
            onChange={handleChangeSuppliers}
          >
            <option value="" disabled>
              -- No Selected --
            </option>

            {listSuppliers.map((supplier) => (
              <option id={supplier.id} value={supplier.supplierName}>
                {supplier.supplierName}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="mt-3">
          <label class="form-label" value="">
            Products
          </label>
        </div> */}
      </div>
    </div>
  );
}
