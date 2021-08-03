import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "./notification-component.css";
//components
import { getAllLocationsAction } from "./action";
import { useHistory } from "react-router-dom";
export default function NotificationBellComponents(props) {
  let dispatch = useDispatch();
  const { token, listNotificationStore } = useSelector((state) => ({
    token: state.client.token,
    listNotificationStore: state.notificationReducer.listNotifications,
  }));
  const history = useHistory()
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);
  function redirectDetail(notification){
    history.push('/homepage/purchase')
   
    history.replace("/homepage/purchase/PriceQuote", { orderId: notification.typeID, status: "" });
  }
  console.log(listNotificationStore)
  return (
    <ul class="dropdown-menu notification">
      <div class="notification-heading bg-light text-center"><p class="menu-title">Notifications</p>
      </div>
      <div className="notifications-wrapper">
      {listNotificationStore.map((notification) => (
        
        <li onClick={()=> redirectDetail(notification)} key={notification.id} class=" list-group-item d-flex justify-content-between align-items-center">
       
          <span class="d-inline-block text-truncate" >
            {notification.message}

          </span>

          <span class="badge bg-primary rounded-pill">14</span>
        </li>

      ))}
      </div>
      
      <div class="notification-footer bg-light fixed-bottom text-center"><p class="menu-title">View all</p></div>

    </ul>
  );
}
