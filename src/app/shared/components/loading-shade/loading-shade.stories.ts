import {storiesOf} from '@storybook/angular';
import {storybookImports, storybookProviders} from '@app/storybook/storybook.util';
import {MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';

const meta = {
  imports: storybookImports()
    .withCustom([
      MatProgressSpinnerModule
    ])
    .build(),
  providers: storybookProviders()
    .build()
};

storiesOf('Loading shade', module)
  .add('active', () => ({
    template: `<app-loading-shade [isLoad]="active"></app-loading-shade>`,
    moduleMetadata: meta,
    props: {
      active: true
    }
  }))
  .add('inactive', () => ({
    template: `<app-loading-shade [isLoad]="active"></app-loading-shade>`,
    moduleMetadata: meta,
    props: {
      active: false
    }
  }));
