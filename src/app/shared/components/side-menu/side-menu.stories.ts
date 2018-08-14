import {storiesOf} from '@storybook/angular';
import {withNotes} from '@storybook/addon-notes';
import {storybookImports, storybookProviders} from '@app/storybook/storybook.util';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule
} from '@angular/material';

const meta = {
  imports: storybookImports()
    .withRouting()
    .withTranslation({
      'ADMIN': {
        'MENU': {
          'AUTH': {
            'TITLE': 'Auth',
            'USERS': 'Users',
            'ROLES': 'Roles'
          },
          'AUDIT': {
            'TITLE': 'Audit',
            'CLIENT-LOG': 'Client log',
            'SERVER-LOG': 'Server log',
            'AUDIT': 'Audit'
          }
        }
      }
    })
    .withCustom([
      MatSidenavModule,
      MatIconModule,
      MatButtonModule
    ])
    .build(),
  providers: storybookProviders()
    .withRouting()
    .build()
};

storiesOf('Side menu', module)
  .add('basic', withNotes('Simple menu with basic behaviour')(() => ({
    template: `<app-module-wrapper [menu]="sideMenu">
                 <ng-template #wrapperContent>
                    <p>content</p>
                 </ng-template>
               </app-module-wrapper>`,
    moduleMetadata: meta,
    props: {
      sideMenu: this.menu = [
        {
          title: 'ADMIN.MENU.AUTH.TITLE',
          items: [
            {
              title: 'ADMIN.MENU.AUTH.USERS',
              icon: 'person',
              commands: ['auth', 'users']
            }, {
              title: 'ADMIN.MENU.AUTH.ROLES',
              icon: 'assignment_ind',
              commands: ['auth', 'roles']
            }
          ]
        }, {
          title: 'ADMIN.MENU.AUDIT.TITLE',
          items: [
            {
              title: 'ADMIN.MENU.AUDIT.AUDIT',
              icon: 'security',
              commands: ['audit', 'audit']
            }, {
              title: 'ADMIN.MENU.AUDIT.CLIENT-LOG',
              icon: 'description',
              commands: ['audit', 'log', 'client']
            }, {
              title: 'ADMIN.MENU.AUDIT.SERVER-LOG',
              icon: 'description',
              commands: ['audit', 'log', 'server']
            }
          ]
        }
      ]
    }
  })));
