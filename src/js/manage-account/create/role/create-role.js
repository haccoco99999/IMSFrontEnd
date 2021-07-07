import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {createRole} from './action'
import "../../accountmanager.css";



export default function AddNewRole() {
  let history = useHistory();
  let dispatch = useDispatch();


  const [listPermissionState, setListPermissionState] = useState({})
  const token = useSelector(state => state.client.token)
  const handleChangePermission = (event, parentName) => {

    if (parentName === undefined) {
      if (event.target.checked === true) {
        setListPermissionState(state => ({
          ...state, [event.target.name]: []
        }))
      }
      else {

        setListPermissionState(prevState => {
          const state = { ...prevState };
          delete state[event.target.name]
          return state;
        })
      }
    }
    else {
      if (event.target.checked === true) {
        setListPermissionState(state => ({
          ...state, [parentName]: [...state[parentName], event.target.name]
        }))
      }
      else{
        setListPermissionState(state => ({
          ...state, [parentName]: state[parentName].filter(item => item !== event.target.name)
        }))
      }
    }
  };
  
  const [infoRole, setInfoRole] = useState({
    roleName:"",

    
  })
  console.log(listPermissionState)
  function goBackClick() {
    history.goBack();
  }

  function onSaveClick() {
    const data = {
      roleName: infoRole.roleName,
      pageClaimDictionary: listPermissionState
    }
   
    dispatch(createRole({data: data, token: token}))
  }
  // const nodes = [{
  //   value: 'mars',
  //   label: 'Mars',
  //   children: [
  //     { value: 'phobos', label: 'Phobos' },
  //     { value: 'deimos', label: 'Deimos' },
  //   ],
  // }];
  const permissions = [
    "Create",
    "Read",
    "Update",
    "Delete",
    "Approve",
    "Reject"
  ]
  const pagePermissions = Object.entries({
    StockTakeOrder: [
      ...permissions
    ],
    GoodsIssue: [
      ...permissions
    ],
    UserDetail: [
      ...permissions
    ],
    RolePermissionUpdate: [
      ...permissions
    ],
    Product: [
      ...permissions
    ],
    PriceQuoteOrder: [
      ...permissions
    ],
    PurchaseOrder: [
      ...permissions
    ],
    Requisition: [
      ...permissions
    ],
    Supplier: [
      ...permissions
    ],
    GoodsReceipt: [
      ...permissions
    ],
    Transaction: [
      ...permissions
    ],
    Registration: [
      ...permissions
    ],
    Category: [
      ...permissions
    ],
    Report: [
      ...permissions
    ],
  })
  // console.log(pagePermissions)
  // console.log(Object.assign({}, pagePermissions))




  return (
    <div className="home_content ">
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          {/* testing */}
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new Role</h2>
          <div>
            <button
              type="button"
              className="btn btn-primary button-tab me-3 text-white"
             onClick={onSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper space-top">
        {/* content 1 */}
        <div className="wrapper-content shadow">
          <div className="title-heading mt-2">
            <span>Role Details</span>
          </div>
          <form>
            <div class="d-flex  justify-content-center">
              <div class="flex-fill">
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  onChange={(e) => setInfoRole(state => ({ ...state, [e.target.name]: e.target.value}))}
                  type="text"
                  class="form-control"
                  placeholder="Name of role"
                  value={infoRole.roleName}
                  name="roleName"
                />
              </div>
            </div>
            <div class="d-flex  justify-content-center">
              <div class="flex-fill">
                <label for="exampleFormControlInput1" class="form-label">
                  Note
                </label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* content 2 */}
        <div className="wrapper-content shadow mt-3">
          {/* check1 */}
          {pagePermissions.map((items, index) => {
            return (
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={items[0]}
                    data-bs-toggle="collapse"
                    data-bs-target={"#collapsediv" + index}
                    onChange={e => handleChangePermission(e)}
                  // checked={formData["productPermission"] || false}
                  />
                  <label class="form-check-label">{items[0]}</label>
                </div>
                <div id={"collapsediv" + index} class="collapse">
                  {items[1].map((childItem, idx) => {
                    return (
                      <div class="d-flex justify-content-center">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name={childItem}
                          onChange={e => handleChangePermission(e, items[0])}
                        />
                        <label class="form-check-label">{childItem}</label>

                      </div>
                    )
                  })}


                </div>

              </div>
            )
          })}




        </div>
      </div>
    </div>
  );
}



function ComponentCheck() {

}