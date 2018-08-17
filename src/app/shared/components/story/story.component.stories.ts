import {storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {storybookModule} from '@app/storybook/storybook.util';
import {StoryComponent} from '@app-components/story/story.component';
import {StoryElementComponent} from '@app-components/story/story-element/story-element.component';
import {StoryElementDefDirective} from '@app-components/story/story-element/story-element-def.directive';

const meta = storybookModule(

).build();

storiesOf('Story', module)
  .add('with simple data', () => ({
    template: `
        <app-story>
          <app-story-element *appStoryElementDef>
            <p>Story one</p>
          </app-story-element>
          <app-story-element *appStoryElementDef>
            <p>Story two</p>
          </app-story-element>
          <app-story-element *appStoryElementDef>
            <p>Story three</p>
          </app-story-element>
          <app-story-element *appStoryElementDef>
            <p>Story four</p>
          </app-story-element>
        </app-story>    
    `,
    moduleMetadata: meta,
    props: {},
  }));
