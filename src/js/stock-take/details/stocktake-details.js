import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap-table-next";
//css
import "../stocktake.css";
//components
import AdjustInventory from "../components/adjust-component";
// import Reject from "./reject";
import { getDetailsStockTakeAction, submitAction } from "./action";
// import Table from "../../table-receipt/ListReceiptsTable";
// import NavigationBar from "../../navigation-bar-component/NavigationBar";
import NavigationBar from "../components/navbar-component";
export default function StocktakeDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const [cleanJsonListLocation, setCleanJsonListLocation] = useState([]);

  const { token, groupLocationStore, stocktakeDetailsStore, messages } =
    useSelector((state) => ({
      token: state.client.token,
      groupLocationStore:
        state.getDetailsStocktakeReducer.stocktake.groupLocations,
      stocktakeDetailsStore: state.getDetailsStocktakeReducer.stocktake,
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

  //TODO: Declare bootstrap-tabble
  const columns = [
    {
      datafield: "packageId",
      text: "Package Id",
    },
    {
      datafield: "productVariantId",
      text: "Variant ID",
    },
    {
      dataField: "quantity",
      text: "Quantity",
    },
    {
      dataField: "actualQuantity",
      text: "Counted",
    },
  ];

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

  function clickTest() {
    console.log("Test");
  }
  const listButton = setListButtonNav(location.state.stocktakeStatus);

  function setListButtonNav(status) {
    if (status === "Progressing") {
      return [
        {
          isShow: true,
          title: "Reject",
          action: () => clickTest(),
          class: "btn-primary ",
          // style: {},
        },

        {
          isShow: true,
          title: "Create good issue",
          action: () => clickTest(),
          class: "btn-danger",
          // style: {},
        },
      ];
    } else if (status === "AwaitingAdjustment") {
      return [
        {
          isShow: true,
          title: "Reject",
          action: () => clickTest(),
          class: "btn-danger",
          // style: {},
        },

        {
          isShow: true,
          title: "Create good issue",
          action: () => clickTest(),
          class: "btn-warning text-white",
          // style: {},
        },
      ];
    } else {
      return [];
    }
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

  console.log(location.state.stocktakeStatus);
  useEffect(() => {
    if (messages === "Submit success") console.log("Submit Success");
  }, [messages]);

  console.log(cleanJsonListLocation);
  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar={location.state.stocktakeId}
        actionGoBack={goBackClick}
        status={location.state.stocktakeStatus}
        // status={stocktakeDetailsStore.stockTakeOrderType}
      />
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}

      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}
          <div className="me-auto">
            <h2 className="id-color fw-bold">{stocktakeDetailsStore.id}</h2>
            <div className="form-text id-color">
              {stocktakeDetailsStore.stockTakeOrderType}
            </div>

            <div className="row g-3 justify-content-between me-3">
              <div className="col-4">
                <div className="form-text id-color">Created by:</div>
                <div className="form-text id-color">Created date:</div>
              </div>
              <div className="col-4">
                <div className="form-text id-color">Modified by:</div>
                <div className="form-text id-color">Modified date:</div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h2 className="id-color fw-bold">List Locations</h2>
            <div className="mt-3"></div>
          </div>
          <div className="mt-3">
            <Table 
            keyField="packageId"
            columns={columns}
            data={cleanJsonListLocation}
            noDataIndication="Table is Empty"
            />

            {/* <Table
              listHeaderEdit={listEditHeader}
              listColumn={listValueColumn}
              listData={cleanJsonListLocation}
              onRowClick={onClickToDetails}
            /> */}
          </div>
        </div>
      </div>

      <AdjustInventory />
      <Reject />
    </div>
  );
}

// <div className=" tab-fixed container-fluid  fixed-top">
//   <div className=" d-flex mb-3 justify-content-end mt-4 ">
//     <a className="me-2" onClick={goBackClick}>
//       <h3>Back</h3>
//     </a>
//     <div class="me-auto">
//       <h2 class="id-color fw-bold">{stocktakeDetailsStore.id}</h2>
//       <div class="form-text id-color">
//         {stocktakeDetailsStore.stockTakeOrderType}
//       </div>
//     </div>
//     <div>
//       {stocktakeDetailsStore.stockTakeOrderType === 0 && (
//         <>
//           <button className="btn btn-danger button-tab me-3 text-white">
//             Delete
//           </button>
//           <button
//             type="button"
//             // data-bs-target="#AdjustInventoryModal"
//             // data-bs-toggle="modal"
//             className="btn btn-primary button-tab--adjust me-3 text-white"
//             onClick={onSubmitClick}
//           >
//             Submit
//           </button>
//         </>
//       )}
//       {stocktakeDetailsStore.stockTakeOrderType === 1 && (
//         <>
//           <button
//             type="button"
//             data-bs-target="#RejectModal"
//             data-bs-toggle="modal"
//             className="btn btn-danger button-tab me-3 text-white"
//           >
//             Reject
//           </button>
//           <button
//             type="button"
//             data-bs-target="#AdjustInventoryModal"
//             data-bs-toggle="modal"
//             className="btn btn-primary button-tab--adjust me-3 text-white"
//           >
//             Adjust Inventory
//           </button>
//         </>
//       )}
//     </div>
//   </div>
// </div>
