import {Injectable, OnDestroy, Provider} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {filter, first, map, zip} from 'rxjs/operators';
import {
  ActivatedRoute,
  ChildActivationEnd,
  NavigationEnd,
  ResolveEnd,
  Router,
  RouterState,
  RouterStateSnapshot
} from '@angular/router';
import {ConfigurationService} from '@app-shared/configuration/configuration.service';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class TitleParams {
  constructor(public readonly key: string,
              public readonly hasArgs?: boolean) {
  }
}

@Injectable()
export class TitleService implements OnDestroy {

  private routeSub: Subscription;

  constructor(private translateService: TranslateService,
              private router: Router,
              private title: Title,
              private configurationService: ConfigurationService,
              private logger: NGXLogger) {
    this.logger.info('Construct title processing service');
    this.routeSub = this.router.events
      .pipe(
        filter(event => event instanceof ResolveEnd)
      )
      .subscribe((event: ResolveEnd) => {
        let state = event.state.root;
        while (state.firstChild) {
          state = state.firstChild;
        }
        const data = state.data && state.data.title as TitleParams;
        this.logger.trace('Process route data', data);
        if (data && data.key) {
          if (data.hasArgs) {
            // TODO: wait for args?
          } else {
            this.translateService.stream(data.key)
              .subscribe(tran => this.title.setTitle(tran));
          }
        } else {
          this.configurationService.config
            .pipe(first())
            .subscribe(config => {
              this.title.setTitle(config.name)
            });
        }
      });
  }

  ngOnDestroy(): void {
    unsubscribe(this.routeSub);
  }
}

export const TitleServiceProvider: Provider = {
  provide: TitleService,
  useClass: TitleService
};

