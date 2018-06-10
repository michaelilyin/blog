import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@app-environment/environment';
import {catchError, filter, first} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import {defined, unsubscribe} from '@app-shared/utils/rxjs';
import {TRANSLATION_LOCATION} from '@app-shared/translation/translation.factory';
import {SideMenuGroup} from '@app-components/side-menu/side-menu-item';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-module-wrapper',
  templateUrl: './module-wrapper.component.html',
  styleUrls: ['./module-wrapper.component.scss']
})
export class ModuleWrapperComponent implements OnInit, OnDestroy {

  @Input()
  public root: boolean;

  public ready = false;

  public broken = false;

  private titleSub: Subscription;

  @Input('menu')
  public sideMenu: SideMenuGroup[];

  constructor(private translateService: TranslateService,
              @Inject(TRANSLATION_LOCATION) private translationLocation: string,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang(environment.defaultLang);
    this.translateService.use(this.translateService.getBrowserCultureLang());
    this.translateService.getTranslation(this.translateService.currentLang)
      .pipe(
        first(),
        catchError(e => {
          this.broken = true;
          return undefined;
        }),
        filter(defined))
      .subscribe(res => {
        this.ready = true;
        this.logger.debug('Wrapper loaded dependencies', this.translationLocation);
      });
  }

  ngOnDestroy(): void {
    unsubscribe(this.titleSub);
  }

}
