import {ErrorHandler, Injectable, Injector, Provider} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class ErrorService implements ErrorHandler {

  private _logger: NGXLogger;
  private _toastr: ToastrService;

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    // FIXME: Add real error place parser
    const logger = this.logger;
    const toastr = this.toastr;
    if (toastr) {
      let mess = error.message ? error.message : error.toString();
      if (mess) {
        const line = mess.indexOf('\n');
        if (line > 0) {
          mess = mess.substring(0,);
        }
        toastr.error(mess, 'Error occurred!');
      }
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
