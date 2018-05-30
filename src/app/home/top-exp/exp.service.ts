import {Injectable, Provider} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Experience, TopExperienceResponse} from '@app-shared/api/model/tech.model';
import {Observable} from 'rxjs/Observable';
import {GQLServive} from '@app-shared/api/gql.service';
import {ServiceData} from '@app-shared/models/service-data.model';

@Injectable()
export class ExpService {

  private _topExp = new ReplaySubject<ServiceData<Experience[]>>(1);

  constructor(private gql: GQLServive) {
    const topExp = `
      query topExpRequest($count: Int!) {
        topExperience(count: $count) {
          days
          spec {
            id
            title
            tech {
              id
              title
            }
          }
        }
      }
    `;
    const vars = {
      count: 10
    };
    this._topExp.next({
      loading: true
    });
    gql.query<TopExperienceResponse>(topExp, vars).subscribe(res => {
      this._topExp.next({
        loading: false,
        data: res.topExperience
      })
    })
  }

  public get topExp(): Observable<ServiceData<Experience[]>> { return this._topExp; }

}

export const ExpServiceProvider: Provider = {
  provide: ExpService,
  useClass: ExpService
};

