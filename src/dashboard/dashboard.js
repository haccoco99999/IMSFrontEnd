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
          <div class="container-fluid">

         
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>

           
            <div class="row">

        
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Earnings (Monthly)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Earnings (Annual)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                        </div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2">
                              <div class="progress-bar bg-info" role="progressbar"
                               style={{width: "50%"}}aria-valuenow="50" aria-valuemin="0"
                                aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Pending Requests</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="row">

             
              <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                 
                  <div
                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                    <div class="dropdown no-arrow">
                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div class="dropdown-header">Dropdown Header:</div>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
              
                  <div class="card-body">
                    <div class="chart-area">
                    <iframe width="100%" height="320" src="https://datastudio.google.com/embed/reporting/086f2a24-7b0a-4375-925c-163628389118/page/QdQXC" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>
                </div>
              </div>

            
              <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                 
                  <div
                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                    <div class="dropdown no-arrow">
                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div class="dropdown-header">Dropdown Header:</div>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
              
                  <div class="card-body">
                    <div class="chart-pie pt-4 pb-2">
                      <canvas id="myPieChart"></canvas>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>

        
            <div class="row">

          
              <div class="col-lg-6 mb-4">

          
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
                  </div>
                  <div class="card-body">
                    <h4 class="small font-weight-bold">Server Migration <span
                      class="float-right">20%</span></h4>
                    <div class="progress mb-4">
                      <div class="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h4 class="small font-weight-bold">Sales Tracking <span
                      class="float-right">40%</span></h4>
                    <div class="progress mb-4">
                      <div class="progress-bar bg-warning" role="progressbar" style={{width: "40%"}}
                        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h4 class="small font-weight-bold">Customer Database <span
                      class="float-right">60%</span></h4>
                    <div class="progress mb-4">
                      <div class="progress-bar" role="progressbar" style={{width: "60%"}}
                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h4 class="small font-weight-bold">Payout Details <span
                      class="float-right">80%</span></h4>
                    <div class="progress mb-4">
                      <div class="progress-bar bg-info" role="progressbar" style={{width: "80%"}}
                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h4 class="small font-weight-bold">Account Setup <span
                      class="float-right">Complete!</span></h4>
                    <div class="progress">
                      <div class="progress-bar bg-success" role="progressbar" style={{width: "100%"}}
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>

           
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-primary text-white shadow">
                      <div class="card-body">
                        Primary
                        <div class="text-white-50 small">#4e73df</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-success text-white shadow">
                      <div class="card-body">
                        Success
                        <div class="text-white-50 small">#1cc88a</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-info text-white shadow">
                      <div class="card-body">
                        Info
                        <div class="text-white-50 small">#36b9cc</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-warning text-white shadow">
                      <div class="card-body">
                        Warning
                        <div class="text-white-50 small">#f6c23e</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-danger text-white shadow">
                      <div class="card-body">
                        Danger
                        <div class="text-white-50 small">#e74a3b</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-secondary text-white shadow">
                      <div class="card-body">
                        Secondary
                        <div class="text-white-50 small">#858796</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-light text-black shadow">
                      <div class="card-body">
                        Light
                        <div class="text-black-50 small">#f8f9fc</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card bg-dark text-white shadow">
                      <div class="card-body">
                        Dark
                        <div class="text-white-50 small">#5a5c69</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="col-lg-6 mb-4">

           
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
                  </div>
                  <div class="card-body">
                    <div class="text-center">
                      <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}}
                        src="img/undraw_posting_photo.svg" alt="..."/>
                </div>
                      <p>Add some quality, svg illustrations to your project courtesy of <a
                        target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a
                        constantly updated collection of beautiful svg images that you can use
                        completely free and without attribution!</p>
                      <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                        unDraw &rarr;</a>
                    </div>
                  </div>

            
                  <div class="card shadow mb-4">
                    <div class="card-header py-3">
                      <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
                    </div>
                    <div class="card-body">
                      <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                        CSS bloat and poor page performance. Custom CSS classes are used to create
                        custom components and custom utility classes.</p>
                      <p class="mb-0">Before working with this theme, you should become familiar with the
                        Bootstrap framework, especially the utility classes.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          {/* ################################# */}
        </div>
      </div>
      );
}

