import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {ConfigurationService} from '@app-shared/configuration/configuration.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public appName: string;

  private configSub: Subscription;

  constructor(private router: Router,
              private progressService: NgProgress,
              private configurationService: ConfigurationService,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.info('Main component initialization');
    this.initRouter();

    this.configurationService.config.subscribe(config => {
      this.appName = config.name;
    });
    this.logger.info('Main component initialized');
  }

  ngOnDestroy(): void {
    if (this.configSub) { this.configSub.unsubscribe(); }
  }

  private initRouter() {
    this.logger.debug('Router initialization');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressService.start();
      } else if (event instanceof NavigationCancel
        || event instanceof NavigationEnd
        || event instanceof NavigationError) {
        this.progressService.done();
      }
    });
    this.logger.debug('Router initialized');
  }

  onTitleClick() {
    this.router.navigate(['home']);
  }
}
