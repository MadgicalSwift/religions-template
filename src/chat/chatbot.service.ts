import { Injectable } from '@nestjs/common';
import { LocalizationService } from '../localization/localization.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../model/user.service';

@Injectable()
export class ChatbotService {
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    message: MessageService,
    userService: UserService,
  ) 
  {
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    const { from, text, button_response, persistent_menu_response } = body;
    let botID = process.env.BOT_ID;
    let UserData = await this.userService.findUserByMobileNumber(from);
    if (!UserData) {
      await this.userService.createUser(from, botID);
    }
    const userData = await this.userService.findUserByMobileNumber(from);
    const localisedStrings = await LocalizationService.getLocalisedString(
      userData.language,
    );
    if(!button_response && !persistent_menu_response && body.text.body === "hi"){
      await this.message.sendWelcomeMessage(from,userData.language)
      await this.message.sendMainMenuMessage(from, userData.language)
    }
    else if(button_response && localisedStrings.askButtonList.includes(button_response.body)){
      await this.message.sendAskmeMessage(from, userData.language);
      await this.userService.updateButtonResponse(from, botID, button_response.body);
    }
    else if (!button_response && localisedStrings.askButtonList.includes(userData.button_response)){
      await this.message.sendQuestionRespone(body.text.body,userData.language,from);
      await this.message.backToMainMenu(from, userData.language)
    }
    else if(button_response && localisedStrings.backToMianMenuList.includes(button_response.body)){
      await this.message.sendMainMenuMessage(from, userData.language);
    }
    else if(button_response && localisedStrings.button_categories.includes(button_response.body)){
      await this.message.sendPredefinedQuestionResponse(from,UserData.language,button_response.body);
      //await this.userService.updateButtonResponse(from, botID,localisedStrings.button_categories[0]);
      await this.message.backToMainMenu(from, userData.language);
    }

    else if(button_response && (button_response.body=== 'Choose language' || button_response.body==='भाषा चुनें')){
      await this.message.languageButtons(from,userData.language);
    }

    else if(button_response && localisedStrings.languageButtons.includes(button_response.body)){
      console.log(userData.language)
      let language= await this.userService.saveLanguage(from, botID, button_response.body);
      await this.message.sendMainMenuMessage(from,language.language);
    }
  };
};
export default ChatbotService;
