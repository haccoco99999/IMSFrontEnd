import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";

//css
import "../product.css";
//components
import {
  getDetailsProductAction,
  updateProductAction,
  getAllBrandAction,
} from "./action";
import { getCategoriesAllAction } from "../create/action";
// import ListProductsTable from "../../table-receipt/ListReceiptsTable";
import NavigationBar from "../../components/navbar/navbar-component";

export default function ProductDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const {
    productDetailsStore,
    messages,
    token,
    listVariantsStores,
    listCategoriesStore,
    listBrandStore,
    productBrandDetailsStore,
    categoryDtailsStore,
  } = useSelector((state) => ({
    token: state.client.token,
    productDetailsStore: state.getDetailsProductReducer.productDetails,
    messages: state.getDetailsProductReducer.messages,
    listVariantsStores:
      state.getDetailsProductReducer.productDetails.productVariants,
    listCategoriesStore: state.createProductReducer.listCategories,
    listBrandStore: state.getDetailsProductReducer.listBrand,
    productBrandDetailsStore:
      state.getDetailsProductReducer.productDetails.brand,
    categoryDtailsStore: state.getDetailsProductReducer.productDetails.category,
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
  // const [isUpdateGeneralInformation, setIsUpdateGeneralInformation] =
  //   useState(true);
  //todo: Declare table
  const [listColumn, setListColumn] = useState({
    id: true,
    name: true,
    sku: true,
    barcode: true,
    // unit: true,
    storageQuantity: true,
    price: true,
    cost: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    id: "Variant ID",
  });

  const columns = [
    { dataField: "id", text: "VariantID" },
    { dataField: "name", text: "Variant Name" },
    { dataField: "sku", text: "SKU" },
    { dataField: "barcode", text: "Barcode" },
    { dataField: "storageQuantity", text: "Quantity" },
    { dataField: "price", text: "Price" },
    { dataField: "cost", text: "Sale Price" },
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
    console.log(brandSelected);
  };

  const handleChangeProductName = (e) => {
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
    const data = {
      id: location.state.productId,
      name: productDetails.name,
      brandName: brandSelected.name,
      brandDescription: "",
      categoryId: categorySelected.id,
    };

    console.log(data);
    dispatch(updateProductAction({ token: token, data: data }));
  }
  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/product");
  }
  function onClickToDetails(row) {
    history.push("/homepage/product/details/variant", {
      variantId: row.id,
      productId: productDetails.id,
      variantType: productDetails.isVariantType,
    });
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
  }, []);

  useEffect(() => {
    if (listVariantsStores !== null) {
      setIsReturnData(true);
      setListVariants(listVariantsStores);
    }
    if (productDetailsStore !== {}) {
      setProductDetails(productDetailsStore);
    }

    if (productBrandDetailsStore !== {}) {
      setBrandDetails(productBrandDetailsStore);
    }
    if (categoryDtailsStore !== {}) setCategoryDtails(categoryDtailsStore);

    if (messages === "Update Product Success") {
      dispatch(
        getDetailsProductAction({ id: location.state.productId, token: token })
      );
      console.log("Update Success");
    }
  }, [
    productDetailsStore,
    listVariantsStores,
    productBrandDetailsStore,
    messages,
    categoryDtailsStore,
  ]);

  return (
    <>
      <NavigationBar
        listButton={listButtons}
        titleBar="Create"
        actionGoBack={goBackClick}
        status=""
      />
      {/* content */}
      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}
          <div className="title-heading mt-2">
            <span>Product Details</span>
          </div>

          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                General Information
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Variants
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="wrapper-content shadow mt-3">
                {/* Show info */}

                <div className="row g-3 justify-content-between me-3">
                  <div className="col-4">
                    <p>
                      <strong>Product ID:</strong> {productDetails.id}
                    </p>
                    <p>
                      <strong>Name:</strong>{" "}
                      {isDisabled ? (
                        productDetails.name
                      ) : (
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={handleChangeProductName}
                          value={productDetails.name}
                        />
                      )}
                    </p>
                    {/* {!productDetails.isVariantType && (
                      <>
                        <p>
                          <strong>Unit:</strong>
                          {productDetails.unit}
                        </p>
                      </>
                    )} */}
                    <p>
                      <strong>Unit:</strong>
                      {productDetails.unit}
                    </p>

                    <div class="form-check">
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
                    </div>
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
                    {!productDetails.isVariantType && isReturnData && (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              {productDetails.isVariantType && (
                <div>
                  <div className="mt-3">
                    {isReturnData && (
                      // <ListProductsTable
                      //   listHeaderEdit={listEditHeader}
                      //   listColumn={listColumn}
                      //   listData={listVariantsStores}
                      //   onRowClick={onClickToDetails}
                      // />
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
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
