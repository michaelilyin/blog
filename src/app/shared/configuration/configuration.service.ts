import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Injectable, Provider} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

export interface Configuration {
  name: string;
}

export abstract class ConfigurationService {
  public readonly abstract config: Observable<Configuration>;
}

@Injectable()
export class ConfigurationServiceImpl extends ConfigurationService {
  private _config = new ReplaySubject<Configuration>();

  constructor(apollo: Apollo) {
    super();
    apollo.query<any>({
      query: gql`
        query {
          configuration {
            name
          }
        }
      `
    })
      .pipe(map(res => res.data.configuration))
      .subscribe(this._config);
  }

  get config(): Observable<Configuration> {
    return this._config;
  }
}

export const ConfigurationServiceProvider: Provider = {
  provide: ConfigurationService,
  useClass: ConfigurationServiceImpl
};
