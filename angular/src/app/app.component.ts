import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';

  ngOnInit(): void {
    this.requestNotificationPermissions();
  }

  requestNotificationPermissions = () => {
    Notification.requestPermission(status => {
      console.log('Notification Permission Status:', status);
    });
  }
}
