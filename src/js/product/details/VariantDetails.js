import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import moment from "moment";
//css
import "../product.css";
//components
// import ListPackageTable from "../../table-receipt/ListReceiptsTable";
import { getDetailsVariant, updateVariantAction } from "./action";
import { RESET } from "./constants";
import NavigationBar from "../../components/navbar/navbar-component";
import { TableLoading } from "../../components/loading/loading-component";
export default function VariantDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [variant, setVariant] = useState({});
  const [listPackage, setListPackage] = useState([]);
  const [isReturnData, setIsReturnData] = useState(false);

  const columns = [
    { dataField: "id", text: "Package ID" },
    { dataField: "quantity", text: "Quantity" },
    // { dataField: "price", text: "Price" },
    // { dataField: "totalPrice", text: "Total Price" },
    // {
    //   dataField: "locationName",
    //   text: "Location Name",
    // },
    {
      dataField: "importedDate",
      text: "Imported Date",
      formatter: (cellContent, row) => {
        return (
          <span>
            {moment(row.importedDate).add(7, "h").format("DD-MM-YYYY")}
          </span>
        );
      },
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      history.push("/homepage/product/details/package", {
        packageId: row.id,
      });
    },
  };

  const {
    variantStore,
    listPackageStore,
    token,
    updateVariantReducer,
    getDetailsVariantReducer,
  } = useSelector((state) => ({
    variantStore: state.getDetailsVariantReducer.productVariant,
    listPackageStore: state.getDetailsVariantReducer.productVariant.packages,
    token: state.client.token,
    updateVariantReducer: state.updateVariantReducer,
    getDetailsVariantReducer: state.getDetailsVariantReducer,
    // messages: state.getDetailsProductReducer.messages,
  }));

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

  // function onClickToDetails(row) {
  //   history.push("/homepage/product/details/package", {
  //     packageId: row.id,
  //   });
  // }

  //todo:list buttons
  const listButtons = setListButtonNav();
  function setListButtonNav() {
    if (isDisabled) {
      return [
        {
          isShow: true,
          title: "Edit",
          action: () => onClickEdit(),
          class: "btn-warning text-white",
        },
      ];
    } else {
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
          // barcode: variant.barcode,
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
    return () => {
      dispatch({ type: RESET });
    };
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
    if (updateVariantReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateVariantReducer.successful) {
      if (updateVariantReducer.errors) {
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
              getDetailsVariant({ id: location.state.variantId, token: token })
            );
        });
    } else if (updateVariantReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateVariantReducer]);

  useEffect(() => {
    if (getDetailsVariantReducer.successful) setIsReturnData(true);
  }, [getDetailsVariantReducer]);

  // useEffect(() => {
  //   if (messages === "Update Variant success") {
  //     dispatch(
  //       getDetailsVariant({ id: location.state.variantId, token: token })
  //     );
  //   }
  // }, [messages]);
  return (
    <div>
      {isReturnData ? (
        <>
          <NavigationBar
            listButton={listButtons}
            titleBar="Variant details"
            actionGoBack={goBackClick}
            status=""
            home="Product"
            currentPage="Product details"
            level3={true}
            level3Page="Variant details"
          />
          <div className="wrapper ">
            <div class="card">
              <div class="card-header fw-bold">Variant Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  {" "}
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      {/* <p>
                        <strong>Variant ID:</strong>
                        {variant.id}
                      </p>
                      <p>
                        <strong>Product ID:</strong>
                        {variant.productId}
                      </p> */}
                      <p>
                        <strong>Name: </strong>
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
                        <strong>SKU: </strong>
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
                        <strong>Barcode: </strong>
                        {variant.barcode}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Storage Quantity: </strong>
                        {variant.storageQuantity}
                      </p>
                      <p>
                        <strong>Price: </strong>

                        {variant.price}
                      </p>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <h5 class="card-title fw-bold">List of packages</h5>
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
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <TableLoading />
      )}
    </div>
  );
}
