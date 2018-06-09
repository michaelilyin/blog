import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-list-chart-card',
  templateUrl: './list-chart-card.component.html',
  styleUrls: ['./list-chart-card.component.scss']
})
export class ListChartCardComponent implements OnInit {

  @Input()
  public listData: object[];

  @Input()
  public chartData: object[];

  @Input()
  public isLoad: boolean = true;

  @Input()
  public chartType: 'pie' | 'none';

  @Output()
  public dataRequest = new EventEmitter<number>();

  @ContentChild('header')
  public header: TemplateRef<any>;

  @ContentChild('listItemHeader')
  public listItemHeader: TemplateRef<any>;

  @ContentChild('listItemText')
  public listItemText: TemplateRef<any>;

  @ContentChild('chart')
  public chart: TemplateRef<any>;

  public count: number = 5;
  public mode: 'chart' | 'list' = 'list';

  constructor() { }

  ngOnInit() {
    this.dataRequest.emit(this.count);
  }

  public loadMore(): void {
    this.count += 5;
    this.dataRequest.emit(this.count);
  }

  public get icon(): string {
    return this.mode === 'list' ? this.chartIcon : 'list';
  }

  public get chartIcon(): string {
    switch (this.chartType) {
      case 'pie':
        return 'pie_chart';
      default:
        return 'chart';
    }
  }

  public get hasChart(): boolean {
    return this.chartType !== 'none';
  }

  public switchMode() {
    if (this.mode == 'list') {
      this.mode = 'chart';
    } else {
      this.mode = 'list';
    }
  }
}
