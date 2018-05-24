import {Injectable, OnDestroy, Provider} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GridData} from '@app-components/grid/model/grid-data.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {combineLatest} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {GQLServive} from '@app-shared/api/gql.service';

@Injectable()
export class SimpleGridDataService implements OnDestroy {

  public entity = new ReplaySubject<string>(1);
  public fields = new ReplaySubject<string[]>(1);
  public reload = new ReplaySubject<void>(1);

  private _items = new ReplaySubject<GridData<object>>(1);

  constructor(private logger: NGXLogger,
              private gql: GQLServive) {
    combineLatest(
      this.entity,
      this.fields,
      this.reload
    ).subscribe((arg: [string, string[], void]) => {
      this.logger.debug('Reload grid', arg);
      const query = this.buildQuery(arg[0], arg[1]);
      this.gql.query<object[]>(query).subscribe(res => {
        this._items.next({
          items: res[arg[0]]
        });
      });
    });
  }

  ngOnDestroy(): void {
  }

  private buildQuery(entity: string, fields: string[]): string {
    return `query listRequest {
      ${entity} {
        ${fields.join('\n')}
      }
    }`
  }

  public get items(): Observable<GridData<object>> {
    return this._items;
  }
}

export const SimpleGridDataServiceProvider: Provider = {
  provide: SimpleGridDataService,
  useClass: SimpleGridDataService
};
