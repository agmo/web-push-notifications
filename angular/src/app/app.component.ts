import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isServiceWorkerEnabled = false;
  permissionStatus: NotificationPermission;
  title = 'angular-pwa';

  constructor(private swPush: SwPush) {
  }

  ngOnInit(): void {
    this.isServiceWorkerEnabled = this.swPush.isEnabled;
    this.requestNotificationPermissions();
  }

  requestNotificationPermissions = () => {
    Notification.requestPermission()
      .then(status => this.permissionStatus = status);
  }

  showNotification = () => {
    const options = {
      body: 'This is an important body!',
      actions: [
        {action: 'search', title: 'Try Searching!'},
        {action: 'close', title: 'Forget it!'},
      ],
      data: {
        githubUser: 'agmo'
      }
    };

    navigator.serviceWorker.getRegistration()
      .then(registration => registration.showNotification('My First Notification', options));
  }
}
