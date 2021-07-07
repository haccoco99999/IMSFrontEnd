import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "../../product.css";

//components
import NewCategory from "./create-new-category";
import { GetAllCategoryAction } from "./action";
import Table from "../../../table-receipt/ListReceiptsTable";

export default function () {
  let dispatch = useDispatch();

  const { list_Categories, token, pageCount } = useSelector((state) => ({
    list_Categories: state.getAllCategoriesReducer.listCategories,
    token: state.client.token,
    pageCount: state.getGoodsReceiptReducer.pageCount,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [listValueColumn, setListValueColumn] = useState({
    id: true,
    categoryName: true,
    categoryDescription: true,
  });

  const [listEditHeader, setListEditHeader] = useState({
    categoryName: "Name",
    categoryDescription: "Description",
  });

  function nextPagingClick() {
    console.log("forward");
    setCurrentPage(currentPage + 1);
  }
  function backPagingClick() {
    console.log("backWard");
    setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    dispatch(
      GetAllCategoryAction({
        currentPage: currentPage,
        sizePerPage: sizePerPage,
        token: token,
      })
    );
  }, [currentPage, sizePerPage]);

  return (
    <div>
      <NewCategory />
      <div className="ms-5">
        <a
          class="btn btn-default me-md-2 add"
          data-bs-target="#NewCategoryModal"
          data-bs-toggle="modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 20 20"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Create new Category
        </a>
      </div>

      <div className="mt-3">
        <Table
          listHeaderEdit={listEditHeader}
          listColumn={listValueColumn}
          listData={list_Categories}
          backPagingClick={backPagingClick}
          nextPagingClick={nextPagingClick}
          sizePerPage={sizePerPage}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}
