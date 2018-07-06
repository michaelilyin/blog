import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<ContactsComponent>) {

  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
