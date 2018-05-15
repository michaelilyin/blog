import {HttpMetaDataInterface, NGXLoggerHttpService} from 'ngx-logger';
import {HttpClient} from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GQLServive} from '../shared/api/gql.service';
import {ClientLogRecord, ClientLogRecordCreate} from '../shared/api/model/log.model';

@Injectable()
export class RemoteLoggerService extends NGXLoggerHttpService {

  constructor(http: HttpClient, private gql: GQLServive) {
    super(http);
  }

  logOnServer(url: string, message: string, additional: any[], metaData: HttpMetaDataInterface): Observable<any> {
    const record: ClientLogRecordCreate = {
      message: message
    };

    return this.gql.mutate<ClientLogRecord>(`
      mutation createClientLog($log: ClientLogRecordCreate!) {
        createClientLogRecord(log: $log) {
          id
        }
      }
    `, {
      log: record
    });
  }
}

export const NGXLoggerHttpServiceProvider: Provider = {
  provide: NGXLoggerHttpService,
  useClass: RemoteLoggerService
};
