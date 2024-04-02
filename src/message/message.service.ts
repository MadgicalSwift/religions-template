import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CustomException } from 'src/common/exception/custom.exception';

@Injectable()
export abstract class MessageService {

  

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
      throw new CustomException(error);
    }
  }

  abstract sendWelcomeMessage(from: string, language: string);
  abstract sendLanguageChangedMessage(from: string, language: string);
}
