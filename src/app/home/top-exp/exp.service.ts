import {Injectable, OnDestroy, Provider} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Experience, TopExperienceResponse} from '@app-shared/api/model/tech.model';
import {Observable} from 'rxjs/Observable';
import {GQLServive} from '@app-shared/api/gql.service';
import {ServiceData} from '@app-shared/models/service-data.model';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';

@Injectable()
export class ExpService implements OnDestroy {

  public count = new ReplaySubject<number>(1);

  private _topExp = new ReplaySubject<ServiceData<Experience[]>>(1);

  private paramSub: Subscription;

  constructor(private gql: GQLServive) {
    this.paramSub = this.count.subscribe((count) => {
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
        count: count
      };
      this._topExp.next({
        loading: true
      });
      gql.query<TopExperienceResponse>(topExp, vars).subscribe(res => {
        this._topExp.next({
          loading: false,
          data: res.topExperience
        })
      });
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.paramSub);
    this.paramSub = undefined;
  }

  public get topExp(): Observable<ServiceData<Experience[]>> { return this._topExp; }

}

export const ExpServiceProvider: Provider = {
  provide: ExpService,
  useClass: ExpService
};

