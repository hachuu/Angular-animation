import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {

  message?: string

  constructor(
    private service: WebsocketService
  ) { }

  ngOnInit(): void {
  }


  sendMessage() {
    if (this.message) {
      console.log(this.message)
      this.service.sendMessage(this.message);
    }
  }
}
