import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RoleManagerAction from "../../manager/role-manager/action";
import {CreateAccountAction} from "./action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function AddAccountModal() {
  let dispatch = useDispatch();
  let history = useHistory();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [categorySelected, setCategorySelected] = useState({});

  const handleChangeValue = (event) => {
    event.preventDefault();

    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  let { listRoles, token } = useSelector((state) => ({
    listRoles: state.getAllRoleReducer.listRoles,
    token: state.client.token,
  }));

  const handleChangeCategory = (e) => {
    // event.preventDefault();
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];

    // console.log(event.target.id);
    setCategorySelected({
      id: el.getAttribute("id"),
      name: el.getAttribute("value"),
    });
    console.log(categorySelected);
  };

  function onSaveClick(event) {
    const data = {
      username: formData.fullname,
      password: "test@12345Abc",
      email: formData.email,
      roleName: categorySelected.name,
      fullName: formData.fullname,
      phoneNumber: formData.phone,
      address: formData.address,
      dateOfBirth: "2021-06-26T19:13:19.555Z",
    };
    // dispatch(CreateAccountAction({data:data, token: token }));
    // console.log('Hello')
  }

  useEffect(() => {
    dispatch(
      RoleManagerAction({
        currentPage: 0,
        sizePerPage: 0,
        token: token,
      })
    );
  }, []);

  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="AddAccountModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body addaccountmodal-body">
              <form>
                <div class="mb-3">
                  <label for="email" class="col-form-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="mb-3">
                  <label for="full-name" class="col-form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="fullname"
                    value={formData.fullname || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="mb-3">
                  <label for="phone-no" class="col-form-label">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="col-form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Role
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                    defaultValue=""
                    onChange={handleChangeCategory}
                  >
                    <option value="" disabled>
                      -- No Selected --
                    </option>

                    {listRoles.map((role) => (
                      <option id={role.id} value={role.name}>
                        {role.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default addaccountmodal-done "
                onClick={onSaveClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAccountModal;
