import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatBottomSheet} from '@angular/material';
import {ContactsComponent} from '@app-components/index';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss'],
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
export class LandingHomeComponent implements OnInit {
  @Output() public openDetails = new EventEmitter<void>();

  public mouseAnimationState = 'start';

  constructor() {

  }

  ngOnInit(): void {

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

  public onOpenDetails() {
    this.openDetails.next();
  }
}
