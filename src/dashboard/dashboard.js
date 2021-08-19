import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListDashBoard } from "./actions";
import './dashboard.css'
export default function DashboardComponent() {
  const { token, valueDashboardStore } = useSelector(state => ({
    token: state.client.token,
    valueDashboardStore: state.getValueDashboard
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListDashBoard({ token: token }))
  }, [])

  return (
    <div className="home_content">
        <div className="space-top-heading wrapper">
      {/* title  */}
      <div className="title-heading mt-2">
        <span>Dashboard</span>
      </div>
      <div class="d-grid">
        <div className="">
          <div class="container-fluid">




            <div class="row">


              <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Import Quantity</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"> {valueDashboardStore.dataDashBoard.importQuantity}</div>
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
                          Export Quantity</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"> {valueDashboardStore.dataDashBoard.exportQuantity}</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                          Sum Quantity Products</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"> {valueDashboardStore.dataDashBoard.sumInventoryCountThisMonth}</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                          Inventory Cost This Month</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">{valueDashboardStore.dataDashBoard.inventoryCostThisMonth} VNĐ</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                      <iframe width="100%" height="708" src="https://datastudio.google.com/embed/reporting/086f2a24-7b0a-4375-925c-163628389118/page/QdQXC" frameborder="0" allowfullscreen></iframe>
                    </div>
                  </div>
                </div>
              </div>


              <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">

                  <div
                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Top 5 sell this month</h6>
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
                      <table class="table">
                        <thead>
                          <tr>

                            <th scope="col">Product</th>
                            <th scope="col">Total Sold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {valueDashboardStore.dataDashBoard.top5SellingMonth.map(item => (
                            <tr>
                              {/* <th scope="row">3</th> */}
                              <td >{item.productName}</td>
                              <td>{item.totalSold}</td>
                            </tr>
                          ))}


                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
                <div class="card shadow mb-4">

                  <div
                    class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Top 5 sell this year</h6>
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
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Total Sold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {valueDashboardStore.dataDashBoard.top5SellingMonth.map(item => (
                            <tr>
                              {/* <th scope="row">3</th> */}
                              <td >{item.productName}</td>
                              <td>{item.totalSold}</td>
                            </tr>
                          ))}


                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>

            </div>




          </div>
        </div>
        {/* ################################# */}
      </div>
    </div>
    </div>
  );
}

