import {Component, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {SimpleGrid} from '@app-components/grid/simple-grid/simple-grid.interface';
import {GridColumnView} from '@app-components/grid/model/grid-column-view.model';
import {SimpleGridDataService} from '@app-components/grid/simple-grid/simple-grid-data.service';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {MatDialog, MatPaginator, MatTable, PageEvent} from '@angular/material';
import {Renderer3} from '@angular/core/src/render3/interfaces/renderer';
import {DialogColumnEditorComponent} from '@app-components/grid/dialog-column-editor/dialog-column-editor.component';
import {GridColumnEditorData} from '@app-components/grid/model/grid-column-editor-data.model';

@Component({
  selector: 'app-simple-grid-table',
  templateUrl: './simple-grid-table.component.html',
  styleUrls: ['./simple-grid-table.component.scss']
})
export class SimpleGridTableComponent implements OnInit, OnDestroy, SimpleGrid {

  @Input() columns: GridColumnView[];
  @Input() header: string;

  public columnKeys: string[] = [];
  public items: object[] = [];
  public total: number;
  public isLoadingResults: boolean = true;

  private dataSub: Subscription;
  private loadSub: Subscription;

  constructor(private logger: NGXLogger,
              private gridService: SimpleGridDataService,
              private renderer: Renderer2,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.logger.debug('Init simple grid table');
    this.columnKeys = this.columns.filter(c => c.displayed).map(c => c.key);
    this.gridService.fields.next(this.columnKeys);
    this.gridService.reload.next();
    this.gridService.page.next({
      index: 0,
      size: 20
    });

    this.dataSub = this.gridService.items.subscribe(data => {
      this.logger.debug('Loaded items', data);
      this.items = data.items;
      this.total = data.total;
    });
    this.loadSub = this.gridService.load.subscribe(data => {
      this.isLoadingResults = data;
    });
  }

  ngOnDestroy(): void {
    unsubscribe(this.dataSub);
    unsubscribe(this.loadSub);
  }

  public onPageEvent(event: PageEvent) {
    this.gridService.page.next({
      size: event.pageSize,
      index: event.pageIndex
    });
  }

  public refresh() {
    this.gridService.reload.next();
  }

  public openColumnsEditor() {
    const data: GridColumnEditorData = {
      columns: this.columns
    };
    this.dialog.open(DialogColumnEditorComponent, {
      data: data
    });
  }
}
