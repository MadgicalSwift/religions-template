import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppController } from '../src/app.controller';
import { ChatbotService } from '../src/chat/chatbot.service';
import { UserService } from '../src/model/user.service';
import { MessageService } from '../src/message/message.service';
import { SwiftchatMessageService } from '../src/swiftchat/swiftchat.service';
import { localisedStrings as english } from '../src/i18n/en/localised-strings';
import { askMeFlowService } from '../src/chat/askMeFlow';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/model/user.entity';
import { Repository } from 'typeorm';
import { LocalizationService } from '../src/localization/localization.service';

describe('AppController', () => {
  let messageService: MessageService;
  let userService: UserService;
  let askmeservice: askMeFlowService;
  let chatbotService: ChatbotService;
  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [
      ChatbotService,
      askMeFlowService,
      SwiftchatMessageService,
     {
      provide: MessageService,
      useFactory: () => ({
        sendWelcomeMessage:jest.fn(),
        backToMainMenu: jest.fn(),
        sendLanguageChangedMessage: jest.fn(),
        sendMainMenuMessage: jest.fn(),
        sendPredefinedQuestionRespons: jest.fn()
      }),
     },
      UserService,{
        provide: getRepositoryToken(User),
        useClass: Repository,
      }
    ],
  }).compile();
  messageService=module.get<MessageService>(MessageService);
  userService = module.get<UserService>(UserService);
  chatbotService = module.get<ChatbotService>(ChatbotService);
  askmeservice=module.get<askMeFlowService>(askMeFlowService);
});

it("should send welcome message and menu buttons when valid 'from' and 'text' are provided", async () => {
  jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
    id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
    mobileNumber: '1234567890',
    botID: '0238981860238953',
    button_response: '',
    language: 'English',
  });

  const body = {
    from: '1234567890',
    text: { body: 'hi' },
    button_response: null,
    persistent_menu_response: null,
  };

  await chatbotService.processMessage(body);

  expect(messageService.sendWelcomeMessage).toHaveBeenCalledWith(
    '1234567890',
    'English',
  );
  expect(messageService.sendMainMenuMessage).toHaveBeenCalledWith(
    '1234567890',
    'English',
  );
});

it("should send an ask me message when the user clicks on the 'ask a question'or 'ask new question' button", async () => {
  jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
    id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
    mobileNumber: '1234567890',
    botID: '0238981860238953',
    button_response: '',
    language: 'English',
  });
  const body = {
    from: '1234567890',
    text: null,
    button_response: { body: 'Ask a question' },
    persistent_menu_response: null,
  };
  jest.spyOn(userService, 'findUserByMobileNumber').mockResolvedValue({
    id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
    mobileNumber: '1234567890',
    botID: '0238981860238953',
    button_response: '',
    language: 'English',
  });

  jest.spyOn(userService, 'updateButtonResponse').mockResolvedValue({
    id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
    mobileNumber: '1234567890',
    botID: '0238981860238953',
    button_response: '',
    language: 'English',
  });

  jest
    .spyOn(LocalizationService, 'getLocalisedString')
    .mockResolvedValueOnce(english);

    jest
    .spyOn(askmeservice, 'sendAskMeMessage')
    .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});
  
     await chatbotService.processMessage(body);


    // Assert
    expect(userService.findUserByMobileNumber).toHaveBeenCalledWith(
      '1234567890',
    );
    expect(LocalizationService.getLocalisedString).toHaveBeenCalledWith(
      'English',
    );
    expect(askmeservice.sendAskMeMessage).toHaveBeenCalledWith("1234567890", "English");
    expect(userService.updateButtonResponse).toHaveBeenCalledWith(
      '1234567890',
      process.env.BOT_ID,
      'Ask a question',
    );
  });

  it("should send a predefined question response when the user clicks on a question button", async () => {
    jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
      id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
      mobileNumber: '1234567890',
      botID: '0238981860238953',
      button_response: '',
      language: 'English',
    });
    const body = {
      from: '1234567890',
      text:null,
      button_response: {body:'How does karma influence Hinduism?'},
      persistent_menu_response: null,
    };
    jest.spyOn(userService, 'findUserByMobileNumber').mockResolvedValue({
      id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
      mobileNumber: '1234567890',
      botID: '0238981860238953',
      button_response: '',
      language: 'English',
    });
  
    jest
      .spyOn(LocalizationService, 'getLocalisedString')
      .mockResolvedValueOnce(english);
    
    jest
    .spyOn(messageService, 'sendPredefinedQuestionResponse')
    .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});
  
    jest
    .spyOn(messageService, 'backToMainMenu')
    .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});
  
      
       await chatbotService.processMessage(body);
  
  
      // Assert
      expect(userService.findUserByMobileNumber).toHaveBeenCalledWith(
        '1234567890',
      );
      expect(LocalizationService.getLocalisedString).toHaveBeenCalledWith(
        'English',
      );
      expect(messageService.sendPredefinedQuestionResponse).toHaveBeenCalledWith("1234567890", "English", "How does karma influence Hinduism?");
      expect(messageService.backToMainMenu).toHaveBeenCalledWith("1234567890", "English");
    });
  it('should update the users language preference when the user clicks on a language button', async () => {
    // Mock dependencies
    jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
          id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
          mobileNumber: '1234567890',
          botID: '0238981860238953',
          button_response: '',
          language: 'English',
        });

        jest.spyOn(userService.userRepository, 'save').mockResolvedValue({
          id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
          mobileNumber: '1234567890',
          botID: '0238981860238953',
          button_response: null,
          language: 'English',
        });

        jest.spyOn(userService, 'saveLanguage').mockResolvedValue({
          id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
          mobileNumber: '1234567890',
          botID: '0238981860238953',
          button_response: null,
          language: 'English',
        });
        jest
          .spyOn(messageService, 'sendMainMenuMessage')
          .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});
    // Define the input message
    const body = {
      from: "1234567890",
      button_response: {
        body: "English"
      }
    };

    // Invoke the processMessage method
    await chatbotService.processMessage(body);

    // Assertions
    expect(userService.saveLanguage).toHaveBeenCalledWith("1234567890", process.env.BOT_ID, "English");
    expect(messageService.sendMainMenuMessage).toHaveBeenCalledWith("1234567890", "English");
  });

  it('should send a demo answer reponse when user asks a question', async () => {
    // Mock dependencies
    jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
          id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
          mobileNumber: '1234567890',
          botID: '0238981860238953',
          button_response: '',
          language: 'English',
        });
        jest.spyOn(userService.userRepository, 'save').mockResolvedValue({
          id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
          mobileNumber: '1234567890',
          botID: '0238981860238953',
          button_response: null,
          language: 'English',
        });
        jest
          .spyOn(askmeservice, 'sendQuestionRespone')
          .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});

        jest
          .spyOn(messageService, 'backToMainMenu')
          .mockResolvedValueOnce({id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66'});
    // Define the input message
    const body = {
      from: '1234567890',
      text: {body:'random question'},
      button_response: null,
      persistent_menu_response: null,
    };

    // Invoke the processMessage method
    await chatbotService.processMessage(body);

    // Assertions
    expect(askmeservice.sendQuestionRespone).toHaveBeenCalledWith(body.text.body, "English","1234567890");
    expect(messageService.backToMainMenu).toHaveBeenCalledWith("1234567890", "English");
  });

  it('should send a back to main menu message when the user clicks on the "back to main menu" button', async () => {
    // Mock dependencies
    jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
      id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
      mobileNumber: '1234567890',
      botID: '0238981860238953',
      button_response: '',
      language: 'English',
    });
  
    const askMeFlowService = {
      sendAskMeMessage: jest.fn(),
      sendQuestionRespone: jest.fn(),
    };

   
    // Define the input message
    const body = {
      from: "1234567890",
      text: {
        body: "back to main menu"
      },
      button_response: {
        body: "back to main menu"
      }
    };

    // Invoke the processMessage method
    await chatbotService.processMessage(body);

    // Assertions
    expect(messageService.sendMainMenuMessage).toHaveBeenCalledWith("1234567890", "English");
  });


});
