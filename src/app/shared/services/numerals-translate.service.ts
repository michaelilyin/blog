import {Injectable, Provider} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class NumeralsTranslateService {

  private readonly yearsConverters = {
    'ru': (num) => {
      const res = num % 10;
      if (res === 0 || (num >= 11 && num <= 14)) {
        return 'лет'
      } else if (res === 1) {
        return 'год'
      } else if (res >= 2 && res <= 4) {
        return 'года'
      } else {
        return 'лет'
      }
    },
    'en': (num) => {
      if (num == 1) {
        return 'year';
      } else {
        return 'years'
      }
    }
  };

  private readonly monthConverters = {
    'ru': (num) => {
      const res = num % 10;
      if (res === 0 || (num >= 11 && num <= 14)) {
        return 'месяцев'
      } else if (res === 1) {
        return 'месяц'
      } else if (res >= 2 && res <= 4) {
        return 'месяца'
      } else {
        return 'месяцев'
      }
    },
    'en': (num) => {
      if (num == 1) {
        return 'month';
      } else {
        return 'months'
      }
    }
  };

  private readonly dayConverters = {
    'ru': (num) => {
      const res = num % 10;
      if (res === 0 || (num >= 11 && num <= 14)) {
        return 'дней'
      } else if (res === 1) {
        return 'день'
      } else if (res >= 2 && res <= 4) {
        return 'дня'
      } else {
        return 'дней'
      }
    },
    'en': (num) => {
      if (num == 1) {
        return 'day';
      } else {
        return 'days'
      }
    }
  };

  constructor(private translateService: TranslateService,
              private logger: NGXLogger) { }

  public years(years: number): string {
    if (this.yearsConverters[this.translateService.currentLang]) {
      return this.yearsConverters[this.translateService.currentLang](years);
    } else {
      return this.yearsConverters[this.translateService.defaultLang](years);
    }
  }

  public months(months: number): string {
    if (this.monthConverters[this.translateService.currentLang]) {
      return this.monthConverters[this.translateService.currentLang](months);
    } else {
      return this.monthConverters[this.translateService.defaultLang](months);
    }
  }

  public days(days: number): string {
    if (this.dayConverters[this.translateService.currentLang]) {
      return this.dayConverters[this.translateService.currentLang](days);
    } else {
      return this.dayConverters[this.translateService.defaultLang](days);
    }
  }
}

export const NumeralsTranslateServiceProvider: Provider = {
  provide: NumeralsTranslateService,
  useClass: NumeralsTranslateService
};
