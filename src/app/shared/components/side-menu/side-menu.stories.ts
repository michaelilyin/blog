import {storiesOf} from '@storybook/angular';
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
    .withCustom([
      MatSidenavModule,
      MatIconModule,
      MatButtonModule
    ])
    .build(),
  providers: storybookProviders()
    .build()
};

storiesOf('Side menu', module)
  .add('basic', () => ({
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
        }
      ]
    }
  }));
