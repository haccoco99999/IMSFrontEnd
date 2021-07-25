import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "./notification-component.css";
//components
import { getAllLocationsAction } from "./action";
export default function NotificationBellComponents(props) {
  let dispatch = useDispatch();
  const { token, listNotificationStore } = useSelector((state) => ({
    token: state.client.token,
    listNotificationStore: state.notificationReducer.listNotifications,
  }));
  
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);
  return (
    <div className={"notification-bell notification-" + props.active}>
      <div className="header-notification">
        <p>List notifications</p>
      </div>
      <div className="list-notification">
        <ul>
          {listNotificationStore.map((notification) => (
            <li key={notification.id}>
              {/* <img src="..\src\js\images\manufacture-2.png" /> */}
              <div>
                <span>{notification.message}</span>
                {/* <p>Last:2/6/2020</p> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-notification">
        <p>Show All</p>
      </div>{" "}
    </div>
  );
}
