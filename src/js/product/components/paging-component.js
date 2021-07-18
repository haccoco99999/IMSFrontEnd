import React from "react";

export default function PagingComponent(props) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        {props.currentPage === 1 ? (
          <li class="page-item disabled">
            <span class="page-link">Previous</span>
          </li>
        ) : (
          <li className="page-item">
            <a className="page-link" href="#" onClick={props.backPagingClick}>
              Previous
            </a>
          </li>
        )}
        <li className="page-item">
          <span class="page-link">{props.currentPage}</span>
        </li>
        {props.currentPage === props.pageCount ? (
          <li class="page-item disabled">
            <span class="page-link">Next</span>
          </li>
        ) : (
          <li className="page-item">
            <a className="page-link" href="#" onClick={props.nextPagingClick}>
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
