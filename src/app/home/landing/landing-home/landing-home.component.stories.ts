import {withNotes} from '@storybook/addon-notes';
import {action} from '@storybook/addon-actions';
import {storybookModule} from '@app/storybook/storybook.util';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {LandingHomeComponent} from '@app-home/landing/landing-home/landing-home.component';
import {ParticlesModule} from 'angular-particle';

const translations = {
  "HOME": {
    "INTRO": {
      "NAME": "Michael Ilyin",
      "SPEC": "Software developer"
    },
    "BUTTONS": {
      "ABOUT-ME": "About me",
      "CONTACTS": "Contacts"
    }
  }
};


storiesOf('Landing home', module)
  .addDecorator(storybookModule(LandingHomeComponent)
    .withRouting()
    .withTranslation(translations)
    .withImports(ParticlesModule)
    .buildMetadata())
  .add('basic', withNotes('Simple landing home representation')(() => ({
    template: `<app-module-wrapper>
                 <app-landing-home (openDetails)="openDetails($event)"></app-landing-home>
               </app-module-wrapper>`,
    props: {
      openDetails: action('open details')
    }
  })));
