import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Swal from "sweetalert2";
//css
import "../../product.css";
//components
import { createProduct } from "../action";
// import Table from "../../../list-products-table/ListProductsTable";
import NavigationBar from "../../../components/navbar/navbar-component";

export default function CreateWithVariants(props) {
  let history = useHistory();

  let dispatch = useDispatch();

  //@params isChecking check neu co loi thi disable nut save
  const [isChecking, setIsChecking] = useState(false);

  //todo: declare bootstrap tabe
  const columns = [
    { dataField: "id", text: "id", hidden: true },
    {
      dataField: "name",
      text: "Variant Name",
      editable: true,
      formatter: (cellContent, row, rowIndex) =>
        (props.variantValues[rowIndex].name = row.name),
      validator: (newValue, oldValue, row, done) => {
        if (newValue !== "") {
          let check = false;
          checkDuplicateValue(newValue).then((result) => {
            console.log(result);
            if (result.hasMatch) {
              setIsChecking(true);
              check = true;
            } else {
              setIsChecking(false);
            }
          });
          setTimeout(() => {
            if (check)
              return done({
                valid: false,
                message: "Name has existed",
              });
            return done();
          }, 2000);

          return { async: true };
        }
      },
    },
    {
      dataField: "sku",
      text: "SKU (Optional)",
      editable: true,
      formatter: (cellContent, row, rowIndex) =>
        (props.variantValues[rowIndex].sku = row.sku),
      validator: (newValue, oldValue, row, done) => {
        if (newValue !== "") {
          let check = false;
          checkDuplicateValue(newValue).then((result) => {
            console.log(result);
            if (result.hasMatch) {
              setIsChecking(true);
              check = true;
            } else {
              setIsChecking(false);
            }
          });
          setTimeout(() => {
            if (check)
              return done({
                valid: false,
                message: "SKU has existed",
              });
            return done();
          }, 2000);

          return { async: true };
        }
      },
    },
    // {
    //   dataField: "barcode",
    //   text: "Barcode (Optional)",
    //   editable: true,
    //   formatter: (cellContent, row, rowIndex) =>
    //     (props.variantValues[rowIndex].barcode = row.barcode),
    // },
    // {
    //   dataField: "price",
    //   text: "Price",
    //   editable: true,
    //   validator: (newValue, oldValue, row) => {
    //     if (isNaN(newValue)) {
    //       setIsChecking(true);
    //       return {
    //         valid: false,
    //         message: "Price should be numeric",
    //       };
    //     } else setIsChecking(false);
    //   },
    //   formatter: (cellContent, row, rowIndex) =>
    //     (props.variantValues[rowIndex].price = row.price),
    // },
    // {
    //   dataField: "salePrice",
    //   text: "Sale price",
    //   editable: true,
    //   validator: (newValue, oldValue, row) => {
    //     if (isNaN(newValue)) {
    //       return {
    //         valid: false,
    //         message: "Sale price should be numeric",
    //       };
    //     }
    //   },
    //   formatter: (cellContent, row, rowIndex) =>
    //     (props.variantValues[rowIndex].salePrice = row.salePrice),
    // },
    {
      dataField: "id",
      text: "Action",
      editable: false,
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            className="text-danger btn"
            onClick={() => props.clickDeleteVariant(rowIndex)}
          >
            <i class="bi bi-trash"></i>
          </div>
          // <button
          //   type="button"
          //   className="btn btn-danger"
          //   onClick={() => props.clickDeleteVariant(rowIndex)}
          // >
          //   Delete
          // </button>
        );
      },
    },
  ];

  // const dataLastPage = location.state.formData;
  // const selectedCategory = location.state.categorySelected;

  // function onChangeValueVariants(event) {
  //   setVariantValues(
  //     variantValues.map((element, index) =>
  //       index == event.target.id
  //         ? {
  //             ...element,
  //             [event.target.name]: event.target.value,
  //           }
  //         : element
  //     )
  //   );
  // }

  // function clickToAddVariants() {
  //   let productVariants = {
  //     id: variantValues.length + 1,
  //     name: "",
  //     price: 0,
  //     salePrice: 0,
  //     barcode: "",
  //     sku: "",
  //   };
  //   setVariantValues([...variantValues, productVariants]);
  // }

  // function clickDeleteVariant(id) {
  //   setVariantValues(variantValues.filter((_, index) => index !== id));
  // }

  function checkDuplicateValue(keySearch) {
    const url = `${process.env.REACT_APP_API}/dupcheck/productvariant`;

    let result = fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
        Origin: "",
      },
      credentials: "include",
      body: JSON.stringify({ value: keySearch }),
    })
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => {
        throw error;
      });
    return result;
  }

  function goBackClick() {
    // history.goBack(-1)
    props.prevStep();
  }

  function isEmptyVariantNameRow(array) {
    const check = (element) => element.name === "";
    return array.some(check);
  }

  function onClickSave() {
    if (props.variantValues.length > 0) {
      if (isEmptyVariantNameRow(props.variantValues)) {
        Swal.fire({
          title: "Error",
          text: "There is invalid row!",
          icon: "error",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          showConfirmButton: false,
        });
      } else {
        console.log(props.variantValues);
        const data = {
          name: props.formData.name,
          brandName: props.formData.brand,
          brandDescription: "",
          unit: props.formData.unit,
          categoryId: props.formData.categoryId,
          isVariantType: true,
          productVariants: props.variantValues.map((variant) => {
            return {
              name: variant.name,
              price: variant.price,
              salePrice: variant.salePrice,
              // barcode: variant.barcode,
              sku: variant.sku,
            };
          }),
        };

        console.log("Data output:", data);
        Swal.fire({
          title: "Are you sure",
          text: "Do you want to save?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: " #d33",
          confirmButtonText: "Confirm",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              createProduct({
                data: data,
                token: props.token,
                needCheckSku: false,
              })
            );
          }
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Empty list!",
        icon: "error",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        showConfirmButton: false,
      });
    }
  }

  //todo: list nav button
  const listButton = setListButtonNav();
  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Save",
        action: () => onClickSave(),
        class: "btn-primary",
        disabled: isChecking,
      },
    ];
  }

  return (
    //   todo: gop chung 2 bang , sau do tach ra
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="Create variants "
        actionGoBack={goBackClick}
        status=""
        home="Product"
        currentPage="Create product"
        level3={true}
        level3Page="Create variants"
      />
      {/* content */}
      <div className="wrapper">
        <div class="card">
          <h5 class="card-header fw-bold">Variants Information</h5>
          <div class="card-body">
            <button
              onClick={props.clickToAddVariants}
              className="btn btn-outline-secondary"
            >
              Add variants
            </button>
            <div className="mt-3">
              <BootstrapTable
                keyField="id"
                data={props.variantValues}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                })}
              />
            </div>
          </div>
        </div>
        {/* <h2 className="id-color fw-bold mb-3">{dataLastPage.name}</h2>
        <div class="d-flex justify-content-around  mb-3">
          <div>
            <h5>Category</h5>
            <h5 className="id-color">{selectedCategory.name}</h5>
          </div>
          <div>
            <h5>Brand</h5>
            <h5 className="id-color">{dataLastPage.brand}</h5>
          </div>
        </div> */}

        {/* <div className="wrapper-content shadow">
         
          <Table
            listColumn={listValueColumn}
            listData={variantValues}
            clickToAddProduct={clickToAddVariants}
            onChangeValueProduct={onChangeValueVariants}
            clickDeleteProduct={clickDeleteVariant}
          />
        
        </div> */}
      </div>
    </div>
  );
}
