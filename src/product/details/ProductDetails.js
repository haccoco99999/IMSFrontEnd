import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import { Tooltip, Modal } from "bootstrap";
import BrandSelectModal from "../components/brand-component";
//css
import "../product.css";
//components
import {
  getDetailsProductAction,
  updateProductAction,
  getAllBrandAction,
} from "./action";
// import { getAllUpdateProductAction } from "../manager/product-manager/action";
import { getCategoriesAllAction } from "../create/action";
import { getAllUpdateProductAction } from "../manager/product-manager/action";
import {
  InfoPurchaseOrderLoader,
  TableLoading,
} from "../../components/loading/loading-component";
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
    getAllUpdateRequest,
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
    getAllUpdateRequest: state.getAllUpdateRequestReducer.productUpdateMessages,
  }));

  const [isHavingRequestSKU, setIsHavingRequestSKU] = useState(false);
  const [isReturnData, setIsReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [categorySelected, setCategorySelected] = useState({});
  const [brandSelected, setBrandSelected] = useState({});
  const [brandDetails, setBrandDetails] = useState({});
  const [categoryDtails, setCategoryDtails] = useState({});

  //@param:declare tooltip :
  const tooltipRef = useRef();
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
  });

  //todo: declare modal
  const modalRef = useRef();
  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  function onSelectBrandClick() {
    hideModal();
    setBrandDetails(brandSelected);
  }
  function handleOnSelectBrand(row, isSelect) {
    if (isSelect) {
      setBrandSelected({
        id: row.id,
        brandName: row.brandName,
        brandDescription: row.brandDescription,
      });
    }
  }

  //todo: handle change
  const handleChangeInputTypeBrand = (e) => {
    setBrandDetails({ ...brandDetails, [e.target.name]: e.target.value });
  };

  //todo: declare table

  const columns = [
    { dataField: "id", text: "VariantID", hidden: true },
    { dataField: "name", text: "Name" },
    { dataField: "sku", text: "SKU" },
    { dataField: "barcode", text: "Barcode" },
  ];

  const columnsHavingUpdateRequest = [
    { dataField: "id", text: "VariantID", hidden: true },
    { dataField: "name", text: "Name" },
    { dataField: "sku", text: "SKU" },
    { dataField: "barcode", text: "Barcode" },
    {
      dataField: "id",
      text: "Note",
      align: "center",
      formatter: (cellContent, row) => {
        console.log(row.id);
        console.log(row.name);
        const check = (element) => element.productVariantId === row.id;
        console.log(getAllUpdateRequest.some(check));
        if (getAllUpdateRequest.some(check)) {
          return (
            <div
              className="text-danger ms-3"
              // data-bs-toggle="tooltip"
              // data-bs-placement="top"
              // data-bs-delay='{"show":"500", "hide":"100"}'
              // title="This variant has request update sku"
            >
              <i class="bi bi-bell-fill"></i>
            </div>
          );
        }
      },
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/product/details/variant", {
        variantId: row.id,
        productId: productDetails.id,
        variantType: productDetails.isVariantType,
        isHavingRequestSKU: false,
      });
    },
  };

  const rowEventsHavingRequestUpdate = {
    onClick: (e, row, rowIndex) => {
      // tooltipList.dispose()
      // tooltipList.hide()
      const check = (element) => element.productVariantId === row.id;
      console.log(getAllUpdateRequest.some(check));
      if (getAllUpdateRequest.some(check)) {
        let findElement = getAllUpdateRequest.find(
          (e) => e.productVariantId === row.id
        );

        history.push("/homepage/product/details/variant", {
          variantId: row.id,
          productId: productDetails.id,
          variantType: productDetails.isVariantType,
          skuRequest: findElement.sku,
          // isHavingRequestSKU: true,
        });
      } else {
        history.push("/homepage/product/details/variant", {
          variantId: row.id,
          productId: productDetails.id,
          variantType: productDetails.isVariantType,
          // isHavingRequestSKU: false,
        });
      }
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
    // dispatch(getCategoriesAllAction({ token: token }));
    // dispatch(getAllBrandAction({ token: token }));
  }
  function onClickCancel() {
    setIsDisabled(true);
    //todo: reset
    setProductDetails(productDetailsStore);
    setBrandDetails(productBrandDetailsStore);
    setCategoryDtails(categoryDtailsStore);
  }
  const onClickSave = (event) => {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const data = {
        id: location.state.productId,
        name: productDetails.name,
        brandName: brandSelected.name,
        brandDescription: "",
        categoryId: categorySelected.id,
        unit: productDetails.unit,
      };

      console.log(data);
      if (productDetails.name === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Do not let name empty",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else
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
    form.classList.add("was-validated");
  };
  function goBackClick() {
    // history.replace("/homepage/product");
    history.goBack(-1);
  }

  function goToManagerPage() {
    // tooltipList.dispose()
    history.push("/homepage/product");
  }

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
          title: "Revert",
          action: () => onClickCancel(),
          class: "btn-secondary",
        },
        {
          isShow: true,
          title: "Save",
          action: (e) => onClickSave(e),
          class: "btn-primary",
        },
      ];
  }

  useEffect(() => {
    dispatch(
      getDetailsProductAction({ id: location.state.productId, token: token })
    );
    dispatch(getAllUpdateProductAction({ token: token }));
    dispatch(getCategoriesAllAction({ token: token }));
    dispatch(getAllBrandAction({ token: token }));
    return () => {
      dispatch({ type: RESET });
      // tooltipList.hide()
      // tooltipTriggerList.dispose
    };
  }, []);

  useEffect(() => {
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
    if (listVariantsStores !== null)
      listVariantsStores.forEach((variant) => {
        const check = (element) => element.productVariantId === variant.id;
        if (getAllUpdateRequest.some(check)) setIsHavingRequestSKU(true);
      });
  }, [listVariantsStores]);

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
          text: "Duplicate name",
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
          if (result.isConfirmed) {
            dispatch(
              getDetailsProductAction({
                id: location.state.productId,
                token: token,
              })
            );
            setIsDisabled(true);
          }
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
      <>
        <NavigationBar
          listButton={listButtons}
          titleBar="Product details"
          actionGoBack={goToManagerPage}
          status=""
          home="Product"
          currentPage="Product details"
        />

        <div className=" wrapper">
          <div class="card">
            <div class="card-header fw-bold">
              <div className="d-flex">
                Product Information
                {isHavingRequestSKU && (
                  <>
                    <div
                      className="text-danger ms-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="You have variant to update sku, please check your request page"
                    >
                      <i class="bi bi-bell-fill"></i>
                    </div>
                  </>
                )}
              </div>
            </div>
            {isReturnData ? (
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <form
                    id="productDetailsForm"
                    class="row g-3 justify-content-between me-3 needs-validation "
                    noValidate
                  >
                    <div className="col-4">
                      {" "}
                      <p>
                        <strong>Name: </strong>{" "}
                        {isDisabled ? (
                          productDetails.name
                        ) : (
                          <>
                            {" "}
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              onChange={handleChangeProductDetails}
                              value={productDetails.name}
                              required
                            />
                            <div class="invalid-feedback">
                              Please choose a product name
                            </div>{" "}
                          </>
                        )}
                      </p>
                      <p>
                        <strong>Unit: </strong>
                        {isDisabled ? (
                          productDetails.unit
                        ) : (
                          <>
                            {" "}
                            <input
                              type="text"
                              name="unit"
                              className="form-control"
                              onChange={handleChangeProductDetails}
                              value={productDetails.unit}
                              required
                            />
                            <div className="invalid-feedback">
                              Please choose a unit
                            </div>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Category: </strong>{" "}
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
                      <p>
                        <strong>Brand: </strong>
                        {isDisabled ? (
                          brandDetails.brandName
                        ) : (
                          <div className="input-group has-validation">
                            <input
                              name="brandName"
                              type="text"
                              id="brand"
                              className="form-control"
                              value={brandDetails.brandName}
                              onChange={handleChangeInputTypeBrand}
                              placeholder="eg. Nike"
                              required
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              id="button-addon2"
                              onClick={showModal}
                            >
                              Search more
                            </button>
                            <div className="invalid-feedback">
                              Please select a brand
                            </div>
                          </div>
                        )}
                      </p>
                    </div>
                  </form>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold">List of variants</h5>
                  <div className="mt-3">
                    {isHavingRequestSKU ? (
                      <BootstrapTable
                        keyField="id"
                        striped
                        hover
                        condensed
                        columns={columnsHavingUpdateRequest}
                        headerClasses="table-header-receipt"
                        noDataIndication="Table is Empty"
                        data={listVariantsStores}
                        rowEvents={rowEventsHavingRequestUpdate}
                        rowClasses="pointer"
                      />
                    ) : (
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
                        rowClasses="pointer"
                      />
                    )}
                  </div>
                  {/* {productDetails.isVariantType && (
                    <div>
                     
                    </div>
                  )} */}
                </li>
              </ul>
            ) : (
              <InfoPurchaseOrderLoader />
            )}
          </div>
        </div>
      </>
      <BrandSelectModal
        modalRef={modalRef}
        hideModal={hideModal}
        listBrand={listBrandStore}
        onSelectLocationClick={onSelectBrandClick}
        handleOnSelect={handleOnSelectBrand}
      />
    </>
  );
}
