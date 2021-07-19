import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../../product.css";
//components


export default function LocationManager() {
  const columns = [
    {
      dataField: "id",
      text: " ID",
    },
    {
      dataField: "locationName",
      text: "Location Name",
    },
    {
      dataField: "locationBarcode",
      text: "Location Barcode",
    },
  ];
  return (
    <>
    
      <div className="wrapper-content shadow"></div>
    </>
  );
}
