import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';

dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }
  async sendWelcomeMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    console.log(localisedStrings.welcomeMessage);

    const requestData = this.prepareRequestData(
      from,
      localisedStrings.welcomeMessage,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async sendLanguageChangedMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.chooseLanguage,
          },
        },
        buttons: [
          {
            type: 'solid',
            body: localisedStrings.language,
            reply: localisedStrings.language,
          },
          {
            type: 'solid',
            body: localisedStrings.language,
            reply: localisedStrings.language,
          },
        ],
        allow_custom_response: false,
      },
    };
    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }
  // write funcaion for main menu buttons
  async sendMainMenuMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.mainMenuHeading,
          },
        },
        buttons: [
          {
            type: 'solid',
            body: localisedStrings.questionsOne,
            reply: localisedStrings.questionsOne,
          },
          {
            type: 'solid',
            body: localisedStrings.questionsTwo,
            reply: localisedStrings.questionsTwo,
          },
          {
            type: 'solid',
            body: localisedStrings.questionsThree,
            reply: localisedStrings.questionsThree,
          },
          {
            type: 'solid',
            body: localisedStrings.chooseLanguage,
            reply: localisedStrings.chooseLanguage,
          },
        ],
        allow_custom_response: false,
      },
    };
    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }
}
