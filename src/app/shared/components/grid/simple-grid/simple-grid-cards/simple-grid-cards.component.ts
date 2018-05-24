import {Component, Input, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {SimpleGrid} from '@app-components/grid/simple-grid/simple-grid.interface';
import {GridColumn} from '@app-components/grid/model/grid-column.model';
import {Field} from '@app-shared/metamodel/model/metamodel.model';
import {GridColumnView} from '@app-components/grid/model/grid-column-view.model';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/index';
import {SimpleGridDataService} from '@app-components/grid/simple-grid/simple-grid-data.service';

@Component({
  selector: 'app-simple-grid-cards',
  templateUrl: './simple-grid-cards.component.html',
  styleUrls: ['./simple-grid-cards.component.scss']
})
export class SimpleGridCardsComponent implements OnInit, SimpleGrid {

  @Input() columns: GridColumnView[];

  public dataSource: /*DataSource<any> | Observable<any[]> | */any[] = [{}, {}];
  public columnKeys: string[] = [];
  public columnMap = new Map<string, GridColumnView>();

  constructor(private logger: NGXLogger,
              private gridService: SimpleGridDataService) { }

  ngOnInit() {
    this.logger.debug('Init simple grid cards');
    this.columns.forEach(col => this.columnMap.set(col.key, col));
    this.columnKeys = this.columns.filter(c => c.displayed).map(c => c.key);
  }

}
