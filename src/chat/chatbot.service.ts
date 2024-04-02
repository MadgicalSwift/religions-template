import { Injectable } from '@nestjs/common';
// import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';

@Injectable()
export class ChatbotService {
  // private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    // intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
  ) {
    // this.intentClassifier = intentClassifier;
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    const { from, text } = body;
    let botID = process.env.BOT_ID;
    let language = await this.userService.getUserPreferredLanguage(from,botID)
    // write if text will come hi thene send welcome message
    if(text ==="Hi"){
      await this.message.sendWelcomeMessage(from,language)
    }
  }
}
export default ChatbotService;
