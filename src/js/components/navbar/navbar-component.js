import React from "react";

export default function NavigationBar(props) {
  return (
    <div className="navigation-bar">
      <div className="navigation-bar-left">
        <h3 onClick={props.actionGoBack}>&lt;</h3>
        <div className="container-title-bar">
          <h3>{props.titleBar}</h3>
          <span>{props.status}</span>
        </div>
      </div>
      {/* <div className="navigation-bar-left">
          <div className="container-title-bar">
            <h3 onClick={props.actionGoBack}>&lt;</h3>
            <h3>{props.titleBar}</h3>
            <div class="form-text">{props.status}</div>
          </div>
        </div> */}
      <div className="navigation-bar-right">
        {props.listButton.map((button) => {
          //   let classButton = button.class == null ? "btn-primary" : button.class;
          if (button.isShow == false) {
            return "";
          } else {
            return (
              <button
                onClick={button.action}
                type="button"
                style={button.style}
                class={"navigation-bar-right-button btn " + button.class}
                disabled={button.disabled || false}
              >
                {button.title}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
}
