import { Injectable } from '@angular/core';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class SendbirdService {
  sb;

  constructor() { 
    this.sb = new SendBird({appId: 'D4AF13F3-00B7-4BA5-BCC0-E00096FEE3EC', localCacheEnabled: true });  
  }

  connect(userId: string, nickname: any) {
    this.sb.connect(userId, function(user, error) {
      if (error) {
          // Handle error.
      }
      console.log(user);

      // The user is connected to Sendbird server.
    });
  }
  createChannel() {
    this.sb.OpenChannel.createChannel(function(openChannel, error) {
      if (error) {
          // Handle error.
      }
  
      console.log(openChannel);
      // An open channel is successfully created.
      // Through the "openChannel" parameter of the callback function,
      // you can get the open channel's data from the result object that Sendbird server has passed to the callback function.
    });
  }
  
}
