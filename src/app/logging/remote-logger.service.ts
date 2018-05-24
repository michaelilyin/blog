import {HttpMetaDataInterface, NGXLoggerHttpService} from 'ngx-logger';
import {HttpClient} from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GQLServive} from '@app-shared/api/gql.service';
import {ClientLogRecord, ClientLogRecordCreate} from '@app-shared/api/model/log.model';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable()
export class RemoteLoggerService extends NGXLoggerHttpService {

  constructor(http: HttpClient,
              private apollo: Apollo) {
    super(http);
  }

  logOnServer(url: string, message: string, additional: any[], metaData: HttpMetaDataInterface): Observable<any> {
    const record: ClientLogRecordCreate = {
      message: message
    };
    const query = gql`
      mutation createClientLog($log: ClientLogRecordCreate!) {
        createClientLogRecord(log: $log) {
          id
        }
      }
    `;
    return this.apollo.mutate<object>({
      mutation: query,
      variables: {
        log: record
      }
    });
  }
}

export const NGXLoggerHttpServiceProvider: Provider = {
  provide: NGXLoggerHttpService,
  useClass: RemoteLoggerService
};
