import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ContactsComponent} from '@app-shared/components';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {
  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }

  public openContacts() {
    this.router.navigate([{
      outlets: {
        'bottom-sheet': ['home/contacts']
      }
    }]);
  }
}
