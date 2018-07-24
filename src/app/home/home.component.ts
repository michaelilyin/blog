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
      state('start', style({
        transform: 'translateY(0)'
      })),
      state('middle', style({
        transform: 'translateY(10%)'
      })),
      state('end', style({
        transform: 'translateY(0)'
      })),
      transition('start => middle', [
        animate(400)
      ]),
      transition('middle => end', [
        animate(800)
      ]),
      transition('end => start', [
        animate(100)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  public mouseAnimationState = 'start';

  constructor(private bottomSheet: MatBottomSheet) {

  }

  ngOnInit(): void {

  }

  public openContacts() {
    this.bottomSheet.open(ContactsComponent);
  }

  public onAnimationDone() {
    switch (this.mouseAnimationState) {
      case 'start':
        this.mouseAnimationState = 'middle';
        break;
      case 'middle':
        this.mouseAnimationState = 'end';
        break;
      case 'end':
        this.mouseAnimationState = 'start';
    }
  }

}
