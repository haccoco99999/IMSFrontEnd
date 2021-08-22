import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import logo from "./images/Logo.png";
import userLogo from "./images/user.svg";
import manufactureLogo from "./images/manufacture.svg";
import productLogo from "./images/Product.svg";
import reportLogo from "./images/report.svg";
import shelfLogo from "./images/shelf.svg";
import boxLogo from "./images/box.svg";
import importLogo from "./images/import.svg";
import shoppingLogo from "./images/shopping.svg";
import dashboardLogo from "./images/dashboard.svg";
import salemanLogo from "./images/delivery-man.svg";

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
import Swal from "sweetalert2";
import CompanyInfo from "./about-company/CompanyInfo";
function App(props) {
  const dispatch = useDispatch();
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
  const profileRef = useRef();
  function toggleBell() {
    setEventPage({
      statusBell: !eventPage.statusBell,
    });
  }
  const history = useHistory();
  function hideProfile() {
    profileRef.current.classList.remove("show");
  }
  function toggleActive() {
    hideProfile();
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

        .withUrl(`${process.env.REACT_APP_SIGNALR}`)
        .withAutomaticReconnect()
        .build();
      try {
        await hubConnection.start();

        /*
 CHANNEL: Role of user
*/

        //Receive notification all channel global
        // hubConnection.on("NotificationMessage", (user, message) => {
        //   console.log("NotificationMessage", user, message);
        // });

        //Receive notification from a specific channel:
        hubConnection.on("NotificationGroupMessage", (message) => {
          console.log("NotificationGroupMessage", message);
          var stringCheckTime = message.split("at:");
          var newMessage =
            stringCheckTime[0] +
            "at:" +
            moment(stringCheckTime[1]).add(7, "h").format("DD-MM-YYYY HH:mm");
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
        // hubConnection
        //   .invoke("SendMessage", "username", "message to be sent")
        //   .then(() => {
        //     console.log("SendMessage", "Dang send message");
        //   })

        //   .catch((err) => {
        //     console.log("Error invoking function: " + { err });
        //   });

        //Join a channel
        //CHANNEL = ROLE NAME
        await hubConnection
          .invoke("JoinGroup", client.userRole)
          .catch((err) => {
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
    return () => {
      dispatch({ type: "CLEAN_ALL_STORE" });
    };
  }, []);

  const closeConnection = async () => {
    try {
      await hubConnection
        .invoke("RemoveFromGroup", client.userRole)
        .then(() => {
          console.log("Dang log out");
        })
        .catch((err) => {
          console.log("Error while disconnectiong from resource: " + { err });
        });
      await hubConnection.stop();
    } catch (e) {
      console.log(e);
    }
  };
  var actualCode =
    "(" +
    function () {
      let arrow = document.getElementsByClassName("clicked-menu");
      for (var i = 0; i < arrow.length; i++) {
        let temp = arrow[i];
        arrow[i].addEventListener("click", (e) => {
          for (var j = 0; j < arrow.length; j++) {
            if (j !== i) {
              arrow[j].classList.remove("show-clicked-menu");
            }
          }
          temp.classList.add("show-clicked-menu");

          //  arrowParent.classList.add("show-clicked-menu");
        });
      }
    } +
    ")();";
  var script = document.createElement("script");
  script.textContent = actualCode;
  document.body.appendChild(script);
  // useEffect(() => {
  //   return () => {
  //     // setHubConnection(null);
  //     closeConnection();
  //   };
  // }, []);
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
              className="bx pointer menu-icon-notification-logout"
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

          <ul
            ref={profileRef}
            className="collapse text-white ps-5 list-item-account w-100"
            id="collapseProfile"
          >
            <li
              onClick={() => history.push("/homepage/about-my-account")}
              className="item-name"
            >
              My Profile
            </li>
            <li
              onClick={() => history.push("/homepage/notification")}
              className="item-name"
            >
              Notification
            </li>
            {client.pageAuthorized.includes("CompanyInfo") ? (
              <li
                onClick={() => history.push("/homepage/company-info")}
                className="item-name"
              >
                Company Information
              </li>
            ) : (
              ""
            )}
          </ul>
          {/* <p >
              My profile
            </p> */}
        </div>

        <ul className="nav_list" id="pills-menu-tab">
          <li
            className="clicked-menu show-clicked-menu"
            onClick={() => hideProfile()}
          >
            <Link to="/homepage/dashboard">
              <i className="bx">
                <img src={dashboardLogo} />
              </i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          {client.pageAuthorized.includes("PurchaseOrderMenu") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/purchase">
                <i className="bx">
                  <img src={shoppingLogo} />
                </i>
                <span className="links_name">Purchase order</span>
              </Link>
              <span className="tooltip">Purchase</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("GoodsReceipt") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/good-receipt">
                <i className="bx">
                  <img src={importLogo} />
                </i>
                <span className="links_name">Goods Receipt</span>
              </Link>
              <span className="tooltip">Goods Receipt</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("GoodsIssue") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/good-issue">
                <i className="bx">
                  <img src={boxLogo} />
                </i>
                <span className="links_name">Goods issue</span>
              </Link>
              <span className="tooltip">Goods issue</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("Stocktake") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/stock-take">
                <i className="bx">
                  <img src={shelfLogo} />
                </i>
                <span className="links_name">Stocktake</span>
              </Link>
              <span className="tooltip">Stocktake</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("Report") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/report">
                <i className="bx">
                  <img src={reportLogo} />
                </i>
                <span className="links_name">Report</span>
              </Link>
              <span className="tooltip">Report</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("Product") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/product">
                <i className="bx">
                  <img src={productLogo} />
                </i>
                <span className="links_name">Product Manger</span>
              </Link>
              <span className="tooltip">Product Manger</span>
            </li>
          ) : (
            ""
          )}

          {client.pageAuthorized.includes("Supplier") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/supplier">
                <i className="bx">
                  <img src={manufactureLogo} />
                </i>
                <span className="links_name">Supplier</span>
              </Link>
              <span className="tooltip">Supplier</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("Account") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/manage-account">
                <i className="bx">
                  <img src={userLogo} />
                </i>
                <span className="links_name">Account</span>
              </Link>
              <span className="tooltip">Account</span>
            </li>
          ) : (
            ""
          )}
          {client.pageAuthorized.includes("PurchaseRequistion") ? (
            <li className="clicked-menu" onClick={() => hideProfile()}>
              <Link to="/homepage/sale-man">
                <i className="bx">
                  <img src={salemanLogo} />
                </i>
                <span className="links_name">Purchase requisition</span>
              </Link>
              <span className="tooltip"> Requisition</span>
            </li>
          ) : (
            ""
          )}
        </ul>
        {/* <Logout hubConnection={hubConnection} client={client} /> */}
        <Logout closeConnection={closeConnection} />
        {/* <DisconnectSignalR closeConnection={closeConnection}/> */}
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
        <Route path="/homepage/company-info">
          <CompanyInfo />
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
  const dispatch = useDispatch();
  const logout = async () => {
    // let isLogout = false
    await Swal.fire({
      title: "Are you sure",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #d33",
      confirmButtonText: "Confirm",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT_REQUESTING" });
        props.closeConnection();
      }
    });
    // if(isLogout)

    // props.hubConnection.stop();
  };

  return (
    <div className="profile_content logout_content">
      <div className="pointer profile">
        <i
          onClick={logout}
          className="bi bi-box-arrow-left menu-icon-notification-logout"
        />
      </div>
    </div>
  );
}

export default App;
