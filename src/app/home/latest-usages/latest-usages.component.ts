import { Component, OnInit } from '@angular/core';
import {UsageService, UsageServiceProvider} from './usage.service';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {ExpService} from '@app-home/top-exp/exp.service';
import {Experience, SpecUsage} from '@app-shared/api/model/tech.model';

@Component({
  selector: 'app-latest-usages',
  templateUrl: './latest-usages.component.html',
  styleUrls: ['./latest-usages.component.scss'],
  providers: [
    UsageServiceProvider
  ]
})
export class LatestUsagesComponent implements OnInit {

  public isLoad: boolean = true;
  public usage: SpecUsage[];

  private usSub: Subscription;

  constructor(private logger: NGXLogger,
              private usageService: UsageService) {

  }

  ngOnInit() {
    this.usSub = this.usageService.latestUsage.subscribe(res => {
      this.logger.debug('Loaded latest usage', res);
      this.isLoad = res.loading;
      if (!res.loading) {
        this.usage = res.data;
      }
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.usSub);
  }

  public load(count: number): void {
    this.usageService.count.next(count);
  }
}
