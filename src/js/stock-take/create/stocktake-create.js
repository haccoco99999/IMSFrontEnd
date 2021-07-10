import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

//css
import "../stocktake.css";
//components
import ListLocationsModal from "./search-location-modal";
import { getAllLocationsAction, getListPackageAction,createStocktkaeAction } from "./action";
import SpinnerComponent from "./spinner-components";

export default function create() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  const [listCheckedItems, setListCheckedItems] = useState([
    {
      id: "",
      productVariantId: "",
      quantity: "",
      counted: "",
      note: "",
    },
  ]);
  const [selectedPackage, setSelectedPackage] = useState([]);

  function onChangeSelectPackage(event) {
    const packageDetails = listPackagesStore.find(
      (element) => element.id === event.target.value
    );
    // console.log(
    //   packageDetails.id +
    //     "-" +
    //     packageDetails.quantity +
    //     "-" +
    //     packageDetails.productVariantId
    // );
    const temp = [...listCheckedItems];
    temp[event.target.id].quantity = packageDetails.quantity;
    temp[event.target.id].id = packageDetails.id;
    temp[event.target.id].productVariantId = packageDetails.productVariantId;
    temp[event.target.id].counted = 0;
    setListCheckedItems(temp);
    console.log(listCheckedItems);

    // console.log(listCheckedItems);
  }

  function clickDeleteCheckItems(rowIndex) {
    console.log(rowIndex);
    setListCheckedItems(
      listCheckedItems.filter((_, index) => index !== rowIndex)
    );
    // console.log("Da xoa:",listCheckedItems)
  }

  function onAddCheckItemClick() {
    setListCheckedItems([
      ...listCheckedItems,
      {
        id: "",
        productVariantId: "",
        quantity: "",
        counted: 0,
        note: "",
      },
    ]);
  }

  //todo:modal declare
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

  //todo: bootstrap table declare

  const columns = [
    {
      dataField: "id",
      text: "Package ID",
      formatter: (cellContent, row, rowIndex) => (
        <select
          id={rowIndex}
          class="form-select"
          aria-label="Default select example"
          defaultValue=""
          onChange={onChangeSelectPackage}
        >
          <option value="" disabled>
            -- No Selected --
          </option>

          {listPackagesStore.map((item) => (
            <option value={item.id}>{item.id}</option>
          ))}
        </select>
      ),
    },
    {
      dataField: "productVariantId",
      text: "Variant ID",
      editable: false,
    },
    {
      dataField: "quantity",
      text: "Quantity",
      editable: false,
      // formatter: (cellContent, row) => <></>,
    },
    {
      dataField: "counted",
      text: "Counted",
      type: "number",
      formatter: (cellContent, row, rowIndex) =>
        (listCheckedItems[rowIndex].counted = row.counted),
    },
    {
      dataField: "note",
      text: "Note",
      editor: {
        type: Type.TEXTAREA,
      },
    },
    {
      dataField: "id",
      text: "Delete",
      editable: false,
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
      },
    },
  ];

  //todo: declare select row
  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   clickToEdit: true,
  //   onSelect: onSelectCheckBoxClick,
  // };

  //todo: state store
  const { token, listProductsStore, listPackagesStore } = useSelector(
    (state) => ({
      token: state.client.token,
      listProductsStore: state.createStocktakeReducer.listLocations,
      listPackagesStore: state.createStocktakeReducer.listPackages,
    })
  );

  function goBackClick() {
    history.goBack();
  }

  function handleOnSelect(row, isSelect) {
    if (isSelect) {
      console.log(row.id);
      console.log(row.locationName);
      setSelectedLocation({
        id: row.id,
        locationName: row.locationName,
        locationBarcode: row.locationBarcode,
      });
    }
  }

  function onClickSubmit() {
    const data = {
      stockTakeGroupLocation: [
        {
          locationId: selectedLocation.id,
          checkItems: listCheckedItems.map((checkItem) => {
            return {
              packageId: checkItem.id,
              actualQuantity: checkItem.counted,
              note: checkItem.note,
            };
          }),
        },
      ],
      stockTakeId: null,
    };

    console.log("Data output:", data);
  }

  function onSelectLocationClick() {
    hideModal();
    console.log("Data dang search:", selectedLocation.id);
    dispatch(getListPackageAction({ token: token, id: selectedLocation.id }));
  }
  function onSelectCheckBoxClick(row, isSelect, rowIndex) {
    if (isSelect) setSelectedPackage([...selectedPackage, rowIndex]);
    else
      setSelectedPackage(
        selectedPackage.filter((selected) => selected !== rowIndex)
      );
  }
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);

  useEffect(() => {
    if (listPackagesStore.length > 0) {
      setIsLoading(true);
      console.log("Check:", isLoading);
    }
  }, [listPackagesStore]);
  console.log(listPackagesStore);

  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <h2 className="id-color fw-bold me-auto">Create Stock take</h2>
            <div>
              <button
                className="btn btn-primary button-tab me-3 text-white"
                onClick={onClickSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="wrapper space-top">
          <div className="shadow wrapper-content">
            <div className="mt-3">
              <div className="title-heading mt-2">
                <span>Select Location</span>
              </div>
              <div className="mt-3">
                {/* <SearchToAddProduct /> */}
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  // data-bs-target="#ListLocationstModal"
                  // data-bs-toggle="modal"
                  onClick={showModal}
                >
                  Search More...
                </button>
              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className="shadow wrapper-content mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={onAddCheckItemClick}
                >
                  Add
                </button>
                <button
                  className="btn btn-secondary"
                  // onClick={clickDeleteCheckItems}
                >
                  Discard
                </button>
                <Table
                  keyField="id"
                  data={listCheckedItems}
                  columns={columns}
                  cellEdit={cellEditFactory({
                    mode: "click",
                    blurToSave: true,
                  })}
                  // selectRow={selectRow}
                />
              </div>
            </>
          ) : (
            <SpinnerComponent />
          )}
        </div>
      </div>
      {/* <AddMultiple /> */}
      <ListLocationsModal
        modalRef={modalRef}
        hideModal={hideModal}
        listLocations={listProductsStore}
        handleOnSelect={handleOnSelect}
        onSelectLocationClick={onSelectLocationClick}
      />
    </div>
  );
}
