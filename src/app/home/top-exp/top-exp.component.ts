import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpService, ExpServiceProvider} from '@app-home/top-exp/exp.service';
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs/Observable';
import {Experience} from '@app-shared/api/model/tech.model';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';

@Component({
  selector: 'app-top-exp',
  templateUrl: './top-exp.component.html',
  styleUrls: ['./top-exp.component.scss'],
  providers: [
    ExpServiceProvider
  ]
})
export class TopExpComponent implements OnInit, OnDestroy {

  public isLoad: boolean = true;

  public exps: Experience[];

  private expSub: Subscription;

  constructor(private logger: NGXLogger,
              private expService: ExpService) {

  }

  ngOnInit() {
    this.expSub = this.expService.topExp.subscribe(res => {
      this.logger.debug('Loaded top exp', res);
      this.isLoad = res.loading;
      if (!res.loading) {
        this.exps = res.data;
      }
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.expSub);
  }

}
