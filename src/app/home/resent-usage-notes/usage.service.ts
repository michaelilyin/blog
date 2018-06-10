import {Injectable, OnDestroy, Provider} from '@angular/core';
import {GQLServive} from '@app-shared/api/gql.service';
import {Observable} from 'rxjs/Observable';
import {ServiceData} from '@app-shared/models/service-data.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {LastUsageResponse, RecentUsageNotesResponse, SpecUsage, UsageNote} from '@app-shared/api/model/tech.model';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';

@Injectable()
export class UsageService implements OnDestroy {

  public count = new ReplaySubject<number>(1);

  private _recentUsageNotes = new ReplaySubject<ServiceData<UsageNote[]>>(1);

  private paramsSub: Subscription;

  constructor(private gql: GQLServive) {
    this.paramsSub = this.count.subscribe(count => {
      const topExp = `
      query recentUsageNotesRequest($count: Int!) {
        recentUsageNotes(count: $count) {
          id
          description
          date
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
      this._recentUsageNotes.next({
        loading: true
      });
      gql.query<RecentUsageNotesResponse>(topExp, vars).subscribe(res => {
        this._recentUsageNotes.next({
          loading: false,
          data: res.recentUsageNotes
        })
      });
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.paramsSub);
    this.paramsSub = undefined;
  }

  public get recentUsageNotes(): Observable<ServiceData<UsageNote[]>> { return this._recentUsageNotes; }
}

export const UsageServiceProvider: Provider = {
  provide: UsageService,
  useClass: UsageService
};

