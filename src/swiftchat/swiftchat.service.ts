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
        buttons: localisedStrings.predefinedQuestions,
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

  async backToMainMenu(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.backToMainMenuHeading,
          },
        },
        buttons: localisedStrings.backToMainMenu,
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

  async sendPredefinedQuestionResponse(
    from: string,
    language: string,
    question: string,
  ) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const button_categories = localisedStrings.button_categories;
    console.log(button_categories);
    const answer_list = localisedStrings.answer;

    const questionIndex = button_categories.indexOf(question);
    console.log(questionIndex);

    if (questionIndex === -1) {
      throw new Error('Question not found');
    }

    const answerIndex = answer_list[questionIndex];
    console.log(answerIndex);

    const requestData = this.prepareRequestData(
      from,
      answerIndex, // Adjusting index since arrays are 0-indexed
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async languageButtons(from: string, language: string) {
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
            body: 'Hindi',
            reply: 'Hindi',
          },
          {
            type: 'solid',
            body: 'English',
            reply: 'English',
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
