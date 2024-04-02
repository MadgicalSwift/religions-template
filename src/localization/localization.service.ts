import { Injectable } from '@nestjs/common';
import { localisedStrings as english } from 'src/i18n/en/localised-strings';
import { localisedStrings as hindi } from 'src/i18n/hn/localised-strings';

@Injectable()
export class LocalizationService {
  static readonly getLocalisedString = (language): any => {
    console.log(language);
    if (language == 'hindi') {
      return hindi;
    } else {
      return english;
    }
  };
}
