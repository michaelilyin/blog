import {withNotes} from '@storybook/addon-notes';
import {action} from '@storybook/addon-actions';
import {storybookModule} from '@app/storybook/storybook.util';
import {storiesOf} from '@storybook/angular';
import {LandingIntroComponent} from '@app-home/landing/landing-intro/landing-intro.component';
import {MatBottomSheetModule, MatButtonModule, MatCardModule} from '@angular/material';
import {contactsTranslations} from '@app-components/contacts/contacts.component.stories';
import * as _ from 'lodash';

const translations = _.merge({
    "HOME": {
      "BUTTONS": {
        "ABOUT-ME": "About me",
        "CONTACTS": "Contacts"
      }
    }
  },
  contactsTranslations
);

const meta = storybookModule(LandingIntroComponent)
  .withRouting()
  .withTranslation(translations)
  .withImports(
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule
  )
  .build();

storiesOf('Landing intro', module)
  .add('basic', withNotes('Simple landing intro representation')(() => ({
    template: `<app-module-wrapper>
                 <app-landing-intro></app-landing-intro>
               </app-module-wrapper>`,
    moduleMetadata: meta
  })));
