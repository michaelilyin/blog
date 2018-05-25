import {Injectable, OnDestroy, Provider} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {GridData, GridPage} from '@app-components/grid/model/grid-data.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {combineLatest} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {GQLServive} from '@app-shared/api/gql.service';
import {PageRequest} from '@app-shared/api/request/page-request.model';

@Injectable()
export class SimpleGridDataService implements OnDestroy {

  public entity = new ReplaySubject<string>(1);
  public fields = new ReplaySubject<string[]>(1);
  public reload = new ReplaySubject<void>(1);
  public page = new ReplaySubject<GridPage>(1);

  private _items = new ReplaySubject<GridData<object>>(1);

  constructor(private logger: NGXLogger,
              private gql: GQLServive) {
    combineLatest(
      this.entity,
      this.fields,
      this.page,
      this.reload
    ).subscribe((arg: [string, string[], GridPage, void]) => {
      this.logger.debug('Reload grid', arg);
      const entity = arg[0];
      const fields = arg[1];
      const page = arg[2];
      const query = this.buildQuery(entity, fields);

      const req: PageRequest = {
        limit: page.size,
        offset: page.index * page.size
      };
      const params = {
        req: req
      };
      this.gql.query<object[]>(query, params).subscribe(res => {
        const data = res[entity];
        this._items.next({
          items: data.items,
          total: data.total
        });
      });
    });
  }

  ngOnDestroy(): void {
  }

  private buildQuery(entity: string, fields: string[]): string {
    return `query listRequest($req: PageRequest!) {
      ${entity}(req: $req) {
        total
        items {
          ${fields.join('\n')}
        }
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
