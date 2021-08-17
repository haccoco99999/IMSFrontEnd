import React, { useState } from 'react'
// import { Timeline, Bookmark , Marker} from 'react-vertical-timeline';
import './progress-bar.css'
export function ProgressBar(props) {
  const [state, setState] = useState({ progress: 50 })
  const listDone = [
    { name: "Create", status: "done" },
    { name: "Preview", status: "done" },
    { name: "Sent", status: "done" },
    { name: "Confirm", status: "done" },
    { name: "Goods Receipt", status: "done" },
    { name: "Done", status: "done" }
  ]
  return (
    <ul class="events m-0 p-0">
      {listDone.map(item => (
        <li>
          <time className={item.status} ></time>
          <span className={item.status}>{item.name}</span></li>


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
  return (
    <ul class="progressbar">
  <li class="complete">Step 1</li>
  <li class="complete">Step 2</li>
  <li class="active">Step 3</li>
  <li>Step 4</li>
  <li>Step 5</li>
</ul>
  )
}