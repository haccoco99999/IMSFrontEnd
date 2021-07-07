import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
//css
import "../../product.css";
//components

export default function VariantManager() {
  let dispatch = useDispatch();
  let history = useHistory();

    const {token,listVariantsStore}  = useSelector((state)=>({
        token = state.token.client,
        // listVariantsStore=state
      }));


  return (
    <>
      <div className="wrapper-content shadow"></div>
    </>
  );
}
