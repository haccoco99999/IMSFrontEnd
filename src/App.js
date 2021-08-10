import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import logo from "./images/Logo.png";
import userLogo from "./images/user-2.png";
import manufactureLogo from "./images/manufacture-2.png";
import productLogo from "./images/product-2.png";
import reportLogo from "./images/report-2.png";
import shelfLogo from "./images/shelf-2.png";
import boxLogo from "./images/box-2.png";
import importLogo from "./images/import-2.png";
import shoppingLogo from "./images/shopping-2.png";
import dashboardLogo from "./images/dashboard-2.png";

import ProfileClient from "./about-account/ProfileClient";
import AboutSoftware from "./about-software/about-software";
import Dashboard from "./dashboard/dashboard";
import Purchase from "./purchase-order/purchase-order";
import GoodReceipt from "./good-receipt/good-receipt";
import Issue from "./good-issue/good-issue";
import StockTake from "./stock-take/stock-take";
import Report from "./report/report";
import Product from "./product/product";
import Supplier from "./supplier/supplier";
import Notification from "./notification/notification";
import ManageAccount from "./manage-account/manage-account";
import SaleManPage from "./sale-man/sale-man";
import moment from "moment";
// import store from './store'
import { connect, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import NotificationBell from "./notification-component/notification-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLIENT_UNSET } from "./user/constants";
import { LOGOUT_REQUESTING } from "./login/constants";
function App(props) {
  const [eventPage, setEventPage] = useState({
    hide: "bx-menu",
    isShowing: "",
    active: "",
    status: true,
    statusSetting: false,
    statusBell: false,
  });
  const { client } = useSelector((state) => ({
    client: state.client,
  }));
  // console.log(client);
  function toggleAbout() {
    setEventPage({
      statusSetting: !eventPage.statusSetting,
    });
  }
  function toggleBell() {
    setEventPage({
      statusBell: !eventPage.statusBell,
    });
  }
  const history = useHistory();
  function toggleActive() {
    if (eventPage.status) {
      setEventPage({
        hide: "",
        isShowing: "bx-menu-alt-right",
        active: "active",
        status: !eventPage.status,
      });
    } else {
      setEventPage({
        hide: "bx-menu",
        isShowing: "",
        active: "",
        status: !eventPage.status,
      });
    }
  }
  const [hubConnection, setHubConnection] = useState();

  useEffect(() => {
    const createHubConnection = async () => {
      const hubConnection = new HubConnectionBuilder()

        .withUrl("https://imspublicapi.herokuapp.com/notiHub")
        .withAutomaticReconnect()
        .build();
      try {
        await hubConnection.start();

        /*
 CHANNEL: Role of user

*/

        //Receive notification all channel global
        hubConnection.on("NotificationMessage", (user, message) => {
          console.log("NotificationMessage", user, message);
        });

        //Receive notification from a specific channel:
        hubConnection.on("NotificationGroupMessage", (message) => {
          console.log("NotificationGroupMessage", message);
          var stringCheckTime = message.split("at:");
          var newMessage =
            stringCheckTime[0] +
            "at:" +
            moment(stringCheckTime[1]).add(7, "h").format("DD/MM/YYYY HH:mm");
          toast(newMessage, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });

        //Send a notification to all
        //SendMessage(string user, string message)
        hubConnection
          .invoke("SendMessage", "username", "message to be sent")
          .catch((err) => {
            console.log("Error invoking function: " + { err });
          });

        //Join a channel
        //CHANNEL = ROLE NAME
        hubConnection.invoke("JoinGroup", client.userRole).catch((err) => {
          console.log("Error invoking function: " + { err });
        });

        //Send a message to a channel
        //SendMessageToGroup(string groupName, string message)
        // hubConnection
        //   .invoke("SendMessageToGroup", "Manager", "message send to the group")
        //   .catch((err) => {
        //     alert(err);
        //     console.log("Error invoking function: " + { err });
        //   });

        //Receive a message if user is allowed to edit a page
        /* 
          Response message from Hub:
          True, Using resource: resourceId --> Allow user to use page
          False, Page already being used --> Block user from accessing page
        */
        hubConnection.on("ResourceChecker", (message) => {
          console.log("ResourceChecker", message);
        });

        //Call method when accessing a page
        //ConnectWithResource(string userId, string resourceId)
        /* 
          userId: Id of user in database
          pageId: PO47OLJXKJ | GR11TUG4IZ | GO0OCT3GD0 ...
        */
        // hubConnection
        //   .invoke("ConnectWithResource", "userId", "pageId")
        //   .catch((err) => {
        //     alert(err);
        //     console.log("Error while connecting to resource: " + { err });
        //   });

        //Call method when leaving a page
        // DisconnectFromResource(string userId, string resourceId)
        /* 
          userId: Id of user in database
          pageId: PO47OLJXKJ | GR11TUG4IZ | GO0OCT3GD0 ...
        */
        // hubConnection
        //   .invoke("DisconnectFromResource", "userId", "pageId")
        //   .catch((err) => {
        //     console.log("Error while disconnectiong from resource: " + { err });
        //   });
      } catch (err) {
        console.log("Error while establishing connection: " + { err });
      }
      setHubConnection(hubConnection);
    };
    createHubConnection();

    // return () => {};
  }, []);
  return (
    <div>
      {/* {eventPage.statusBell ? (
        <NotificationBell active={eventPage.active} />
      ) : null} */}

      <div className={"sidebar " + eventPage.active}>
        <div
          data-bs-toggle="collapse"
          data-bs-toggleActive="collapse"
          className={"logo_content btn hide-" + eventPage.statusSetting}
        >
          <div className="logo">
            <div className="logo_name">
              <img src={logo} />
            </div>
          </div>
          <i
            className={" bi bi-list " + eventPage.hide + eventPage.isShowing}
            id="btn"
            onClick={toggleActive}
          />
        </div>
        <div className="profile_content">
          <div className={"profile hide-" + eventPage.statusSetting}>
            <div
              className="profile_details"
              data-bs-toggle="collapse"
              href="#collapseProfile"
            >
              <img src={client.profileImageLink} alt="" />
              <div className="name_job">
                <div className="name">{client.fullname}</div>
                <div className="job">{client.userRole}</div>
              </div>
            </div>
            <i
              className="bx menu-icon-notification-logout dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-bell"></i>
            </i>
            <NotificationBell />
          </div>
          <div className={"profile hide-" + !eventPage.statusSetting}>
            <div className="profile_details">
              <p onClick={toggleAbout}> &#60; Back</p>
            </div>
          </div>
          <div class="collapse btn  ps-4 text-white" id="collapseProfile">
            <p onClick={() => history.push("/homepage/about-my-account")}>
              My profile
            </p>
            {/* <p>My notification</p> */}
          </div>
        </div>
        <div>
          <ul className="nav_list">
            <nav className="nav-side-bar">
              <li>
                <Link to="/homepage/dashboard">
                  <i className="bx">
                    <img src={dashboardLogo} />
                  </i>
                  <span className="links_name">Dashboard</span>
                </Link>
                <span className="tooltip">Dashboard</span>
              </li>

              <li>
                <Link to="/homepage/purchase">
                  <i className="bx">
                    <img src={shoppingLogo} />
                  </i>
                  <span className="links_name">Purchase order</span>
                </Link>
                <span className="tooltip">Purchase</span>
              </li>
              <li>
                <Link to="/homepage/good-receipt">
                  <i className="bx">
                    <img src={importLogo} />
                  </i>
                  <span className="links_name">Goods Receipt</span>
                </Link>
                <span className="tooltip">Goods Receipt</span>
              </li>
              <li>
                <Link to="/homepage/good-issue">
                  <i className="bx">
                    <img src={boxLogo} />
                  </i>
                  <span className="links_name">Goods issue</span>
                </Link>
                <span className="tooltip">Goods issue</span>
              </li>
              <li>
                <Link to="/homepage/stock-take">
                  <i className="bx">
                    <img src={shelfLogo} />
                  </i>
                  <span className="links_name">Stock take</span>
                </Link>
                <span className="tooltip">Stock take</span>
              </li>
              <li>
                <Link to="/homepage/report">
                  <i className="bx">
                    <img src={reportLogo} />
                  </i>
                  <span className="links_name">Report</span>
                </Link>
                <span className="tooltip">Report</span>
              </li>
              <li>
                <Link to="/homepage/product">
                  <i className="bx">
                    <img src={productLogo} />
                  </i>
                  <span className="links_name">Product Manger</span>
                </Link>
                <span className="tooltip">Product Manger</span>
              </li>
              {/* <li onClick={() => setEventPage({
                hide: "",
                isShowing: "bx-menu-alt-right",
                active: "active",
                status: !eventPage.status,
              })} data-bs-toggle="collapse" href="#collapseListMenuProductManager">
                <a href="#">
                  <i className="bx">
                    <img src={window.location.origin + "/images/product-2.png"} />
                  </i>
                  <span className="links_name">Product</span>
                </a>
                <span className="tooltip">Product</span>
              </li>

              <li class="collapse text-white" id="collapseListMenuProductManager">
                <ul>
                  <li className="list-child-item ps-5">
                    <Link to="/homepage/product">Product</Link>
                  </li>
                  <li className="list-child-item ps-5"><span>Text</span></li>
                  <li className="list-child-item ps-5"><span>Text</span></li>
                  <li className="list-child-item ps-5"><span>Text</span></li>

                </ul>

              </li> */}
              <li>
                <Link to="/homepage/supplier">
                  <i className="bx">
                    <img src={manufactureLogo} />
                  </i>
                  <span className="links_name">Supplier</span>
                </Link>
                <span className="tooltip">Supplier</span>
              </li>
              <li>
                <Link to="/homepage/manage-account">
                  <i className="bx">
                    <img src={userLogo} />
                  </i>
                  <span className="links_name">Account</span>
                </Link>
                <span className="tooltip">Account</span>
              </li>
              <li>
                <Link to="/homepage/sale-man">
                  <i className="bx">
                    <img src={userLogo} />
                  </i>
                  <span className="links_name">Purchase requisition</span>
                </Link>
                <span className="tooltip">Purchase requisition</span>
              </li>
            </nav>
          </ul>
          <Logout hubConnection={hubConnection} />
        </div>
      </div>

      <Switch>
        <Route path="/homepage/dashboard">
          <Dashboard />
        </Route>
        <Route path="/homepage/purchase">
          <Purchase />
        </Route>
        <Route path="/homepage/good-receipt">
          <GoodReceipt />
        </Route>
        <Route path="/homepage/good-issue">
          <Issue />
        </Route>
        <Route path="/homepage/stock-take">
          <StockTake />
        </Route>
        <Route path="/homepage/report">
          <Report />
        </Route>
        <Route path="/homepage/product">
          <Product />
        </Route>
        <Route path="/homepage/supplier">
          <Supplier />
        </Route>
        <Route path="/homepage/manage-account">
          <ManageAccount />
        </Route>
        <Route path="/homepage/about-my-account">
          <ProfileClient />
        </Route>
        <Route path="/homepage/about-software">
          <AboutSoftware />
        </Route>
        <Route path="/homepage/sale-man">
          <SaleManPage />
        </Route>
        <Route path="/homepage/notification">
          <Notification />
        </Route>
      </Switch>

      <div className="position-absolute bottom-0 end-0 m-4">
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  client: state.client,
});

function Logout(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    props.hubConnection
      .invoke("DisconnectFromResource", "userId", "pageId")
      .catch((err) => {
        console.log("Error while disconnectiong from resource: " + { err });
      });
    dispatch({ type: "LOGOUT_REQUESTING" });
  };

  return (
    <div className="profile_content logout_content">
      <div className="profile">
        <i
          onClick={logout}
          className="bi bi-box-arrow-left menu-icon-notification-logout"
        />
      </div>
    </div>
  );
}

export default App;
