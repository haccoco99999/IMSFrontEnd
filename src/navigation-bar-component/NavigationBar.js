import React from "react";
import "./navigation-bar.css";

export default function NavigationBar(props) {
  return (







    <nav class="navbar  sticky-top navbar-light shadow  bg-white">
      <div class="container-fluid">

        <div className="card border-0" >
          <div className="card-body">
            <div className="card-subtitle mb-2 text-muted">
              <nav style={{ "--bs-breadcrumb-divider": `'>'` }} aria-label="breadcrumb">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
              </nav>
              {/* <h3 onClick={props.actionGoBack}>&lt;</h3> */}
              <h3 className="m-0">{props.titleBar}</h3>
  
              <span>{props.status}</span>
            </div>

          </div>
          {/* <h3 onClick={props.actionGoBack}>&lt;</h3>
          <div className="container-title-bar">
            <h3 >{props.titleBar}</h3>
            <span>{props.status}</span>
          </div> */}
        </div>
        <form class="d-flex">
          {props.listButton.map((button) => {
            let classButton = button.class == null ? "btn-primary" : button.class;
            if (button.isShow == false) {
              return "";
            } else {
              return (
                <button
                  onClick={button.action}
                  type="button"
                  style={button.style}
                  class={"navigation-bar-right-button btn " + classButton}
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

// const listButton = [
//     {
//         title: "Cancel",
//         action:() => this.cancelClick(),
//         style:{
//             background: "red"
//         }
//     },
//     {
//         title: "Confirm",
//         action: () => this.confirmClick(),
//         style:{
//             background: "blue"
//         }
//     }
// ]

{
  /* <NavigationBar actionGoBack={() => this.goBackClick()}
        listButton={listButton}
        /> */
}
