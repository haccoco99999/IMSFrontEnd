import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../product.css";
//components
import ListPackageTable from "../../table-receipt/ListReceiptsTable";
import { getDetailsVariant, updateVariantAction } from "./action";

export default function VariantDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [variant, setVariant] = useState({});
  const [listPackage, setListPackage] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);
  const [listColumn, setListColumn] = useState({
    id: true,
    quantity: true,
    price: true,
    totalPrice: true,
    locationName: true,
    importedDate: true,
  });

  const [listHeaderEdit, setListEditHeader] = useState({
    id: "Package ID",
    importedDate: "Imported Date",
  });

  const columns = [
    { dataField: "id", text: "Variant ID" },
    { dataField: "price", text: "Price" },
    { dataField: "totalPrice", text: "Total Price" },
    {
      dataField: "locationName",
      text: "Location Name",
    },
    { dataField: "importedDate", text: "Imported Date " },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/product/details/package", {
        packageId: row.id,
      });
    },
  };

  const { variantStore, listPackageStore, token, messages } = useSelector(
    (state) => ({
      variantStore: state.getDetailsProductReducer.productVariant,
      listPackageStore: state.getDetailsProductReducer.productVariant.packages,
      token: state.client.token,
      messages: state.getDetailsProductReducer.messages,
    })
  );

  const onChangeValue = (event) => {
    console.log(event.target.name);
    setVariant({
      ...variant,
      [event.target.name]: event.target.value,
    });
    // console.log("SUA:", variant);
  };

  function goBackClick() {
    history.goBack();
  }

  function onClickToDetails(row) {
    history.push("/homepage/product/details/package", {
      packageId: row.id,
    });
  }

  function onClickEdit() {
    setIsDisabled(false);
  }
  function onClickCancel() {
    setIsDisabled(true);
    //reset
    setVariant(variantStore);
  }
  function onClickSave() {
    const data = {
      productId: location.state.productId,
      isVariantType: location.state.variantType,
      productVariantsUpdate: [
        {
          id: variant.id,
          name: variant.name,
          price: variant.price,
          barcode: variant.barcode,
          sku: variant.sku,
          unit: variant.unit,
        },
      ],
    };
    console.log("DATA:", data);
    dispatch(updateVariantAction({ token: token, data: data }));
  }
  useEffect(() => {
    dispatch(getDetailsVariant({ id: location.state.variantId, token: token }));
  }, []);

  useEffect(() => {
    if (variantStore !== {}) setVariant(variantStore);

    if (listPackageStore !== null) {
      setIsReturnData(true);
      setListPackage(
        listPackageStore.map((item) => {
          item.locationName = item.location.locationName;
          return {
            id: item.id,
            quantity: item.quantity,
            importedDate: item.importedDate,
            locationName: item.locationName,
            price: item.price,
            totalPrice: item.totalPrice,
          };
        })
      );
    }
  }, [variantStore, listPackageStore]);

  useEffect(() => {
    if (messages === "Update Variant success") {
      dispatch(
        getDetailsVariant({ id: location.state.variantId, token: token })
      );
    }
  }, [messages]);
  return (
    <div className="overflow-scroll">
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
                Packages
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
                <div className="title-heading mt-2">
                  <span>Variant Details </span>
                </div>
                <div className="mt-3">
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>Variant ID:</strong>
                        {variant.id}
                      </p>
                      <p>
                        <strong>Product ID:</strong>
                        {variant.productId}
                      </p>
                      <p>
                        <strong>Name:</strong>
                        {isDisabled ? (
                          variant.name
                        ) : (
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={onChangeValue}
                            value={variant.name}
                          />
                        )}
                      </p>
                      <p>
                        <strong>SKU:</strong>
                        {isDisabled ? (
                          variant.sku
                        ) : (
                          <input
                            type="text"
                            name="sku"
                            className="form-control"
                            onChange={onChangeValue}
                            value={variant.sku}
                          />
                        )}
                      </p>
                      <p>
                        <strong>Barcode:</strong>
                        {isDisabled ? (
                          variant.barcode
                        ) : (
                          <input
                            type="text"
                            name="barcode"
                            className="form-control"
                            onChange={onChangeValue}
                            value={variant.barcode}
                          />
                        )}
                      </p>
                    </div>
                    <div className="col-4">
                      {/* <p>
                        <strong>Unit:</strong>
                        {variant.unit}
                      </p> */}
                      <p>
                        <strong>Quantity:</strong>
                        {variant.storageQuantity}
                      </p>
                      <p>
                        <strong>Price:</strong>
                        {isDisabled ? (
                          variant.price
                        ) : (
                          <input
                            type="text"
                            name="price"
                            className="form-control"
                            onChange={onChangeValue}
                            value={variant.price}
                          />
                        )}
                      </p>
                      {/* <p>
                        <strong>Total Price:</strong>
                        {variant.cost}
                      </p> */}
                    </div>
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
              {isReturnData && (
                <div className="mt-3">
                  {/* <ListPackageTable
                    listHeaderEdit={listHeaderEdit}
                    listColumn={listColumn}
                    listData={listPackage}
                    onRowClick={onClickToDetails}
                  /> */}
                  <BootstrapTable
                    keyField="id"
                    striped
                    hover
                    condensed
                    columns={columns}
                    headerClasses="table-header-receipt"
                    noDataIndication="Table is Empty"
                    data={listPackage}
                    rowEvents={rowEvents}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
