import React from "react";
import "./navbar.css";
export default function NavigationBar(props) {
  return (
    <nav class="navbar py-0 mb-4 sticky-top navbar-light shadow  bg-white">
      <div class="container-fluid">
        <div className="card border-0">
          <div className="card-body p-0">
            <div className="card-subtitle mb-2 text-muted">
              <nav
                style={{ "--bs-breadcrumb-divider": `'>'` }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb m-0 mt-2">
                  <li className="me-3">
                    <div className="text-dark " onClick={props.actionGoBack}>
                      <i className="bi bi-arrow-left fw-bold icon-size"></i>
                    </div>
                  </li>
                  <li
                    class="breadcrumb-item active text-dark"
                    aria-current="page"
                  >
                    {props.home}
                  </li>
                  <li
                    class="breadcrumb-item active text-dark"
                    aria-current="page"
                  >
                    {props.currentPage}
                  </li>
                  {props.level3 && (
                    <li
                      className="breadcrumb-item active text-dark"
                      aria-current="page"
                    >
                      {props.level3Page}
                    </li>
                  )}

                  {props.level4 && (
                    <li
                      className="breadcrumb-item active text-dark"
                      aria-current="page"
                    >
                      {props.level4Page}
                    </li>
                  )}
                </ol>
              </nav>
              <div className="d-sm-flex align-items-sm-center ">
                <h3 className="ms-0 title-bar-color ">{props.titleBar}</h3>

                <h5>
                  <span className={"badge ms-3 " + props.classStatus}>
                    {props.status}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <form class="d-flex">
          {props.listButton.map((button) => {
            // let classButton =
            //   button.class == null ? "btn-primary" : button.class;
            if (button.isShow == false) {
              return "";
            } else {
              return (
                <button
                  onClick={button.action}
                  type={button.type || "button"}
                  style={button.style}
                  class={"navigation-bar-right-button btn " + button.class}
                  disabled={button.disabled || false}
                  form={button.form}
                >
                  {button.title}
                </button>
              );
            }
          })}
        </form>
      </div>
    </nav>
  );
}
