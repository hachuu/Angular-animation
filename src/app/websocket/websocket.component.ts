// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
    this.service.openWebSocket();
  }

  ngOndestroy(): void {
    this.service.closeWebSocket();
  }


  sendMessage() {
    if (this.message) {
      this.service.sendMessage({user: 'song', message: this.message});
      this.message = '';
    }
  }
}
