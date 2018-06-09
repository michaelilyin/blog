import {Injectable, OnDestroy, Provider} from '@angular/core';
import {GQLServive} from '@app-shared/api/gql.service';
import {Observable} from 'rxjs/Observable';
import {ServiceData} from '@app-shared/models/service-data.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {LastUsageResponse, SpecUsage} from '@app-shared/api/model/tech.model';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';

@Injectable()
export class UsageService implements OnDestroy {

  public count = new ReplaySubject<number>(1);

  private _latestUsage = new ReplaySubject<ServiceData<SpecUsage[]>>(1);

  private paramsSub: Subscription;

  constructor(private gql: GQLServive) {
    this.paramsSub = this.count.subscribe(count => {
      const topExp = `
      query lastUsageRequest($count: Int!) {
        lastUsage(count: $count) {
          begin
          end
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
      this._latestUsage.next({
        loading: true
      });
      gql.query<LastUsageResponse>(topExp, vars).subscribe(res => {
        this._latestUsage.next({
          loading: false,
          data: res.lastUsage
        })
      });
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.paramsSub);
    this.paramsSub = undefined;
  }

  public get latestUsage(): Observable<ServiceData<SpecUsage[]>> { return this._latestUsage; }
}

export const UsageServiceProvider: Provider = {
    provide: UsageService,
    useClass: UsageService
};

