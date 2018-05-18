import {Component, Input, OnInit} from '@angular/core';
import {SideMenuGroup, SideMenuItem} from '@app-components/side-menu/side-menu-item';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input()
  public items: SideMenuGroup[];

  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.logger.debug('Side menu initialization');
  }

}
