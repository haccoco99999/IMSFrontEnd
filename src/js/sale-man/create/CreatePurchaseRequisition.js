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
import NavigationBar from "../../components/navbar/navbar-component";
import { TableLoading } from "../../components/loading/loading-component";
import {
  createPurchaseRequisitionAction,
  clearMessageAction,
  getALlSuppliersAction,
} from "./action";

export default function CreatePurchaseRequisition() {
  let history = useHistory();
  let dispatch = useDispatch();

  // const [supplierSelected, setSupplierSelected] = useState({});
  const [purchaseOrderProduct, setPurchaseOrderProduct] = useState([]);
  const [deadline, setDeadline] = useState("");

  const { token, createPRReducer } = useSelector((state) => ({
    // message: state.getCreatedFormPurchaseRequisitionReducer.messages,
    token: state.client.token,
    createPRReducer: state.getCreatedFormPurchaseRequisitionReducer,
    // listSuppliers: state.getCreatedFormPurchaseRequisitionReducer.listSuppliers,
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
        } else {
          if (newValue < 0)
            return {
              valid: false,
              message: "Quantity should be bigger than 0",
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
    {
      dataField: "name",
      text: "Action",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            className="text-danger"
            onClick={() => clickDeleteCheckItems(rowIndex)}
          >
            <i class="bi bi-trash"></i>
          </div>
          // <button
          //   type="button"
          //   className="btn btn-danger"
          //   onClick={() => clickDeleteCheckItems(rowIndex)}
          // >
          //   Delete
          // </button>
        );
      },
    },
  ];

  // const handleChangeSuppliers = (e) => {
  //   const index = e.target.selectedIndex;
  //   const el = e.target.childNodes[index];

  //   // console.log(event.target.id);
  //   setSupplierSelected({
  //     id: el.getAttribute("id"),
  //     name: el.getAttribute("value"),
  //   });
  //   console.log(supplierSelected);
  // };

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

  // function onChangeValueProduct(event) {
  //   setPurchaseOrderProduct(
  //     purchaseOrderProduct.map((element, index) =>
  //       index == event.target.id
  //         ? {
  //             ...element,
  //             [event.target.name]: event.target.value,
  //             totalAmount:
  //               [event.target.name] === "orderQuantity"
  //                 ? event.target.value * element.price
  //                 : event.target.value * element.orderQuantity,
  //           }
  //         : element
  //     )
  //   );
  // }

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
            totalAmount: 0,
          };
        }),
      };
      console.log(data);
      dispatch(createPurchaseRequisitionAction({ data: data, token: token }));
    }
  }

  //todo: listEdit

  // useEffect(() => {
  //   if (message !== "") {
  //     dispatch(clearMessageAction());
  //     // console.log("ID:", message);
  //     history.push("/homepage/sale-man/details", {
  //       fromPage: "CreatePage",
  //       purchaseRequisitionId: message,
  //     });
  //   }
  // }, [message]);
  useEffect(() => {
    if (createPRReducer.requesting === true) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    if (createPRReducer.successful === true) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/homepage/sale-man/details", {
            // fromPage: "CreatePage",
            purchaseRequisitionId: createPRReducer.messages,
          });
        }
      });
    }

    if (createPRReducer.errors === true) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  }, [createPRReducer]);

  return (
    <div>
      <NavigationBar
        actionGoBack={goBackClick}
        titleBar="Create Purchase Requisition"
        status=""
        listButton={listButton}
        home="Purchase Requisition"
        currentPage="Create "
        classStatus="bg-secondary"
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
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
