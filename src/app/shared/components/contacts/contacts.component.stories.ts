import {storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {MatIconModule, MatListModule} from '@angular/material';
import {FeedbackComponent} from '@app-core/feedback/feedback.component';
import {
  storybookDeclarations,
  storybookImports,
  storybookModule,
  storybookProviders
} from '@app/storybook/storybook.util';

const translations = {
  "SHARED": {
    "FEEDBACK": {
      "FORM-NOTICE": "At the moment any contact with me is possible only though feedback form",
      "FORM": "Open feedback form",
      "SOCIAL-PROFILES": "Social profiles:"
    }
  }
};

const meta = storybookModule()
  .withTranslation(translations)
  .withRouting()
  .withDialog()
  .withImports(
    MatListModule,
    MatIconModule
  )
  .build();

storiesOf('Contacts', module)
  .add('simple', () => ({
    template: `<app-module-wrapper>
                 <app-contacts></app-contacts>
               </app-module-wrapper>`,
    moduleMetadata: meta
  }));

export {
  translations as contactsTranslations
}
