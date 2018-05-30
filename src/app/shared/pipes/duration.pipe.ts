import { Pipe, PipeTransform } from '@angular/core';
import {defined} from '@app-shared/utils/rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NumeralsTranslateService} from '@app-shared/services/numerals-translate.service';

@Pipe({
  name: 'duration',
  pure: true
})
export class DurationPipe implements PipeTransform {

  constructor(private numeralsTranslate: NumeralsTranslateService) {

  }

  transform(value: any, args?: any): any {
    if (!defined(value)) {
      return ''
    }
    if (typeof value != 'number') {
      return 'Wrong format'
    }
    const daysTotal = value as number;

    const years = Math.floor(daysTotal / 365);
    const lessThanYear = daysTotal % 365;
    const months = Math.floor(lessThanYear / 30);
    const days = lessThanYear % 30;
    let res = '';
    if (years > 0) {
      res += years + ' ' + this.numeralsTranslate.years(years);
    }
    if (months > 0) {
      if (res !== '') {
        res += ' '
      }
      res += months + ' ' + this.numeralsTranslate.months(months);
    }
    if (res === '') {
      res += days + ' ' + this.numeralsTranslate.days(days);
    }
    return res;
  }

}
