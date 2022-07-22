import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  domain: string = 'ws://testapi.tradlinx.com/websocket';
  
  // allow https://testapi.tradlinx.com/websocket
  // allow ws://localhost:4200/websocket WebSocketCtor

  chatMessage!: {
    user: string,
    message: string
  }[];
  
  subject = webSocket({
    url: this.domain + "/ws-conn",
    deserializer: ({data}) => data,
    openObserver: {
      next: () => {
        console.log('connetion ok');
      }
    }
  });


  webSocket!: WebSocket;


  openWebSocket() {
    this.webSocket = new WebSocket(this.domain + "/ws-conn");
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    }

    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessage.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    }
  }

  
  generateWSC() {
    // const wsSubject = webSocket({
    //   url: this.domain + "/ws-conn",
    //   deserializer: ({data}) => data
    // });
    // console.log('subject', this.subject);
  }

  constructor() { 

    this.openWebSocket();


    // this.generateWSC();
    // this.subject.subscribe(
    //   msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
    //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );
  }

  sendMessage(message: {
    user: string,
    message: string
  }) {
    this.webSocket.send(JSON.stringify(message));
  }

  closeWebSocket() {
    this.webSocket.close();
  }
}
