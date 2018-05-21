import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Injectable, Provider} from '@angular/core';
import {map} from 'rxjs/operators';
import {GQLServive} from '../api/gql.service';
import {Configuration} from '../api/model/configuration.model';

export interface ConfigurationQuery {
  configuration: Configuration;
}

export abstract class ConfigurationService {
  public readonly abstract config: Observable<Configuration>;
}

@Injectable()
export class ConfigurationServiceImpl extends ConfigurationService {
  private _config = new ReplaySubject<Configuration>(1);

  constructor(private gql: GQLServive) {
    super();
    this.gql.query<ConfigurationQuery>(`
        query loadConfiguration {
          configuration {
            name
          }
        }
      `)
      .pipe(map(res => res.configuration))
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
