import {storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {storybookModule} from '@app/storybook/storybook.util';

const meta = storybookModule(
).build();

const data = [{
  point: new Date(1993, 9, 29),
  title: 'Title for one',
  data: 'Text for one'
}, {
  point: new Date(2011, 8, 1),
  title: 'Title for two',
  data: 'Text for two'
}, {
  point: new Date(2016, 5, 15),
  title: 'Title for three',
  data: 'Text for three'
}, {
  point: new Date(),
  title: 'Title for now',
  data: 'Text for now'
}];

storiesOf('Story', module)
  .add('with simple data', () => ({
    template: `
        <app-story>
          <ng-container *ngFor="let story of data">
          <app-story-element *appStoryElementDef 
                             [point]="story.point"
                             [title]="story.title">
            <p>{{story.data}}</p>
          </app-story-element>
          </ng-container>
        </app-story>    
    `,
    moduleMetadata: meta,
    props: {
      data
    },
  }));
