import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  domain: string = 'wss://testapi.tradlinx.com/websocket';
  
  // allow https://testapi.tradlinx.com/websocket
  // allow ws://localhost:4200/websocket WebSocketCtor
  
  subject = webSocket({
    url: this.domain + "/ws-conn",
    deserializer: ({data}) => data,
    openObserver: {
      next: () => {
        console.log('connetion ok');
      }
    }
  });


  close() {
    this.subject.complete();
  }

  getMessages() {
    return this.subject.asObservable();
  }

  
  generateWSC() {
    // const wsSubject = webSocket({
    //   url: this.domain + "/ws-conn",
    //   deserializer: ({data}) => data
    // });
    console.log('subject', this.subject);
  }

  constructor() { 
    // this.subject.subscribe(
    //   msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );

    this.generateWSC();
    this.subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  sendMessage(message: string) {
    this.subject.next(message);
    // const wsSubject = webSocket({
    //   url: this.domain + "/ws-conn",
    //   deserializer: ({data}) => data
    // });
    // wsSubject.next(message);
  }

  
}
