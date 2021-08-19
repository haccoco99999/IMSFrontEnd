import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "./notification-component.css";
//components
import { getAllLocationsAction } from "./action";
import { useHistory } from "react-router-dom";
import moment from "moment";

export default function NotificationBellComponents(props) {
  let dispatch = useDispatch();
  const { token, listNotificationStore, userRole } = useSelector((state) => ({
    token: state.client.token,
    userRole: state.client.userRole,
    listNotificationStore: state.notificationReducer.listNotifications,
  }));
  const history = useHistory()
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token, userRole: userRole }));
  }, []);
  function redirectDetail(notification) {
    let url = ""
    if (notification.type === "PriceQuoteOrder" || notification.type === "PurchaseOrder" || notification.type === "Requisition") {
      history.push('/homepage/purchase')
      setTimeout(() => {
        history.push(`/homepage/purchase/PriceQuote`, { orderId: notification.typeID, status: "" });
      });
    }
    else if (notification.type === "GoodsReceipt") {
      history.push('/homepage/good-receipt')
      setTimeout(() => {
        history.push("/homepage/good-receipt/details", {
          goodsreceiptId: notification.typeID,
          fromPage: "ManagerPage",
        });
      });
    }
    else if (notification.type === "StockTakeOrder") {
      history.push('/homepage/stock-take')
      setTimeout(() => {
        history.push("/homepage/stock-take/details", {
          stocktakeId: notification.typeID,
        });
      });
    }
    else if (notification.type === "GoodsIssue") {
      history.push('/homepage/good-issue')
      setTimeout(() => {
        history.push("/homepage/good-issue/detail", { id: notification.typeID, status: "" })
      });
    }

  }
  console.log(listNotificationStore)
  return (
    <ul class="dropdown-menu notification">
      <div class="notification-heading bg-light text-center"><p class="menu-title">Notifications</p>
      </div>
      <div className="notifications-wrapper">
        {listNotificationStore.map((notification, index) => {
          var stringCheckTime = notification.message.split("at:");
          var newMessage =
            stringCheckTime[0] +
            "at:" +
            moment(stringCheckTime[1]).add(7, "h").format("DD/MM/YYYY HH:mm");
          return (
            <li key={index} onClick={() => redirectDetail(notification)} key={notification.id} class=" list-group-item d-flex justify-content-between align-items-center">

              <span class="lh-1" >
                {newMessage}

              </span>


            </li>
          )
        })}
      </div>

      <div class="notification-footer bg-light fixed-bottom text-center"><p onClick={() => history.replace("/homepage/notification")} class=" menu-title">View all</p></div>

    </ul>
  );
}
