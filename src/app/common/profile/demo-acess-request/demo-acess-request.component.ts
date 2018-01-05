import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-demo-access-request',
  templateUrl: './demo-access-request.component.html',
  styleUrls: ['./demo-access-request.component.css']
})
export class DemoAccessRequestComponent implements OnInit {

  constructor(private dialog: MatDialogRef<DemoAccessRequestComponent>) { }

  ngOnInit() {
  }

  request() {
      this.dialog.close();
  }

  close() {
      this.dialog.close();
  }
}
