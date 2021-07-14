import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components
import {
  getDetailsProductAction,
  updateProductAction,
  getAllBrandAction,
} from "./action";
import { getCategoriesAllAction } from "../create/action";
import ListProductsTable from "../../table-receipt/ListReceiptsTable";

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
  }));

  const [isFromManagerPage, setIsFromManagerPage] = useState(true);
  const [listVariants, setListVariants] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [categorySelected, setCategorySelected] = useState({});
  const [brandSelected, setBrandSelected] = useState({});
  const [brandDetails, setBrandDetails] = useState({});
  const [isUpdateGeneralInformation, setIsUpdateGeneralInformation] =
    useState(true);
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
  const handleChangeCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    // console.log(event.target.id);
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
  }
  function onClickSave() {
    // const productVariants = listVariants.map((e) => {
    //   return {
    //     id: e.id,
    //     name: e.name,
    //     price: e.price,
    //     barcode: e.barcode,
    //     sku: e.sku,
    //     unit: e.unit,
    //   };
    // });
    // const data = {
    //   id: location.state.productId,
    //   name: productDetails.name,
    //   brandName: brandSelected.name,
    //   brandDescription: "",
    //   categoryId: categorySelected.id,
    //   isVariantType: productDetails.isVariantType,
    //   productVariantsUpdate: [],
    // };

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

  useEffect(() => {
    dispatch(
      getDetailsProductAction({ id: location.state.productId, token: token })
    );
  }, []);

  useEffect(() => {
    if (productDetailsStore !== {}) {
      setProductDetails(productDetailsStore);
    }
    if (listVariantsStores !== null) {
      setIsReturnData(true);
      setListVariants(listVariantsStores);
    }
    if (productBrandDetailsStore !== {}) {
      setBrandDetails(productBrandDetailsStore);
    }
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
  ]);

  return (
    <>
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Details</h2>
          <div>
            {/* <button
              className="btn btn-danger button-tab text-white button me-3"
              onClick={onClickDelete}
            >
              Delete
            </button> */}
            <button
              className="btn btn-danger button-tab text-white button me-3"
              onClick={onClickToAddVariant}
            >
              Add Variant
            </button>
            {isDisabled ? (
              <button
                className="btn btn-warning button-tab text-white button me-3"
                onClick={onClickEdit}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-secondary button-tab text-white button me-3"
                onClick={onClickCancel}
              >
                Cancel
              </button>
            )}

            <button
              className="btn btn-primary button-tab button me-3"
              disabled={isDisabled}
              onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
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
                    {!productDetails.isVariantType && (
                      <>
                        <p>
                          <strong>Barcode:</strong>
                        </p>
                        <p>
                          <strong>Storage Quantity:</strong>
                        </p>
                      </>
                    )}

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
                          defaultValue=""
                          onChange={handleChangeBrand}
                        >
                          <option value="" disabled>
                            --No selected--
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
                        productDetails.categoryId
                      ) : (
                        <select
                          name="categoryID"
                          class="form-select"
                          // aria-label="Default select example"
                          defaultValue=""
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
                      <ListProductsTable
                        listHeaderEdit={listEditHeader}
                        listColumn={listColumn}
                        listData={listVariantsStores}
                        onRowClick={onClickToDetails}
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
