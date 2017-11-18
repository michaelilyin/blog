import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule, MatDialogModule, MatDrawerContainer, MatFormFieldModule, MatGridListModule, MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatOptionModule,
    MatPaginatorIntl,
    MatPaginatorModule, MatSelectModule,
    MatSidenavModule,
    MatTableModule
} from '@angular/material';
import {AdministrationComponent} from './administration.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '../common/common.module';
import {AdministrationRoutingModule} from './administration.routing.module';
import {CommonModule as NgCommonModule} from '@angular/common';
import {ApplicationConfigComponent} from './app-conf/application-config.component';
import {UsersComponent} from './users/users.component';
import {DefaultComponent} from './default/default.component';
import {RolesComponent} from './roles/roles.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {PaginatorTranslator} from '../common/translated/paginator.translator';
import {PermissionsComponent} from './permissions/permissions.component';
import {EditRoleDialogComponent} from './roles/edit-dialog/edit-role.dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/admin/', '.json');
}

@NgModule({
    imports: [
        NgCommonModule,
        AdministrationRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatInputModule,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatListModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        OverlayModule,
        AngularFireDatabaseModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            },
            isolate: true
        })
    ],
    declarations: [
        AdministrationComponent,
        DefaultComponent,
        ApplicationConfigComponent,
        UsersComponent,
        RolesComponent,
        PermissionsComponent,
        EditRoleDialogComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: PaginatorTranslator }
    ],
    entryComponents: [
        EditRoleDialogComponent
    ]
})
export class AdministrationModule {

}
