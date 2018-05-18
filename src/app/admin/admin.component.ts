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
        title: 'Авторизация',
        items: [
          {
            title: 'Пользователи',
            commands: ['auth', 'users']
          }, {
            title: 'Роли',
            commands: ['auth', 'users']
          }
        ]
      }, {
        title: 'Аудит',
        items: [
          {
            title: 'Аудит',
            commands: ['auth', 'users']
          }, {
            title: 'Клиентский лог',
            commands: ['auth', 'users']
          }, {
            title: 'Серверный лог',
            commands: ['auth', 'users']
          }
        ]
      }
    ]
  }

}
