import {Injectable, OnDestroy, Provider} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {first, map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

export interface RouterData {
  title: string
  titleVars: { [p: string]: any }
}


@Injectable()
export class RouterDataProcessorService implements OnDestroy {

  private _title = new ReplaySubject<string>();
  private sub: Subscription;

  constructor(private route: ActivatedRoute,
              private translateService: TranslateService) {
    this.sub = route.data
      .pipe(map(data => data as RouterData))
      .subscribe(data => {
        this.translateService.get(data.title, data.titleVars)
          .pipe(first())
          .subscribe(title => {
            this._title.next(title);
          });
      });
  }

  ngOnDestroy(): void {
    unsubscribe(this.sub);
  }

  public get title(): Observable<string> {
    return this._title;
  }
}

export const RouterDataProcessorServiceProvider: Provider = {
  provide: RouterDataProcessorService,
  useClass: RouterDataProcessorService
};
