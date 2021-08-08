import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
//css
import "./notification-component.css";
//components
import { getAllLocationsAction } from "./action";
export default function NotificationBellComponents(props) {
  let dispatch = useDispatch();
  const { token, listNotificationStore, userRole } = useSelector((state) => ({
    token: state.client.token,
    userRole: state.client.userRole,
    listNotificationStore: state.notificationReducer.listNotifications,
  }));

  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token, userRole: userRole }));
  }, []);
  return (
    <div className={"notification-bell notification-" + props.active}>
      <div className="header-notification">
        <p>List notifications</p>
      </div>
      <div className="list-notification">
        <ul>
          {listNotificationStore.map((notification) => {
            var stringCheckTime = notification.message.split("at:");
            var newMessage =
              stringCheckTime[0] +
              "at:" +
              moment(stringCheckTime[1]).add(7, "h").format("DD/MM/YYYY HH:mm");

            return (
              <li key={notification.id}>
                <div>
                  <span>{newMessage}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="footer-notification">
        <p>Show All</p>
      </div>{" "}
    </div>
  );
}
