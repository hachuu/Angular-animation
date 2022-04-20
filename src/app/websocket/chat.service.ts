import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
const CHAT_URL = 'wss://testapi.tradlinx.com/websocket';
import * as Rx from 'rxjs';
export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages!: Subject<Message>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<Message>>this.wsService
    .connect(CHAT_URL)
    .lift((response: MessageEvent) => {
        console.log(response);
      }
    );
  }
}
