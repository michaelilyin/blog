import {Component} from '@angular/core';

@Component({
  selector: 'app-landing-story',
  templateUrl: './landing-story.component.html',
  styleUrls: ['./landing-story.component.scss']
})
export class LandingStoryComponent {
  public storyItems = [{
    text: 'test1',
    point: new Date()
  }, {
    text: 'test2',
    point: new Date()
  }, {
    text: 'test3',
    point: new Date()
  }];
}
