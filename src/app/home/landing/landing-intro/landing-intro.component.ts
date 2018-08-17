import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ContactsComponent} from '@app-shared/components';

@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {

  }

  ngOnInit(): void {

  }

  public openContacts() {
    this.bottomSheet.open(ContactsComponent);
  }
}
