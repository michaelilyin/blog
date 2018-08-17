import {Directive, OnInit, TemplateRef} from '@angular/core';
import {StoryElementComponent} from '@app-components/story/story-element/story-element.component';

@Directive({
  selector: '[appStoryElementDef]'
})
export class StoryElementDefDirective implements OnInit {

  constructor(public readonly template: TemplateRef<StoryElementComponent>) { }

  ngOnInit() {

  }

}
