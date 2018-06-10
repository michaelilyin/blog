import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsageService, UsageServiceProvider} from '@app-home/resent-usage-notes/usage.service';
import {SpecUsage, UsageNote} from '@app-shared/api/model/tech.model';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {unsubscribe} from '@app-shared/utils/rxjs';

@Component({
  selector: 'app-resent-usage-notes',
  templateUrl: './resent-usage-notes.component.html',
  styleUrls: ['./resent-usage-notes.component.scss'],
  providers: [
    UsageServiceProvider
  ]
})
export class ResentUsageNotesComponent implements OnInit, OnDestroy {

  public isLoad: boolean = true;
  public notes: UsageNote[];

  private usSub: Subscription;

  constructor(private logger: NGXLogger,
              private usageService: UsageService) {

  }

  ngOnInit() {
    this.usSub = this.usageService.recentUsageNotes.subscribe(res => {
      this.logger.debug('Loaded recent usage', res);
      this.isLoad = res.loading;
      if (!res.loading) {
        this.notes = res.data;
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
