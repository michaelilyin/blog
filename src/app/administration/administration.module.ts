import {NgModule} from '@angular/core';
import {
    MdButtonModule, MdCardModule, MdDrawerContainer, MdInputModule, MdListModule, MdPaginatorModule, MdSidenavModule,
    MdTableModule
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

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/admin/', '.json');
}

@NgModule({
    imports: [
        NgCommonModule,
        AdministrationRoutingModule,
        MdButtonModule,
        MdCardModule,
        MdListModule,
        MdSidenavModule,
        MdInputModule,
        MdSidenavModule,
        MdTableModule,
        MdPaginatorModule,
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
        RolesComponent
    ]
})
export class AdministrationModule {

}
