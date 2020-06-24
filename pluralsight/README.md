Experimenting with the Notifications API and the Web Push API

# Links

[Deep Dive into Web Push Notifications by Harit Himanshu](https://app.pluralsight.com/library/courses/web-push-notifications-deep-dive/table-of-contents)

# To run the demo

1. Go to the pluralsight folder
    
    ```
    cd pluralsight
    ```

1. (First time only) 

    Run

    ```
    npm install
    ```
   
1. Run

    ```
    npm start
    ```

1. Browse to http://localhost:8000/

1. Start the server that keeps track of subscribers:

    ```
    node web-push-server/app.js
    ```

1. To test receiving a simple notification sent via Notification API, 
   click Send Notification. The notification features actions available 
   in the More menu.

1. To test receiving a notification sent via a web push server, 
   click Enable Push Notifications (if notifications are already enabled, 
   disable them and then enable them again). 

   To test notifying multiple subscribes, subscribe to notifications 
   in two browsers.
   
   Notifications will be sent every 30 seconds.
