import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';


@Injectable()
export class ChatbotService {
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    message: MessageService,
    userService: UserService,
  ) {
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    const { from, text } = body;
    let botID = process.env.BOT_ID;
    let language = await this.userService.getUserPreferredLanguage(from,botID)
    //  if text will come hi then send welcome message
    if(text.body =="Hi"){
      console.log("text",text)
      await this.message.sendWelcomeMessage(from,language)
      await this.message.sendMainMenuMessage(from, language)
    }
  }
}
export default ChatbotService;
