import React, { useState } from 'react'
// import { Timeline, Bookmark , Marker} from 'react-vertical-timeline';
import './progress-bar.css'
export function ProgressBar(props) {
    const [state, setState] = useState({progress: 50} )
    return (
        <ul class="events">
        <li>
          <time datetime="10:03">10:03</time> 
          <span><strong>Bat &amp; Ball</strong> On time</span></li>
          
        <li>
          <time datetime="10:03">10:03</time> 
          <span><strong>Bat &amp; Ball</strong> On time</span></li>
        
        <li>
          <time datetime="10:03">10:03</time> 
          <span><strong>Bat &amp; Ball</strong> On time and other text that may span over 2 lines</span></li>
        
        <li>
          <time datetime="10:03">10:03</time> 
          <span className="current"><strong>Bat &amp; Ball</strong> On time</span></li>
        
        <li>
          <time datetime="10:03">10:03</time> 
          <span><strong>Bat &amp; Ball</strong> On time</span></li>
        
        <li>
          <time datetime="10:03">10:03</time> 
          <span><strong>Bat &amp; Ball</strong> On time</span></li>
      </ul>



        // <Steps current={1} vertical style={styles}>
        //     <Steps.Item title="Finished" description="Description" />
        //     <Steps.Item title="In Progress" description="Description" />
        //     <Steps.Item title="Waiting" description="Description" />
        //     <Steps.Item title="Waiting" description="Description" />
        // </Steps>
    );
}