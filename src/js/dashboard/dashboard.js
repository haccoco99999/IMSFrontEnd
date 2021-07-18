import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
export default function DashboardComponent() {
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
        });

        //Send a notification to all
        //SendMessage(string user, string message)
        hubConnection
          .invoke("SendMessage", "username", "message to be sent")
          .catch((err) => {
            alert(err);
            console.log("Error invoking function: " + { err });
          });

        //Join a channel
        //CHANNEL = ROLE NAME
        hubConnection.invoke("JoinGroup", "Manager").catch((err) => {
          alert(err);
          console.log("Error invoking function: " + { err });
        });

        //Send a message to a channel
        //SendMessageToGroup(string groupName, string message)
        hubConnection
          .invoke("SendMessageToGroup", "Manager", "message send to the group")
          .catch((err) => {
            alert(err);
            console.log("Error invoking function: " + { err });
          });

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
        hubConnection
          .invoke("ConnectWithResource", "userId", "pageId")
          .catch((err) => {
            alert(err);
            console.log("Error while connecting to resource: " + { err });
          });

        //Call method when leaving a page
        // DisconnectFromResource(string userId, string resourceId)
        /* 
          userId: Id of user in database
          pageId: PO47OLJXKJ | GR11TUG4IZ | GO0OCT3GD0 ...
        */
        hubConnection
          .invoke("DisconnectFromResource", "userId", "pageId")
          .catch((err) => {
            alert(err);
            console.log("Error while disconnectiong from resource: " + { err });
          });
      } catch (err) {
        alert(err);
        console.log("Error while establishing connection: " + { err });
      }
      setHubConnection(hubConnection);
    };
    createHubConnection();
  }, []);
  return (
    <div className="home_content">
      <div className="text">
        {/* ############################ */}
        <h1>DASHBOARD</h1>

        {/* ################################# */}
      </div>
    </div>
  );
}
