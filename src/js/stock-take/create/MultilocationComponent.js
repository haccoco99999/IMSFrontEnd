import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

//css
import '../stocktake.css'
//components
import ListLocationsModal from "./search-location-modal";
import { getAllLocationsAction, getListPackageAction,createStocktkaeAction } from "./action";
import SpinnerComponent from "../components/spinner-component";
import ToastComponent from "../components/toast-component";

export default function MultilocationComponent(props) {
    let history = useHistory();
    let dispatch = useDispatch();

    return (
        <div>
            
        </div>
    )
}
