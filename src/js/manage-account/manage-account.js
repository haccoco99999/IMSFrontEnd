import React from 'react'
import AccountManagerContent from "./AccountManagerContent";

import "./accountmanager.css";
export default function () {
  return (
    <div className="home_content manager-background">
      <div className="text">
        {/* ############################ */}

        
          <h1>Account Manager</h1>
          <AccountManagerContent />
          {/* <RoleManager /> */}
        


        {/* ################################# */}
      </div>
    </div>
  );
}
