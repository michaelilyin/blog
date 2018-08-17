import {storiesOf} from '@storybook/angular';
import {storybookImports, storybookModule, storybookProviders} from '@app/storybook/storybook.util';
import {MatIconModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';

const meta = storybookModule()
  .withImports(MatProgressSpinnerModule)
  .build();

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
