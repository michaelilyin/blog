import {ContactsComponent} from '../index';
import {Component} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {Router} from '@angular/router';
import {BottomSheetBaseComponent} from '@app-components/bottom-sheet-base.component';

@Component({
  selector: 'app-contacts-sheet',
  template: ''
})
export class ContactsSheetComponent extends BottomSheetBaseComponent<ContactsComponent> {
  protected componentType = ContactsComponent;

  constructor(protected bottomSheet: MatBottomSheet,
              protected router: Router) {
    super();
  }
}
