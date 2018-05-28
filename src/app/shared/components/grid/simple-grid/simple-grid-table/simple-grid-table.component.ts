import {Component, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {SimpleGrid} from '@app-components/grid/simple-grid/simple-grid.interface';
import {GridColumnView} from '@app-components/grid/model/grid-column-view.model';
import {SimpleGridDataService} from '@app-components/grid/simple-grid/simple-grid-data.service';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {MatPaginator, MatTable, PageEvent} from '@angular/material';
import {Renderer3} from '@angular/core/src/render3/interfaces/renderer';

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

  public table: MatTable<any>;

  private dataSub: Subscription;

  constructor(private logger: NGXLogger,
              private gridService: SimpleGridDataService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.logger.debug('Init simple grid table');
    this.columnKeys = this.columns.filter(c => c.displayed).map(c => c.key);
    this.gridService.fields.next(this.columnKeys);

    this.dataSub = this.gridService.items.subscribe(data => {
      this.logger.debug('Loaded items', data);
      this.items = data.items;
      this.total = data.total;
    });

    this.table._contentColumnDefs.changes.subscribe(cols => {
      console.info(cols)
    })
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

  public likeTh(th: HTMLTableHeaderCellElement): number {
    return th.offsetWidth;
  }
}
