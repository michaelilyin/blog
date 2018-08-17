import {Component, ContentChildren, OnInit, QueryList, Renderer2} from '@angular/core';
import {StoryElementDefDirective} from '@app-components/story/story-element/story-element-def.directive';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  // @ViewChild('elementsContainer', {read: ViewContainerRef})
  // public elementsContainer: ViewContainerRef;

  @ContentChildren(StoryElementDefDirective)
  public storyElements: QueryList<StoryElementDefDirective>;

 constructor(private renderer2: Renderer2) {

 }

  ngOnInit() {

  }

}
