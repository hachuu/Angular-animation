import { Component, OnInit } from '@angular/core';
import { SendbirdService } from '../sendbird.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [SendbirdService]
})
export class MessageComponent implements OnInit {

  channelURL: string = 'sendbird_open_channel_4530_3e4cf0fa550916cfbb74347e4386d4382955fa57';
  message: string = '';
  messageList: any[] = [];
  
  constructor(
    private sendbirdService: SendbirdService
  ) { }

  ngOnInit(): void {
    this.sendbirdService.connect('hachu', 'hachu');
    // this.channelURL = await this.sendbirdService.createChannel();
    this.sendbirdService.getChannel(this.channelURL);
    this.getMessage();
    // this.loadMsg();
    this.sendbirdService.receiveMsgObs.subscribe((msg: any) => {
      console.log(msg.message);
      this.messageList.push(msg);
    })
  }

  async createChannel() {
    this.channelURL = await this.sendbirdService.createChannel();
  }
  sendMessage() {
    this.messageList.push({'message': this.message, 'createdAt': new Date()});
    this.sendbirdService.sendMessage(this.message);
  }

  getMessage() {
    this.sendbirdService.receiveMessage('hachu');
  }
  
  dateFormat(date: Date) {

    return new Date(date);
  }

  async loadMsg() {
    const history = await this.sendbirdService.loadPreviousMessages();
    this.messageList.push(history);
  }
}
