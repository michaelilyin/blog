import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {NGXLogger} from 'ngx-logger';
import {distinctUntilChanged} from 'rxjs/operators';
import {GridColumn} from '@app-components/grid/model/grid-column.model';
import {Field} from '@app-shared/metamodel/model/metamodel.model';
import {GridViewService, GridViewServiceProvider} from '@app-components/grid/service/grid-view.service';
import {GridColumnView} from '@app-components/grid/model/grid-column-view.model';
import {
  SimpleGridDataService,
  SimpleGridDataServiceProvider
} from '@app-components/grid/simple-grid/simple-grid-data.service';

@Component({
  selector: 'app-simple-grid',
  templateUrl: './simple-grid.component.html',
  styleUrls: ['./simple-grid.component.scss'],
  providers: [
    GridViewServiceProvider,
    SimpleGridDataServiceProvider
  ]
})
export class SimpleGridComponent implements OnInit, OnDestroy {
  @Input() columns: GridColumn[];
  @Input() fields: Field[];
  @Input() entity: string;

  public table: boolean;
  public viewColumns: GridColumnView[];

  private bpSub: Subscription;
  private cardsScreen = [Breakpoints.XSmall, Breakpoints.Small];

  constructor(private breakPoint: BreakpointObserver,
              private mediaMatcher: MediaMatcher,
              private logger: NGXLogger,
              private gridViewService: GridViewService,
              private gridService: SimpleGridDataService) {

  }

  ngOnInit() {
    this.logger.debug('Init simple grid');
    this.viewColumns = this.gridViewService.columnModelToView(this.fields, this.columns);
    this.bpSub = this.breakPoint.observe(this.cardsScreen)
      .pipe(distinctUntilChanged())
      .subscribe(res => {
        const matches = res.matches || this.breakPoint.isMatched(this.cardsScreen);
        this.logger.debug('Use cards matches:', matches);
        this.table = !matches;
      });
    this.gridService.entity.next(this.entity);
    this.gridService.reload.next();
    this.gridService.page.next({
      index: 0,
      size: 20
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.bpSub);
  }

}
