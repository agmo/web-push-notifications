import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isServiceWorkerEnabled = false;
  subscribed = false;
  title = 'angular-pwa';

  // This was used for sending local, i.e. non-web-push, notifications via Angular's service worker.
  // permissionStatus: NotificationPermission;

  constructor(private swPush: SwPush) {
  }

  ngOnInit(): void {
    this.isServiceWorkerEnabled = this.swPush.isEnabled;
    this.swPush.subscription
      .subscribe(subscription => {
        console.log('Is there a subscription?', subscription);
        this.subscribed = !!subscription;
      });
    // This was used for sending local, i.e. non-web-push, notifications via Angular's service worker.
    // this.requestNotificationPermissions();
  }

  disablePushNotifications() {
    this.swPush.unsubscribe()
      .then(() => console.log('Unsubscribed'))
      .catch(error => console.error('Failed to unsubscribe from Push Service.', error));
  }

  enablePushNotifications() {
    const appServerPublicKey = 'BEyvjYWb29Aww8_aSq5q2qvceZwnAvvGD6uDMlOfRJCMjhxM5zZFBGZslOkl7VfwQ6MDXAyVg8SdCpixyczbqxo';

    this.swPush.requestSubscription({serverPublicKey: appServerPublicKey})
      .then(subscription => console.log(JSON.stringify(subscription, null, 4)))
      .catch(error => console.error('Failed to subscribe to Push Service.', error));
  }

  // These were used for sending local, i.e. non-web-push, notifications via Angular's service worker.
  // requestNotificationPermissions = () => {
  //   Notification.requestPermission()
  //     .then(status => this.permissionStatus = status);
  // }
  //
  // showNotification = () => {
  //   const options = {
  //     body: 'This is an important body!',
  //     actions: [
  //       {action: 'search', title: 'Try Searching!'},
  //       {action: 'close', title: 'Forget it!'},
  //     ],
  //     data: {
  //       githubUser: 'agmo'
  //     }
  //   };
  //
  //   navigator.serviceWorker.getRegistration()
  //     .then(registration => registration.showNotification('My First Notification', options));
  // }
}
