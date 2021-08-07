import React, { useState } from "react";


//css
import "../accountmanager.css";

//component
import AccountManager from "./account-manager/account-manager";
import RoleManager from "./role-manager/role-manager";
export default function Manager(props) {
  const [isChecked, setIsChecked] = useState(true);
  const [isAccountView, setIsAccountView] = useState(true);

  

  const onChangeValue = (event) => {
    if (event.target.value == "account") {
      setIsAccountView(true);
    } else {
      setIsAccountView(false);
    }
    // todo: giai quyet duplicate cua react
    // this.setState({ checked: !this.state.checked });
    setIsChecked(!isChecked);
  };

  
  
  return (
    <div className="space-top-heading">
      {/* title */}
    

      {/* content block */}
      <div className="wrapper-content shadow">
        {/* button options  */}
        <div className="d-flex justify-content-center" onChange={onChangeValue}>
          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="success-outlined"
            autocomplete="off"
            value="account"
            checked={isChecked}
          />
          <label
            class=" text-dark border-end-0 shadow btn btn-outline-warning button-options-products button-options--account border border-dark"
            for="success-outlined"
          >
            Account
          </label>

          <input
            type="radio"
            class="btn-check"
            name="choose-to-view"
            id="danger-outlined"
            autocomplete="off"
            value="role"
          />
          <label
            class=" text-dark border-start-0 shadow btn btn-outline-warning button-options-products button-options--role border border-dark"
            for="danger-outlined"
          >
            Role
          </label>
        </div>

        {isAccountView ? <AccountManager /> : <RoleManager />}
      </div>
    </div>
  );
}
