import React, { useState } from "react";
// import { Timeline, Bookmark , Marker} from 'react-vertical-timeline';
import "./progress-bar.css";
export function ProgressBar(props) {
  const [state, setState] = useState({ progress: 50 });
  const listDone = [
    { name: "Create", status: "done" },
    { name: "Preview", status: "done" },
    { name: "Sent", status: "done" },
    { name: "Confirm", status: "done" },
    { name: "Goods Receipt", status: "done" },
    { name: "Done", status: "done" },
  ];
  return (
    <ul class="events m-0 p-0">
      {listDone.map((item) => (
        <li>
          <time className={item.status}></time>
          <span className={item.status}>{item.name}</span>
        </li>
      ))}
    </ul>

    // <Steps current={1} vertical style={styles}>
    //     <Steps.Item title="Finished" description="Description" />
    //     <Steps.Item title="In Progress" description="Description" />
    //     <Steps.Item title="Waiting" description="Description" />
    //     <Steps.Item title="Waiting" description="Description" />
    // </Steps>
  );
}
export function ProgressBarNav(props) {
  const listDone = [
    { name: "Create", status: "" },
    { name: "Preview", status: "is-complete" },
    { name: "Sent", status: "is-complete" },
    { name: "Confirm", status: "is-complete" },
    { name: "Goods Receipt", status: "is-complete" },
    { name: "Done", status: "is-active" },
  ];
  return (
    <div className="progress-customize-container">
      <div class="progress-customize">
        <div class="progress-customize-track"></div>
        {listDone.map((item) => (
          <div id="step1" class={`progress-customize-step ${item.status}`}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressBarStocktake(props) {
  const listStep = [
    { name: "Create", status: "is-complete" },
    { name: "Progressing", status: "is-complete" },
    { name: "Validating", status: "is-complete" },
    { name: "Complete", status: "is-complete" },
  ];
  return (
    <div className="progress-customize-container">
      <div class="progress-customize">
        <div class="progress-customize-track"></div>
        {listStep.map((item, index) => {
          if (index === props.currentStep)
            return (
              <div id="step1" class={`progress-customize-step is-active`}>
                {item.name}
              </div>
            );
          else if (index > props.currentStep)
            return (
              <div id="step1" class={`progress-customize-step `}>
                {item.name}
              </div>
            );
          else
            return (
              <div id="step1" class={`progress-customize-step ${item.status}`}>
                {item.name}
              </div>
            );
        })}
      </div>
    </div>
  );
}

export function ProgressBarCreateProduct(props) {
  const listStep = [
    { name: "Product info", status: "is-complete" },
    {
      name: "Variant info",
      status: "is-complete",
    },
  ];

  return (
    <div className="progress-customize-container">
      <div class="progress-customize">
        <div class="progress-customize-track"></div>
        {listStep.map((item, index) => {
          if (index === props.currentStep)
            return (
              <div id="step1" class={`progress-customize-step is-active`}>
                {item.name}
              </div>
            );
          else if (index > props.currentStep)
            return (
              <div id="step1" class={`progress-customize-step `}>
                {item.name}
              </div>
            );
          else
            return (
              <div id="step1" class={`progress-customize-step ${item.status}`}>
                {item.name}
              </div>
            );
        })}
      </div>
    </div>
  );
}

export function ProgressBarPurchaseOrder(props){
  const listStep = [
    {value:"PurchaseOrder",name:"Created",status:"is-complete"},
    {value:"POWaitingConfirmation",name:"Waiting Confirm",status:"is-complete"},
    {value:"POConfirm",name:"Confirmed",status:"is-complete"},
    {value:"Done",name:"Done",status:"is-complete"},

]
  return (
    <div className="progress-customize-container">
      <div class="progress-customize">
        <div class="progress-customize-track"></div>
        {listStep.map((item, index) => {
          if (item.value === props.currentStep)
            return (
              <div id="step1" class={`progress-customize-step is-active`}>
                {item.name}
              </div>
            );
       
          else
            return (
              <div id="step1" class={`progress-customize-step ${item.status}`}>
                {item.name}
              </div>
            );
        })}
      </div>
    </div>
  );
}


