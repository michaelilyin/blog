import {Component, Input, OnInit} from '@angular/core';

export interface StoryBlock {
  date: Date;
  description: string;
}

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  @Input()
  public blocks: StoryBlock[];

  constructor() { }

  ngOnInit() {
  }

}
