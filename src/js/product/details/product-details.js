import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components

export default function ProductDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [isFromManagerPage, setIsFromManagerPage] = useState(true);

  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/product");
  }

  return (
    <>
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex  mb-3 justify-content-start mt-4 ">
          {isFromManagerPage ? (
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
          ) : (
            <a className="me-2" onClick={goToManagerPage}>
              <h3>Home Page</h3>
            </a>
          )}
        </div>
      </div>
       {/* content */}
       <div className="wrapper space-top"></div>
    </>
  );
}
