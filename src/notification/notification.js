import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllLocationsAction } from "../notification-component/action";
//css
import "./notification.css";
import moment from "moment";
export default function NotificationComponents(props) {
  let dispatch = useDispatch();
  const { token, listNotificationStore, userRole } = useSelector((state) => ({
    token: state.client.token,
    userRole: state.client.userRole,
    listNotificationStore: state.notificationReducer.listNotifications,
  }));
  const [loadMore, setLoadMore] = useState(false);
  const history = useHistory()
  useEffect(() => {
    dispatch(getAllLocationsAction({ token: token, userRole: userRole }));
    const list = document.getElementById('list')
    list.addEventListener('scroll',() => {
      console.log("tao scroll")
    });
    return () => {
        window.removeEventListener('scroll', loadDataRequest);
    }
   
  }, []);

  useState(()=>{
 
    setLoadMore(false)
  },[loadMore])

function   loadDataRequest(){
 
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        // Do load more content here!
        setLoadMore(true);
    }
  }

  function redirectDetail(notification) {
    // history.push('/homepage/purchase')

    history.replace("/homepage/purchase/PriceQuote", { orderId: notification.typeID, status: "" });
  }
  



  return (
    <div className="home_content">
      <div class="d-grid gap-2">
        <div className="p-3">

          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
              class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>
          <div >
            <div id="list" class="list-group">



              {console.log(listNotificationStore[0])}
              {listNotificationStore.map((item,index) =>
                <a key={index} onClick={() =>redirectDetail(item)} class="list-group-item list-group-item-action" aria-current="true">
                  <i class="bi bi-chat-left-quote"></i>
                  <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">{item.message}</p>
                    <small>{moment().diff(moment(item.createdDate), "days") === 0 ?moment().diff(moment(item.createdDate), "h") + " hours ago": moment().diff(moment(item.createdDate), "days") + " 3 days ago"  }</small>
                  </div>

                  <small>{moment(item.createdDate)
                    .add(7, "h")
                    .format("DD-MM-YYYY hh:mm:ss")}</small>
                </a>

              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
// class Notification extends React.Component {
//   render() {
//     return (
//       <div className="home_content home-notification">
//         <div className="text">
//           {/* ############################ */}
//           <div>
//             <h2>Notification</h2>
//             <div className="notification-container">
//               <ul>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//                 <li>
//                   <img src="..\src\js\images\manufacture-2.png" />
//                   <span>
//                     User Huynhq create new supplier at 10:25AM 05/18/2021
//                   </span>{" "}
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* ################################# */}
//         </div>
//       </div>
//     );
//   }
// }
// export default Notification;
