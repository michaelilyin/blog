import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {SideMenuItem} from './side-menu-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Input()
  public items: SideMenuItem[];

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor() { }

}
