import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CustomException } from 'src/common/exception/custom.exception';
@Injectable()
export abstract class MessageService {
  sendAskMeMessage(from: any, language: string) {
    throw new Error('Method not implemented.');
  }
  async sendMessage(baseUrl: string, requestData: any, token: string) {
    try {
      const response = await axios.post(baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  abstract sendWelcomeMessage(from: string, language: string);
  abstract backToMainMenu(from: string, language: string);
  abstract sendLanguageChangedMessage(from: string, language: string);
  abstract sendMainMenuMessage(from: string, language: string);
  abstract sendPredefinedQuestionResponse(from: string, language: string, question: string);
  abstract languageButtons(from: string, language: string);
  abstract sendAskmeMessage(from: string, language: string);
  abstract sendQuestionRespone(question: string,language: string,from: string);

}

