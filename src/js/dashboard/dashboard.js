import React from 'react'
import './dashboard.css'
export default function (){
    return (
        <div className="home_content">
        <div className="text">
          {/* ############################ */}
            <div className="container container-dashboard">
              <div className="row row-dashboard-4-items">
                <div className="col-sm-3">
                  <div className="item-top-dashboard"></div>
                </div>
                <div className="col-sm-3">
                <div className="item-top-dashboard"></div>
                </div>
                <div className="col-sm-3">
                <div className="item-top-dashboard"></div>
                </div>
                <div className="col-sm-3">
                <div className="item-top-dashboard"></div>
                </div>
              </div>
              <div className="row row-dashboard">
                <div className="col-sm-8">
                <iframe width="100%" height="450" src="https://datastudio.google.com/embed/reporting/fbfb7534-6e92-409b-9c97-5abcba98a937/page/T6TUC" frameborder="0" style={{border:0}} allowfullscreen></iframe>

                </div>
                <div className="col-sm-4">
                  <div className="dastboard-top" >
                    
                  </div>
                </div>
              </div>
              <div className="row row-dashboard">
                <div className="col-sm-8">
                {/* <iframe width="100%" height="450" src="https://datastudio.google.com/embed/reporting/a2c6d1a6-5077-4eae-9ee0-6cdfd426da5a/page/XCkRC" frameborder="0" style={{border:0}} allowfullscreen></iframe> */}

                </div>
                <div className="col-sm-4">
                  <div className="dastboard-top" >
                    
                  </div>
                </div>
              </div>
            </div>



          {/* ################################# */}
        </div>
      </div>
    );
}
