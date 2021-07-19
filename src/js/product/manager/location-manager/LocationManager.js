import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
//css
import "../../product.css";
//components
import Table from "react-bootstrap-table-next";

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
