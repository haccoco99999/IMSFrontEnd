import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//css
import "./notification-component.css";
//components
import { getAllLocationsAction } from "./action";
export default function NotificationBellComponents() {
  let dispatch = useDispatch();
  const { token,listNotificationStore } = useSelector((state) => ({
     token: state.client.token,
      listNotificationStore: state.notificationReducer.listNotifications
    }));
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token }));
  }, []);
  return (
    <div className={"notification-bell notification-" + this.props.active}>
      <div className="header-notification">
        <p>List notifications</p>
      </div>
      <div className="list-notification">
        <ul>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
          <li>
            <img src="..\src\js\images\manufacture-2.png" />
            <div>
              <span>Good Issue by AKC</span> <p>Last:2/6/2020</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="footer-notification">
        {" "}
        <p>See all</p>
      </div>
    </div>
  );
}
