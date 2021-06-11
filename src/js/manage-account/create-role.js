import React, { Component } from 'react'

export default class AddNewRole extends Component {
    render() {
        return (
            <div>
            <div class="d-flex mb-3 justify-content-end ">
              <button class="btn btn-default me-auto role-manager--btnback ">
                {" "}
                Back{" "}
              </button>
              <button class="btn btn-primary">Save</button>
            </div>
            <h2>Role</h2>
    
            <div>
              <form>
                <div class="d-flex  justify-content-center">
                  <div class="flex-fill">
                    <label for="exampleFormControlInput1" class="form-label">
                      Name
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div class="ml-3 flex-fill">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Note
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                {/* check1 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsediv1"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Product
                  </label>
                </div>
                <div id="collapsediv1" class="collapse">
                  <div class="d-flex justify-content-center">
                    <div class="form-check d-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="test1"
                      />
                      <label class="form-check-label" for="test1">
                        View product
                      </label>
                    </div>
    
                    <div class="form-check d-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="test2"
                      />
                      <label class="form-check-label" for="flexCheckDefatest2ult">
                        Create new product
                      </label>
                    </div>
                    <div class="form-check d-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="test2"
                      />
                      <label class="form-check-label" for="flexCheckDefatest2ult">
                        Update product
                      </label>
                    </div>
                  </div>
    
                  <div class="d-flex justify-content-center">
                    <div class="form-check d-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="test1"
                      />
                      <label class="form-check-label" for="test1">
                        Delete product
                      </label>
                    </div>
    
                    <div class="form-check d-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="test2"
                      />
                      <label class="form-check-label" for="flexCheckDefatest2ult">
                        Print product
                      </label>
                    </div>
    
                    {/*empty*/}
                    <div class=" d-inline"></div>
                  </div>
                </div>
    
                {/* check2 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsediv2"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Purchase requisition
                  </label>
                </div>
                <div id="collapsediv2" class="collapse">
                  <div class="container overflow-hidden">
                    <div class="row gx-5">
                      <div class="col">
                        <div class="p-1 border bg-light">
                          <div class="form-check ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="test1"
                            />
                            <label class="form-check-label" for="test1">
                              View purchase requisition
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-1 border bg-light">
                          {" "}
                          <div class="form-check ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="test1"
                            />
                            <label class="form-check-label" for="test1">
                              Create purchase requisition
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-1 border bg-light">
                          {" "}
                          <div class="form-check ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="test1"
                            />
                            <label class="form-check-label" for="test1">
                              Update purchase requisition
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div class="container overflow-hidden">
                    <div class="row gx-5">
                      <div class="col">
                        <div class="p-1 border bg-light">
                          <div class="form-check ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="test1"
                            />
                            <label class="form-check-label" for="test1">
                              Delete purchase requisition
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-1 border bg-light">
                          {" "}
                          <div class="form-check ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="test1"
                            />
                            <label class="form-check-label" for="test1">
                              Print purchase requisition
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="p-1 border bg-light">ffsdfsfsad</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* check 3 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Purchase order
                  </label>
                </div>
                {/* check 4 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label class="form-check-label" for="flexCheckChecked">
                    Purchase receipt
                  </label>
                </div>
                {/* check 5 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Goods issue
                  </label>
                </div>
                {/* check 6 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Stock take
                  </label>
                </div>
                {/* check 7 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Supplier
                  </label>
                </div>
                {/* check 8 */}
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Report
                  </label>
                </div>
              </form>
            </div>
          </div>
        )
    }
}
