import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import * as Rx from 'rxjs';
import { Observer, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  domain: string = 'ws://testapi.tradlinx.com/websocket';
  
  constructor() {}

  private subject!: Subject<MessageEvent>;

  public connect(url: any): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url: any): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }



  // sendMessage(message: {
  //   user: string,
  //   message: string
  // }) {
  //   this.webSocket.send(JSON.stringify(message));
  // }

  // closeWebSocket() {
  //   this.webSocket.close();
  // }
}
