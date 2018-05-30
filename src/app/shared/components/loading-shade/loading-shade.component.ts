import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-shade',
  templateUrl: './loading-shade.component.html',
  styleUrls: ['./loading-shade.component.scss']
})
export class LoadingShadeComponent implements OnInit {

  @Input()
  @HostBinding('class.loading-shade')
  public isLoad: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
