import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class SendbirdService {
  sb;

  openChannel!: SendBird.OpenChannel;
  receiveMsgObs!: Observable<any>;
  _receiveMsgObs!: BehaviorSubject<any>;

  history: any[] | undefined;
  
  constructor() { 
    this.sb = new SendBird({appId: 'D4AF13F3-00B7-4BA5-BCC0-E00096FEE3EC', localCacheEnabled: true });  
    this._receiveMsgObs = new BehaviorSubject({});
    this.receiveMsgObs = this._receiveMsgObs.asObservable();
  }

  connect(userId: string, nickname: any) {
    this.sb.connect(userId, function(user, error) {
      if (error) {
          // Handle error.
      }
      console.log('user', user);

      // The user is connected to Sendbird server.
    });
  }
  async createChannel() {
    let channelURL = '';
    await this.sb.OpenChannel.createChannel(function(openChannel, error) {
      if (error) {
          // Handle error.
      }
  
      console.log('createChannel: openChannel', openChannel);
      return channelURL = openChannel.url;
      // An open channel is successfully created.
      // Through the "openChannel" parameter of the callback function,
      // you can get the open channel's data from the result object that Sendbird server has passed to the callback function.
    });
    return channelURL;
  }

  getChannel(CHANNEL_URL: string) {
    console.log(CHANNEL_URL);
    this.sb.OpenChannel.getChannel(CHANNEL_URL, (openChannel, error) => {
      if (error) {
          // Handle error.
      }

      console.log('getChannel: openChannel', openChannel);
      this.openChannel = openChannel;
  
      // Call the instance method of the result object in the "openChannel" parameter of the callback function.
      openChannel.enter(function(response, error) {
          if (error) {
              // Handle error.
          }
  
          console.log('getChannel response', response)
          // The current user successfully enters the open channel,
          // and can chat with other users in the channel by using APIs.
      });
    });
  }

  sendMessage(TEXT_MESSAGE: string) {
    const params = new this.sb.UserMessageParams();
    params.message = TEXT_MESSAGE;

    this.openChannel.sendUserMessage(params, function (message, error) {
      if (error) {
        // Handle error.
      }
      console.log(message);
  // The message is successfully sent to the channel.
  // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
    });
  }

  receiveMessage(UNIQUE_HANDLER_ID: string) {
    var channelHandler = new this.sb.ChannelHandler();

    // | SendBird.FileMessage | SendBird.AdminMessage
    channelHandler.onMessageReceived = (channel, message: SendBird.UserMessage) => {
      console.log('receiveMessage', message);
      console.log(channel);
      this._receiveMsgObs.next(message);
    };

    this.sb.addChannelHandler(UNIQUE_HANDLER_ID, channelHandler);
  }

  async loadPreviousMessages(CHANNEL_URL?: string) {
    var listQuery = this.openChannel.createPreviousMessageListQuery();
    listQuery.limit = 10;
    listQuery.reverse = true;
    // listQuery.customType = CUSTOM_TYPE;
    // Retrieving previous messages.
    await listQuery.load((messageList, error) => {
      if (error) {
        // Handle error.
      }
      console.log((messageList));
      this.history = messageList;
    });
    return this.history;
  }
}
