import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ContactsComponent} from '@app-components/index';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [
    trigger('mousePointer', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      transition('* <=> *', [
        animate(2000)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  public mouseAnimationState = 'active';

  constructor(private bottomSheet: MatBottomSheet) {

  }

  ngOnInit(): void {

  }

  public openContacts() {
    this.bottomSheet.open(ContactsComponent);
  }

  public onAnimationDone() {
    this.mouseAnimationState = this.mouseAnimationState === 'active' ? 'inactive' : 'active';
  }

}
