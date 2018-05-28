import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {GridColumnEditorData} from '@app-components/grid/model/grid-column-editor-data.model';

@Component({
  selector: 'app-dialog-column-editor',
  templateUrl: './dialog-column-editor.component.html',
  styleUrls: ['./dialog-column-editor.component.scss']
})
export class DialogColumnEditorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GridColumnEditorData) { }

  ngOnInit() {
  }

}
