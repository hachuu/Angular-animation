import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
  messageInputValue?: string

  constructor(private chatService: ChatService) {
    chatService.messages.asObservable().subscribe(message => {
      console.log(message);
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  private message = {
    author: "tutorialedge",
    message: this.messageInputValue || ''
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
    this.message.message = "";
  }
}
