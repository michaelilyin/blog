import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ContactsComponent} from '@app-components/contacts/contacts.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet) {

  }

  ngOnInit(): void {

  }

  public openContacts() {
    this.bottomSheet.open(ContactsComponent);
  }

}
