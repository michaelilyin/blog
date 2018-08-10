import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {StoryBlock, StoryComponent} from '@app-components/story/story.component';

const blocks: StoryBlock[] = [{
  description: 'test',
  date: new Date()
}];

storiesOf('Story', module)
  .add('with simple data', () => ({
    component: StoryComponent,
    props: {
      blocks: blocks,
    },
  }));
