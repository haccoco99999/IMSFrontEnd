import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
//css
import "../../product.css";
//components
import { createProduct } from "../action";
import Table from "../../../list-products-table/ListProductsTable";
import NavigationBar from "../../../components/navbar/navbar-component";

export default function CreateWithVariants(props) {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  // const { token, messages } = useSelector((state) => ({
  //   token: state.client.token,
  //   messages: state.createProductReducer.messages,
  // }));

  const [variantValues, setVariantValues] = useState([
    {
      name: "",
      price: 0,
      salePrice: 0,
      barcode: "",
      sku: "",
    },
  ]);

  //todo: declare bootstrap tabe
  const columns = [
    { dataField: "name", text: "Variant Name", editable: true },
    { dataField: "sku", text: "SKU (Optional)", editable: true },
    { dataField: "barcode", text: "Barcode (Optional)", editable: true },
    { dataField: "price", text: "Price", editable: true },
    { dataField: "salePrice", text: "Sale price", editable: true },
  ];

  const [listValueColumn, setListValueColumn] = useState([
    {
      name: "Variants Name",
      input: true,
    },
    {
      price: "Price",
      input: true,
    },
    {
      salePrice: "Saleprice",
      input: true,
    },
    {
      sku: "SKU",
      input: true,
    },
    {
      barcode: "Barcode",
      input: true,
    },
  ]);

  // const dataLastPage = location.state.formData;
  // const selectedCategory = location.state.categorySelected;

  function onChangeValueVariants(event) {
    setVariantValues(
      variantValues.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
            }
          : element
      )
    );
  }

  function clickToAddVariants(row) {
    let productVariants = {
      name: "",
      price: 0,
      salePrice: 0,
      barcode: "",
      sku: "",
    };
    setVariantValues([...variantValues, productVariants]);
  }

  function clickDeleteVariant(id) {
    setVariantValues(variantValues.filter((_, index) => index !== id));
  }

  function goBackClick() {
    // history.goBack();
    props.prevStep();
  }

  function onClickSave() {
    // console.log(variantValues);
    // const data = {
    //   name: dataLastPage.name,
    //   brandName: dataLastPage.brand,
    //   brandDescription: "",
    //   categoryId: selectedCategory.id,
    //   unit: dataLastPage.unit,
    //   isVariantType: true,
    //   productVariants: variantValues,
    // };
    // console.log(JSON.stringify(data));
    // dispatch(createProduct({ data: data, token: token }));
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
      },
    ];
  }

  useEffect(() => {
    if (props.messages !== "")
      history.push("/homepage/product/details", {
        productId: props.messages,
      });
  }, [props.messages]);

  return (
    //   todo: gop chung 2 bang , sau do tach ra
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="With Variant"
        actionGoBack={goBackClick}
        status=""
      />
      {/* content */}
      <div className="wrapper space-top">
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

        <div className="wrapper-content shadow">
          <button onClick={clickToAddVariants} className="btn btn-primary">
            Add
          </button>
          {/* <Table
            listColumn={listValueColumn}
            listData={variantValues}
            clickToAddProduct={clickToAddVariants}
            onChangeValueProduct={onChangeValueVariants}
            clickDeleteProduct={clickDeleteVariant}
          /> */}
          <BootstrapTable
            keyField="name"
            data={variantValues}
            columns={columns}
            cellEdit={cellEditFactory({
              mode: "click",
              blurToSave: true,
            })}
          />
        </div>
      </div>
    </div>
  );
}
