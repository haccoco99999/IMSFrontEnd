import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createRole, getRoldeDetail, updateRoleDetail } from './action'
import "../../accountmanager.css";



export default function DetailRole() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();
  console.log(location.state.roleId)
  const { token, detailRolePermission } = useSelector(state => ({
    token: state.client.token,
    detailRolePermission: state.DetailRolePermission
  }))

  const permissions = [
    { name: "Create", isChecked: false },
    { name: "Read", isChecked: false },
    { name: "Update", isChecked: false },
    { name: "Delete", isChecked: false },
    { name: "Approve", isChecked: false },
    { name: "Reject", isChecked: false }
  ]
  const pagePermissions = [
    {
      isCheck: false,

      name: "StockTakeOrder",
      listPermission: [
        ...permissions
      ],
    }, {
      isCheck: false,

      name: "GoodsIssue",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "UserDetail",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "RolePermissionUpdate",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Product",

      listPermission: [
        ...permissions
      ]
    },
    {

      isCheck: false,

      name: "PriceQuoteOrder",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "PurchaseOrder",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Requisition",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Supplier",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "GoodsReceipt",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Transaction",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Registration",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Category",
      listPermission: [
        ...permissions
      ]
    },
    {
      isCheck: false,

      name: "Report",
      listPermission: [
        ...permissions
      ]
    },
  ]


  const [listPermissionState, setListPermissionState] = useState(detailRolePermission.detailRole.pagePermissions)

  const handleChangePermissionAll = (event) => {

    setListPermissionState([...listPermissionState.map((item) => item.name === event.target.name ?
      {
        ...item, isCheck: event.target.checked,
        listPermission: item.listPermission.map(permission => ({ ...permission, isChecked: event.target.checked }))
      }


      : item)])


  };

  const handleChangePermission = (event, parentName, index) => {

    let temp = [...listPermissionState.map((item) => item.name === parentName ?
      {
        ...item,
        listPermission: item.listPermission.map(permission => permission.name === event.target.name ? { ...permission, isChecked: event.target.checked } : permission)
      }
      : item)]

    //Check all
    let isCheckedParent = false
    temp[index].listPermission.forEach(permission => {
      if (permission.isChecked) {
        isCheckedParent = true
      }

    })
    temp[index].isCheck = isCheckedParent
    setListPermissionState([
      ...temp]
    )


  };
  console.log(listPermissionState)
  const [infoRole, setInfoRole] = useState({
    roleId: "",
    roleName: ""
  })




  useEffect(() => {
    dispatch(getRoldeDetail({ roleId: location.state.roleId, token: token }))
  }, [])

  useEffect(() => {
    setListPermissionState(
      detailRolePermission.detailRole.pagePermissions
    )
    setInfoRole({
      roleId: detailRolePermission.detailRole.roleId,
      roleName: detailRolePermission.detailRole.roleName
    })
  }, [detailRolePermission])

  function goBackClick() {
    history.goBack();
  }



  function onSaveClick() {
    let cleanPermission = {}
    
    listPermissionState.forEach(item => {
      if (item.isCheck) {
        let listPermission = []
        item.listPermission.map(permission => {

          if (permission.isChecked) {
            listPermission.push(permission.name)
          }
        })
        cleanPermission[item.name]= listPermission
      }
    })
    const data = {
      roleId: infoRole.roleId,
      roleName: infoRole.roleName,
      pageClaimDictionary: cleanPermission
    }
    // console.log(data)
    dispatch(updateRoleDetail({ data: data, token: token }))
  }
  // const nodes = [{
  //   value: 'mars',
  //   label: 'Mars',
  //   children: [
  //     { value: 'phobos', label: 'Phobos' },
  //     { value: 'deimos', label: 'Deimos' },
  //   ],
  // }];

  // function checkRolePermission(permissionPage, permission) {

  //   if (listPermissionState[permissionPage] !== undefined) {
  //     if (permission !== undefined) {
  //       return listPermissionState[permissionPage].includes(permission)
  //     }
  //     else {
  //       return true
  //     }
  //   }
  //   return false
  // }
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
                  onChange={(e) => setInfoRole(state => ({ ...state, [e.target.name]: e.target.value }))}
                  type="text"
                  class="form-control"
                  placeholder="Name of role"
                  value={infoRole.roleName}
                  name="roleName"
                />
              </div>
            </div>

          </form>
        </div>

        {/* content 2 */}
        <div className="wrapper-content shadow mt-3">
          {/* check1 */}
          {listPermissionState.map((items, index) => {
            return (
              <div>
                <div class="form-check" >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name={items.name}
                    checked={items.isCheck}

                    onChange={e => handleChangePermissionAll(e)}
                  // checked={formData["productPermission"] || false}
                  />
                  <label class="form-check-label" data-bs-toggle="collapse"
                  data-bs-target={"#collapsediv" + index}>{items.name}</label>
                </div>
                <div id={"collapsediv" + index} class="collapse">
                  {items.listPermission.map((childItem, idx) => {

                    return (
                      <div class="d-flex justify-content-center">
                        {/* {console.log(checkRolePermission(items[0], childItem))} */}
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name={childItem.name}
                          checked={childItem.isChecked}
                          // checked={checkRolePermission(items[0], childItem)}
                          onChange={e => handleChangePermission(e, items.name, index)}
                        />
                        <label class="form-check-label">{childItem.name}</label>

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