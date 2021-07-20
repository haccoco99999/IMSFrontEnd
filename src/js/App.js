import React, { Component } from "react";
import "./App.css";
import AboutAccount from "./about-account/about-account";
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
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from "react-router-dom";
import NotificationBell from "./notification-component/notification-component";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: "bx-menu",
      isShowing: "",
      active: "",
      status: true,
      statusSetting: false,
      statusBell: false,
    };
    this.toggleActive = this.toggleActive.bind(this);
    this.toggleAbout = this.toggleAbout.bind(this);
    this.toggleBell = this.toggleBell.bind(this);
  }
  toggleAbout() {
    this.setState({
      statusSetting: !this.state.statusSetting,
    });
  }
  toggleBell() {
    this.setState({
      statusBell: !this.state.statusBell,
    });
  }

  toggleActive() {
    if (this.state.status) {
      this.setState({
        hide: "",
        isShowing: "bx-menu-alt-right",
        active: "active",
        status: !this.state.status,
      });
    } else {
      this.setState({
        hide: "bx-menu",
        isShowing: "",
        active: "",
        status: !this.state.status,
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.statusBell ? (
          <NotificationBell active={this.state.active} />
        ) : null}

        <div className={"sidebar " + this.state.active}>
          <div className={"logo_content hide-" + this.state.statusSetting}>
            <div className="logo">
              <div className="logo_name">
                <img src="src\js\images\Logo.png" />
              </div>
            </div>
            <i
              className={"bx " + this.state.hide + this.state.isShowing}
              id="btn"
              onClick={this.toggleActive}
            />
          </div>
          <div className="profile_content">
            <div className={"profile hide-" + this.state.statusSetting}>
              <div className="profile_details">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8gF9Vvg_EI7UURdrGjFUKYQG74jZK_zPBxDLhlPqTm8rzyrhX8EeCNlPSdTlZru1oYU&usqp=CAU"
                  alt=""
                />
                <div className="name_job" onClick={this.toggleAbout}>
                  <div className="name">{this.props.client.fullname}</div>
                  <div className="job">{this.props.client.userRole}</div>
                </div>
              </div>
              <i
                className="bx menu-icon-notification-logout"
                onClick={this.toggleBell}
              >
                <img src="src\js\images\alarm.png" />
                <span className="badge badge-customize">3</span>
              </i>
            </div>
            <div className={"profile hide-" + !this.state.statusSetting}>
              <div className="profile_details">
                <p onClick={this.toggleAbout}> &#60; Back</p>
              </div>
            </div>
          </div>
          <ul className="nav_list">
            <nav className={"hide-" + !this.state.statusSetting}>
              <li>
                <Link to="/homepage/about-my-account">
                  <span className="links_name">My Account</span>
                </Link>
              </li>
              <li>
                <Link to="/homepage/notification">
                  <span className="links_name">Notification</span>
                </Link>
              </li>
              <li>
                <Link to="/homepage/about-software">
                  <span className="links_name">About</span>
                </Link>
              </li>
            </nav>

            <nav className={"hide-" + this.state.statusSetting}>
              <li>
                <Link to="/homepage/dashboard">
                  <i className="bx">
                    <img src="src\js\images\dashboard-2.png" />
                  </i>
                  <span className="links_name">Dashboard</span>
                </Link>
                <span className="tooltip">Dashboard</span>
              </li>

              <li>
                <Link to="/homepage/purchase">
                  <i className="bx">
                    <img src="src\js\images\shopping-2.png" />
                  </i>
                  <span className="links_name">Purchase order</span>
                </Link>
                <span className="tooltip">Purchase</span>
              </li>
              <li>
                <Link to="/homepage/good-receipt">
                  <i className="bx">
                    <img src="src\js\images\import-2.png" />
                  </i>
                  <span className="links_name">Good Recipt</span>
                </Link>
                <span className="tooltip">Good Recipt</span>
              </li>
              <li>
                <Link to="/homepage/good-issue">
                  <i className="bx">
                    <img src="src\js\images\box-2.png" />
                  </i>
                  <span className="links_name">Good issue</span>
                </Link>
                <span className="tooltip">Good issue</span>
              </li>
              <li>
                <Link to="/homepage/stock-take">
                  <i className="bx">
                    <img src="src\js\images\shelf-2.png" />
                  </i>
                  <span className="links_name">Stock take</span>
                </Link>
                <span className="tooltip">Stock take</span>
              </li>
              <li>
                <Link to="/homepage/report">
                  <i className="bx">
                    <img src="src\js\images\report-2.png" />
                  </i>
                  <span className="links_name">Report</span>
                </Link>
                <span className="tooltip">Report</span>
              </li>

              <li>
                <Link to="/homepage/product">
                  <i className="bx">
                    <img src="src\js\images\product-2.png" />
                  </i>
                  <span className="links_name">Product</span>
                </Link>
                <span className="tooltip">Product</span>
              </li>
              <li>
                <Link to="/homepage/supplier">
                  <i className="bx">
                    <img src="src\js\images\manufacture-2.png" />
                  </i>
                  <span className="links_name">Supplier</span>
                </Link>
                <span className="tooltip">Supplier</span>
              </li>
              <li>
                <Link to="/homepage/manage-account">
                  <i className="bx">
                    <img src="src\js\images\user-2.png" />
                  </i>
                  <span className="links_name">Account</span>
                </Link>
                <span className="tooltip">Account</span>
              </li>
              <li>
                <Link to="/homepage/sale-man">
                  <i className="bx">
                    <img src="src\js\images\user-2.png" />
                  </i>
                  <span className="links_name">Sale man</span>
                </Link>
                <span className="tooltip">Sale man</span>
              </li>
            </nav>
          </ul>
          <Logout/>
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
            <AboutAccount />
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  client: state.client,
});

function Logout(){
  let history = useHistory();
  
  const logout = () => {
    localStorage.removeItem('token');

    history.push('/login');
 }

  return(
    <div className="profile_content logout_content">
    <div className="profile">
      <i  onClick={logout} className="bx bx-log-out menu-icon-notification-logout" />
    </div>
  </div>
  )
}
const connected = connect(mapStateToProps)(App);
export default connected;
