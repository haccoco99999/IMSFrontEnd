import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//css
import "../stocktake.css";
//components
import AdjustInventory from "./adjust-inventory";
import Reject from "./reject";
import { getDetailsStockTakeAction, submitAction } from "./action";
import Table from "../../table-receipt/ListReceiptsTable";

export default function StocktakeDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const [cleanJsonListLocation, setCleanJsonListLocation] = useState([]);

  const { token, groupLocationStore, stocktakeDetailsStore, messages } =
    useSelector((state) => ({
      token: state.client.token,
      groupLocationStore:
        state.getDetailsStocktakeReducer.goodIssue.groupLocations,
      stocktakeDetailsStore: state.getDetailsStocktakeReducer.goodIssue,
      messages: state.getDetailsStocktakeReducer.messages,
    }));
  console.log(groupLocationStore);

  const [listValueColumn, setListValueColumn] = useState({
    locationId: true,
    locationBarcode: true,
    locationName: true,
    countCheckedItems: true,
    checkItems: false,
  });
  const [listEditHeader, setListEditHeader] = useState({
    locationName: "Name",
    countCheckedItems: "Checked Items",
  });

  function goBackClick() {
    history.goBack();
  }

  function onClickToDetails(row) {
    history.push("/homepage/stock-take/location-details", {
      locationId: row.locationId,
      locationName: row.locationName,
      locationBarcode: row.locationBarcode,
      checkItems: row.checkItems,
    });
  }

  function onSubmitClick() {
    const data = {
      id: location.state.stocktakeId,
    };
    dispatch(submitAction({ token: token, data: data }));
  }

  function onRejectClick() {
    const data = {
      stockTakeId: location.state.stocktakeId,
      cancelReason: "",
    };
  }

  function onAdjustInventoryClick() {
    const data = {
      stockTakeId: "string",
    };
  }

  function onSaveClick() {
    const data = {
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
      stockTakeId: "string",
    };
  }

  useEffect(() => {
    dispatch(
      getDetailsStockTakeAction({
        id: location.state.stocktakeId,
        token: token,
      })
    );
  }, []);

  useEffect(() => {
    if (groupLocationStore !== undefined) {
      if (groupLocationStore === [])
        setCleanJsonListLocation(groupLocationStore);
      else {
        setCleanJsonListLocation(
          groupLocationStore.map((element) => {
            element.countCheckedItems = element.checkItems.length;
            return {
              id: element.id,
              locationId: element.locationId,
              locationBarcode: element.location.locationBarcode,
              locationName: element.location.locationBarcode,
              countCheckedItems: element.countCheckedItems,
              checkItems: element.checkItems,
            };
          })
        );
      }
    }
  }, [groupLocationStore]);

  useEffect(() => {
    if (messages === "Submit success") console.log("Submit Success");
  }, [messages]);

  console.log(cleanJsonListLocation);
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
            <div class="me-auto">
              <h2 class="id-color fw-bold">{stocktakeDetailsStore.id}</h2>
              <div class="form-text id-color">
                {stocktakeDetailsStore.stockTakeOrderType}
              </div>
            </div>
            <div>
              {stocktakeDetailsStore.stockTakeOrderType === 0 && (
                <>
                  <button className="btn btn-danger button-tab me-3 text-white">
                    Delete
                  </button>
                  <button
                    type="button"
                    // data-bs-target="#AdjustInventoryModal"
                    // data-bs-toggle="modal"
                    className="btn btn-primary button-tab--adjust me-3 text-white"
                    onClick={onSubmitClick}
                  >
                    Submit
                  </button>
                </>
              )}
              {stocktakeDetailsStore.stockTakeOrderType === 1 && (
                <>
                  <button
                    type="button"
                    data-bs-target="#RejectModal"
                    data-bs-toggle="modal"
                    className="btn btn-danger button-tab me-3 text-white"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    data-bs-target="#AdjustInventoryModal"
                    data-bs-toggle="modal"
                    className="btn btn-primary button-tab--adjust me-3 text-white"
                  >
                    Adjust Inventory
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}
          <div class="me-auto">
            <h2 class="id-color fw-bold">{stocktakeDetailsStore.id}</h2>
            <div class="form-text id-color">
              {stocktakeDetailsStore.stockTakeOrderType}
            </div>

            <div className="row g-3 justify-content-between me-3">
              <div className="col-4">
                <div class="form-text id-color">Created by:</div>
                <div class="form-text id-color">Created date:</div>
              </div>
              <div className="col-4">
                <div class="form-text id-color">Modified by:</div>
                <div class="form-text id-color">Modified date:</div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h2 class="id-color fw-bold">List Locations</h2>
            <div className="mt-3"></div>
          </div>
          <div className="mt-3">
            <Table
              listHeaderEdit={listEditHeader}
              listColumn={listValueColumn}
              listData={cleanJsonListLocation}
              onRowClick={onClickToDetails}
            />
          </div>
        </div>
      </div>
      <AdjustInventory />
      <Reject />
    </div>
  );
}

// function TabLocations(props) {
//   return (
//     <>
//       <nav>
//         <div class="nav nav-tabs" id="nav-tab" role="tablist">
//           <button
//             // class="nav-link active"
//             class="nav-link"
//             id="nav-home-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#nav-home"
//             type="button"
//             role="tab"
//             aria-controls="nav-home"
//             aria-selected="true"
//           >
//             Home
//           </button>
//         </div>
//       </nav>
//       <div class="tab-content" id="nav-tabContent">
//         <div
//           class="tab-pane fade show active"
//           id="nav-home"
//           role="tabpanel"
//           aria-labelledby="nav-home-tab"
//         >
//           ...
//         </div>
//       </div>
//     </>
//   );
// }

// function ComponentsDetailsVariants(props) {
//   return (
//     <>
//       {props.dataAtrribute.map((element, index) => (
//         <div className="wrapper-content shadow mt-3">
//           <h4 className="id-color">
//             <span>{}</span>
//           </h4>
//           <form>
//             <div class="mb-3">
//               <div class="row g-3 align-items-center">
//                 <div class="col">
//                   <label for="sku" class="col-form-label">
//                     SKU
//                   </label>{" "}
//                   <input
//                     id={index}
//                     type="text"
//                     class="form-control"
//                     placeholder="Write product name here"
//                     name="sku"
//                     value={element.sku}
//                     onChange={props.onChangeValue}
//                   />
//                 </div>
//                 <div class="col">
//                   <label for="barcode" class="col-form-label">
//                     Barcode (optional)
//                   </label>{" "}
//                   <input
//                     id={index}
//                     name="barcode"
//                     value={element.barcode}
//                     onChange={props.onChangeValue}
//                     type="tel"

//                     class="form-control"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div class="mb-3">
//               <div class="row g-3 align-items-center">
//                 <div class="col">
//                   <label for="salesprice" class="col-form-label">
//                     Sales price
//                   </label>{" "}
//                   <input
//                     id={index}
//                     type="number"
//                     class="form-control"
//                     name="salesprice"
//                     value={element.salesprice}
//                     onChange={props.onChangeValue}
//                   />
//                 </div>
//                 <div class="col">
//                   <label for="barcode" class="col-form-label">
//                     Quantity
//                   </label>{" "}
//                   <input
//                     id={index}
//                     name="quantity"
//                     type="number"
//                     class="form-control"
//                     value={element.quantity}
//                     onChange={props.onChangeValue}
//                   />
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       ))}
//     </>
//   );
// }
