# AngularPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

1. Run `ng build --prod`. 

1. Serve with [http-server](https://www.npmjs.com/package/http-server):

    ```
   cd dist/angular-pwa/
   http-server -p 8080 -c-1 .
   ```
    or

    ```
    http-server -p 8080 -c-1 dist/angular-pwa
    ```

1. Navigate to `http://localhost:8080/` in an incognito window.

1. Start the server that keeps track of subscribers:

    ```
    node angular/web-push-server/app.js
    ```

1. Click Enable Push Notifications (if notifications are already enabled, 
   disable them and then enable them again). 
   
   Notifications will be sent every 30 seconds.
