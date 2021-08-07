import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
//css
import "../product.css";
//components
import {
  getDetailsProductAction,
  updateProductAction,
  getAllBrandAction,
} from "./action";
import { getCategoriesAllAction } from "../create/action";
import { TableLoading } from "../../components/loading/loading-component";
import { RESET } from "./constants";
import NavigationBar from "../../components/navbar/navbar-component";

export default function ProductDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const {
    productDetailsStore,
    // messages,
    token,
    listVariantsStores,
    listCategoriesStore,
    listBrandStore,
    productBrandDetailsStore,
    categoryDtailsStore,
    updateProductReducer,
    getDetailsProductReducer,
  } = useSelector((state) => ({
    token: state.client.token,
    productDetailsStore: state.getDetailsProductReducer.productDetails,
    // messages: state.getDetailsProductReducer.messages,
    listVariantsStores:
      state.getDetailsProductReducer.productDetails.productVariants,
    listCategoriesStore: state.getCategoriesCreateProductReducer.listCategories,
    listBrandStore: state.getBrandReducer.listBrand,
    productBrandDetailsStore:
      state.getDetailsProductReducer.productDetails.brand,
    categoryDtailsStore: state.getDetailsProductReducer.productDetails.category,
    updateProductReducer: state.updateProductReducer,
    getDetailsProductReducer: state.getDetailsProductReducer,
  }));

  const [isFromManagerPage, setIsFromManagerPage] = useState(true);
  const [listVariants, setListVariants] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [categorySelected, setCategorySelected] = useState({});
  const [brandSelected, setBrandSelected] = useState({});
  const [brandDetails, setBrandDetails] = useState({});
  const [categoryDtails, setCategoryDtails] = useState({});

  const columns = [
    { dataField: "id", text: "VariantID", hidden: true },
    { dataField: "name", text: "Variant Name" },
    { dataField: "sku", text: "SKU" },
    { dataField: "barcode", text: "Barcode" },
    { dataField: "storageQuantity", text: "Quantity", hidden: true },
    { dataField: "price", text: "Price", hidden: true },
    { dataField: "cost", text: "Sale Price", hidden: true },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/product/details/variant", {
        variantId: row.id,
        productId: productDetails.id,
        variantType: productDetails.isVariantType,
      });
    },
  };
  //todo: function
  const handleChangeCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    setCategorySelected({
      id: el.getAttribute("id"),
      name: el.getAttribute("value"),
    });
    console.log(categorySelected);
  };

  const handleChangeBrand = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    // console.log(event.target.id);
    setBrandSelected({
      id: el.getAttribute("id"),
      name: el.getAttribute("value"),
    });
    // console.log(brandSelected);
  };

  const handleChangeProductDetails = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    console.log(productDetails);
  };

  function onClickEdit() {
    setIsDisabled(false);
    dispatch(getCategoriesAllAction({ token: token }));
    dispatch(getAllBrandAction({ token: token }));
  }
  function onClickCancel() {
    setIsDisabled(true);
    //todo: reset
    setProductDetails(productDetailsStore);
    setBrandDetails(productBrandDetailsStore);
    setCategoryDtails(categoryDtailsStore);
  }
  function onClickSave() {
    // console.log(brandDetails);
    // console.log(categoryDtails);

    // if (brandSelected.name === undefined) {
    //   setBrandSelected(brandDetails);
    // }

    // if (categorySelected.id === undefined) {
    //   setCategorySelected(categoryDtails);
    // }

    const data = {
      id: location.state.productId,
      name: productDetails.name,
      brandName: brandSelected.name,
      brandDescription: "",
      categoryId: categorySelected.id,
      unit: productDetails.unit,
    };

    console.log(data);
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
        if (productDetails.name !== productDetailsStore.name) {
          dispatch(
            updateProductAction({
              token: token,
              data: data,
              needCheckName: true,
            })
          );
        } else
          dispatch(
            updateProductAction({
              token: token,
              data: data,
              needCheckName: false,
            })
          );
      }
    });
  }
  function goBackClick() {
    history.replace("/homepage/product");
  }

  function goToManagerPage() {
    history.push("/homepage/product");
  }
  // function onClickToDetails(row) {
  //   history.push("/homepage/product/details/variant", {
  //     variantId: row.id,
  //     productId: productDetails.id,
  //     variantType: productDetails.isVariantType,
  //   });
  // }
  function onClickToAddVariant() {
    history.push("/homepage/product/details/create-variant", {
      productId: productDetails.id,
      variantType: productDetails.isVariantType,
      productUnit: productDetails.unit,
    });
  }

  //todo: list buttons
  const listButtons = setListButtonNav();
  function setListButtonNav() {
    if (isDisabled)
      return [
        {
          isShow: true,
          title: "Add Variant",
          action: () => onClickToAddVariant(),
          class: "btn-danger",
        },
        {
          isShow: true,
          title: "Edit",
          action: () => onClickEdit(),
          class: "btn-warning text-white",
        },
      ];
    else
      return [
        {
          isShow: true,
          title: "Cancel",
          action: () => onClickCancel(),
          class: "btn-secondary",
        },
        {
          isShow: true,
          title: "Save",
          action: () => onClickSave(),
          class: "btn-primary",
        },
      ];
  }

  useEffect(() => {
    dispatch(
      getDetailsProductAction({ id: location.state.productId, token: token })
    );
    return () => {
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (listVariantsStores !== null) {
      setListVariants(listVariantsStores);
    }
    if (productDetailsStore !== {}) {
      setProductDetails(productDetailsStore);
    }

    if (productBrandDetailsStore !== {}) {
      setBrandDetails(productBrandDetailsStore);
    }
    if (categoryDtailsStore !== {}) setCategoryDtails(categoryDtailsStore);
  }, [
    productDetailsStore,
    listVariantsStores,
    productBrandDetailsStore,
    categoryDtailsStore,
  ]);

  useEffect(() => {
    setCategorySelected({
      id: categoryDtails.id,
      name: categoryDtails.categoryName,
    });

    setBrandSelected({ id: brandDetails.id, name: brandDetails.brandName });
  }, [brandDetails, categoryDtails]);

  useEffect(() => {
    if (updateProductReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateProductReducer.successful) {
      if (updateProductReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicate",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed)
            dispatch(
              getDetailsProductAction({
                id: location.state.productId,
                token: token,
              })
            );
        });
    } else if (updateProductReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateProductReducer]);

  useEffect(() => {
    if (getDetailsProductReducer.successful) {
      setIsReturnData(true);
    }
  }, [getDetailsProductReducer]);
  return (
    <>
      {isReturnData ? (
        <>
          <NavigationBar
            listButton={listButtons}
            titleBar="Product details"
            actionGoBack={goBackClick}
            status=""
            home="Product"
            currentPage="Product details"
          />

          <div className=" wrapper">
            <div class="card">
              <div class="card-header fw-bold">Product Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      {/* <p>
                        <strong>Product ID:</strong> {productDetails.id}
                      </p> */}
                      <p>
                        <strong>Name:</strong>{" "}
                        {isDisabled ? (
                          productDetails.name
                        ) : (
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleChangeProductDetails}
                            value={productDetails.name}
                          />
                        )}
                      </p>
                      <p>
                        <strong>Unit:</strong>
                        {isDisabled ? (
                          productDetails.unit
                        ) : (
                          <input
                            type="text"
                            name="unit"
                            className="form-control"
                            onChange={handleChangeProductDetails}
                            value={productDetails.unit}
                          />
                        )}
                      </p>

                      {/* <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={""}
                          name="isVariantType"
                          checked={productDetails.isVariantType}
                          disabled={isDisabled}
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                          <strong>Products has many attribute</strong>
                        </label>
                      </div> */}
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Brand:</strong>
                        {isDisabled ? (
                          brandDetails.brandName
                        ) : (
                          <select
                            name="brand"
                            class="form-select"
                            // aria-label="Default select example"
                            defaultValue={brandDetails.brandName}
                            onChange={handleChangeBrand}
                          >
                            <option value="" disabled>
                              Select brand
                            </option>
                            {listBrandStore.map((brand) => (
                              <option id={brand.id} value={brand.brandName}>
                                {brand.brandName}
                              </option>
                            ))}
                          </select>
                        )}
                      </p>
                      <p>
                        <strong>Category:</strong>{" "}
                        {isDisabled ? (
                          categoryDtails.categoryName
                        ) : (
                          <select
                            name="categoryID"
                            class="form-select"
                            // aria-label="Default select example"
                            defaultValue={
                              categoryDtails.categoryName || categorySelected
                            }
                            onChange={handleChangeCategory}
                          >
                            <option value="" disabled>
                              --No selected--
                            </option>
                            {listCategoriesStore.map((category) => (
                              <option
                                id={category.id}
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        )}
                      </p>
                      {/* {!productDetails.isVariantType && isReturnData && (
                        <>
                          <p>
                            <strong>Storage Quantity:</strong>
                            {listVariants[0].storageQuantity}
                          </p>
                          <p>
                            <strong>SKU:</strong>
                            {listVariants[0].sku}
                          </p>
                          <p>
                            <strong>Barcode:</strong>
                            {listVariants[0].barcode}
                          </p>
                          <p>
                            <strong>Price:</strong>
                            {listVariants[0].price}
                          </p>
                        </>
                      )} */}
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold">List of variants</h5>
                  <div className="mt-3">
                        <BootstrapTable
                          keyField="id"
                          striped
                          hover
                          condensed
                          columns={columns}
                          headerClasses="table-header-receipt"
                          noDataIndication="Table is Empty"
                          data={listVariantsStores}
                          rowEvents={rowEvents}
                        />
                      </div>
                  {/* {productDetails.isVariantType && (
                    <div>
                     
                    </div>
                  )} */}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <TableLoading />
      )}
    </>
  );
}
