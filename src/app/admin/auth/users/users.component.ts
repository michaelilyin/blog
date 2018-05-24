import {Component, OnInit} from '@angular/core';
import {USER_META} from '@app-shared/api/model/user.model';
import {GridColumn} from '@app-components/grid/model/grid-column.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public meta = USER_META;
  public columns: GridColumn[] = [
    {
      key: 'username',
      displayByDefault: true
    },
    {
      key: 'email',
      displayByDefault: true
    },
    {
      key: 'firstName',
      displayByDefault: true
    },
    {
      key: 'lastName',
      displayByDefault: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
