import {Injectable, Provider} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class GQLServive {
  constructor(private apollo: Apollo,
              private logger: NGXLogger) {

  }

  public query<T>(query: String, args?: { [p: string]: any }): Observable<T> {
    this.logger.debug('Execute query', query);
    return this.apollo.query<T>({
      query: gql`${query}`,
      variables: args
    })
      .pipe(map(res => {
        return res.data
      }));
  }

  public mutate<T>(query: String, args?: { [p: string]: any }): Observable<T> {
    return this.apollo.mutate<T>({
      mutation: gql`${query}`,
      variables: args
    })
      .pipe(map(res => {
        return res.data as T
      }));
  }

}

export const GQLServiceProvider: Provider = {
  provide: GQLServive,
  useClass: GQLServive
};
