import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {SimpleGrid} from '@app-components/grid/simple-grid/simple-grid.interface';
import {GridColumnView} from '@app-components/grid/model/grid-column-view.model';
import {SimpleGridDataService} from '@app-components/grid/simple-grid/simple-grid-data.service';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-simple-grid-table',
  templateUrl: './simple-grid-table.component.html',
  styleUrls: ['./simple-grid-table.component.scss']
})
export class SimpleGridTableComponent implements OnInit, OnDestroy, SimpleGrid {

  @Input() columns: GridColumnView[];

  public columnKeys: string[] = [];
  public items: object[] = [];
  public total: number;

  private dataSub: Subscription;

  constructor(private logger: NGXLogger,
              private gridService: SimpleGridDataService) { }

  ngOnInit() {
    this.logger.debug('Init simple grid table');
    this.columnKeys = this.columns.filter(c => c.displayed).map(c => c.key);
    this.gridService.fields.next(this.columnKeys);

    this.dataSub = this.gridService.items.subscribe(data => {
      this.logger.debug('Loaded items', data);
      this.items = data.items;
      this.total = data.total;
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.dataSub);
  }

  public onPageEvent(event: PageEvent) {
    this.gridService.page.next({
      size: event.pageSize,
      index: event.pageIndex
    });
  }

}
