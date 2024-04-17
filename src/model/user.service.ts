import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {}
  async createUser(
    mobileNumber: string,
    botID: string,
  ): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.mobileNumber = mobileNumber;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.language = 'English';
      newUser.botID = botID;
      newUser.button_response = '';
      return this.userRepository.save(newUser);
    }
  }

  async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobileNumber } });
  }

  async getUserPreferredLanguage(
    mobileNumber: string,
    botID: string,
  ): Promise<string> {
    const user = await this.findUserByMobileNumber(mobileNumber);
    return user ? user.language : 'English';
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  };

  async updateButtonResponse(
    mobileNumber: string,
    botID: string,
    button_response: string
  ): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      existingUser.button_response = button_response;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.language = 'English';
      newUser.botID = botID;
      newUser.button_response = button_response;
      return this.userRepository.save(newUser);
    }
  };

  async saveLanguage(mobileNumber: string, botID: string,language:string): Promise<User> {
    const existingUser = await this.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      console.log("language recieved", language)
      existingUser.language = language;
      return this.userRepository.save(existingUser);
    } else {
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.botID = botID; 
      newUser.button_response = '';
      newUser.language = language; 
      return this.userRepository.save(newUser);
    }
  };

}
