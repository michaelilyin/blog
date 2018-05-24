import { Component, OnInit } from '@angular/core';
import {SideMenuGroup} from '@app-components/side-menu/side-menu-item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public menu: SideMenuGroup[];

  constructor() { }

  ngOnInit() {
    this.menu = [
      {
        title: 'ADMIN.MENU.AUTH.TITLE',
        items: [
          {
            title: 'ADMIN.MENU.AUTH.USERS',
            icon: 'person',
            commands: ['auth', 'users']
          }, {
            title: 'ADMIN.MENU.AUTH.ROLES',
            icon: 'assignment_ind',
            commands: ['auth', 'roles']
          }
        ]
      }, {
        title: 'ADMIN.MENU.AUDIT.TITLE',
        items: [
          {
            title: 'ADMIN.MENU.AUDIT.AUDIT',
            icon: 'security',
            commands: ['audit', 'audit']
          }, {
            title: 'ADMIN.MENU.AUDIT.CLIENT-LOG',
            icon: 'description',
            commands: ['audit', 'log', 'client']
          }, {
            title: 'ADMIN.MENU.AUDIT.SERVER-LOG',
            icon: 'description',
            commands: ['audit', 'log', 'server']
          }
        ]
      }
    ]
  }

}
