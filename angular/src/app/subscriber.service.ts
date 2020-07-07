import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private httpClient: HttpClient) { }

  addSubscriber(subscription: PushSubscription) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.httpClient.post('http://localhost:3030/addSubscriber', JSON.stringify(subscription), httpOptions);
  }

  removeSubscriber(id: string) {
    return this.httpClient.post('http://localhost:3030/removeSubscriber', id);
  }
}
