import React, { useState, useEffect } from "react";
import './dashboard.css'
export default function DashboardComponent() {


  const CardItem = () => {
    return (
      <div class="card shadow p-2 bg-body rounded">
        <div class="row flex-nowrap align-items-center">
          <div className="col-md-1">
            <i class="bi bi-window"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8" />
            </svg>
          </div>
          <div className="col-md-7" >
            <p class="fw-bold mb-0">QUantyt</p>
            <span className="text-muted fw-lighter">365161</span>
          </div>
          <div className="col-md-4 align-middle">

            <table className="h-100">
              <tbody>
                <tr>

                  <td class="align-middle fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg></td>

                </tr>
              </tbody>
            </table>



          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="home_content">
      <div className="text">
        {/* ############################ */}
        {/* <div className="row d-flex align-items-center">
          
          <div className="col-md-3 ">
          <CardItem/>
          </div>
          <div className="col-md-3 ">
          <CardItem/>
          </div>
          <div className="col-md-3 ">
          <CardItem/>
          </div>
          <div className="col-md-3 ">
          <CardItem/>
          </div>

        </div> */}
        <div class="d-grid gap-2">
          <div className="p-3">
            <div class="row">
              <div class="col-md-3">
                <div class="card-counter primary  shadow  rounded">
                  <i class="bi bi-box-seam"></i>
                  <span class="count-numbers">12</span>
                  <span class="count-name">Flowz</span>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card-counter danger shadow  rounded">
                  <i class="bi bi-box-seam"></i>
                  <span class="count-numbers">599</span>
                  <span class="count-name">Instances</span>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card-counter success shadow  rounded">
                  <i class="bi bi-box-seam"></i>
                  <span class="count-numbers">6875</span>
                  <span class="count-name">Data</span>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card-counter info shadow  rounded">
                  <i class="bi bi-box-seam"></i>
                  <span class="count-numbers">35</span>
                  <span class="count-name">Users</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="card bg-transparent border-0 " >
              <div className="card-body bg-transparent " style={{ height: "1200px" }}>
                <iframe className="h-100 w-100" ng-if="reportViewCtrl.isReportEmbedding()"
                  src="https://datastudio.google.com/embed/reporting/fbfb7534-6e92-409b-9c97-5abcba98a937/page/rCUUC"
                  frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* ################################# */}
      </div>
    </div>
  );
}

