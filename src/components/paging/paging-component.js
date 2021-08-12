import React from "react";

export default function PagingComponent(props) {
  return (
    <div className="row">

      <nav aria-label="Page navigation example">



        <div class="d-flex  mb-3">
          <div class=" p-2 ">
            <select value={props.sizePerPage} onChange={props.setSizePage} class="form-select pointer col-auto justify-content-start" aria-label="Default select example">

              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
            </select>

          </div>
          <div class="p-2 ">
            Show {props.currentPage} to {props.sizePerPage} of {props.rowCountTotal} entries

          </div>

          <div class=" ms-auto p-2 ">
            <ul className="pagination ">
              {props.currentPage === 1 ? (
                <li class="  page-item disabled">
                  <span class="page-link">Previous</span>
                </li>
              ) : (
                <li className="pointer page-item">
                  <a className="page-link"  onClick={props.backPagingClick}>
                    Previous
                  </a>
                </li>
              )}
              <li className="page-item">
                <span class="page-link">{props.currentPage}</span>
              </li>
              {props.currentPage === props.pageCount ? (
                <li class="  page-item disabled">
                  <span class="page-link">Next</span>
                </li>
              ) : (
                <li className=" pointer page-item">
                  <a className="page-link"  onClick={props.nextPagingClick}>
                    Next
                  </a>
                </li>
              )}
            </ul>

          </div>
        </div>



      </nav>
    </div>
  );
}
