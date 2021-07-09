import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";

//css
import "../stocktake.css";
//components
import ListLocationsModal from "./search-location-modal";
import AddMultiple from "./add-multiple";
import TableProduct from "../../list-products-table/ListProductsTable";
import SearchComponent from "../../search-component/SearchComponent";
import { getAllLocationsAction } from "./action";
import { SearchToAddProduct } from "../../search-component/SearchComponentAll";
export default function create() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [loading,setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({
    id: "",
    locationName: "",
    locationBarcode: "",
  });
  //modal declare
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
  const { token, listProductsStore } = useSelector((state) => ({
    token: state.client.token,
    listProductsStore: state.createStocktakeReducer.listLocations,
  }));

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

  function onSubmitClick() {
    const dataCreateStocktake = {
      stockTakeGroupLocation: [
        {
          locationId: "string",
          checkItems: [
            {
              packageId: "string",
              actualQuantity: 0,
              note: "string",
            },
          ],
        },
      ],
      stockTakeId: null,
    };
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
      totalAmount: productRaw.price * 1,
      name: productRaw.name,
    };
    console.log(product);
    setPurchaseOrderProduct([...purchaseOrderProduct, product]);
  }
  function onChangeValueProduct(event) {
    setPurchaseOrderProduct(
      purchaseOrderProduct.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
              totalAmount:
                [event.target.name] === "orderQuantity"
                  ? event.target.value * element.price
                  : event.target.value * element.orderQuantity,
            }
          : element
      )
    );
  }

  function onSelectLocationClick(){
    hideModal()
    console.log("Data dang search:",selectedLocation)
    
  }

  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);
  // console.log(listProductsStore);
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
              <button className="btn btn-primary button-tab me-3 text-white">
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
