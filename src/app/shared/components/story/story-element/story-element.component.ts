import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-story-element',
  templateUrl: './story-element.component.html',
  styleUrls: ['./story-element.component.scss'],
})
export class StoryElementComponent {
  @Input() point: Date;

  @HostBinding('class.tl-block')
  public css = true;
}
