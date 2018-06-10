import {ErrorHandler, Injectable, Injector, Provider} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class ErrorService implements ErrorHandler {

  private _logger: NGXLogger;
  private _toastr: ToastrService;

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const logger = this.logger;
    const toastr = this.toastr;
    if (toastr) {
      let mess = error.message;
      if (mess) {
        mess = mess.substring(0, mess.indexOf('\n'));
        toastr.error(mess, 'Error occurred!');
      }
      toastr.error(JSON.stringify(error), 'Error occurred (JSON)!');
    }

    if (logger) {
      logger.error('Unhandled error', error);
      console.info('Unhandled error', error);
    } else {
      console.error('Critical error! Application fallback was\'t initialized!');
      console.error(error);
    }
  }

  private get logger(): NGXLogger {
    if (!this._logger) {
      this._logger = this.injector.get(NGXLogger, null);
    }
    return this._logger;
  }

  private get toastr(): ToastrService {
    if (!this._toastr) {
      this._toastr = this.injector.get(ToastrService, null);
    }
    return this._toastr;
  }
}

export const ErrorServiceProvider: Provider = {
  provide: ErrorHandler,
  useClass: ErrorService
};
