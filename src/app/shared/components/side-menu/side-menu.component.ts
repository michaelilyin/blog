import {Component, Input, OnInit} from '@angular/core';
import {SideMenuItem} from '@app-components/side-menu/side-menu-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input()
  public items: SideMenuItem[];
  constructor() { }

  ngOnInit(): void {
  }

}
