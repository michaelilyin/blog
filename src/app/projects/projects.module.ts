import {NgModule} from '@angular/core';
import {ProjectsComponent} from './projects.component';
import {ProjectsRoutingModule} from './projects.routing.module';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '../common/common.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/projects/', '.json');
}

@NgModule({
    imports: [
        ProjectsRoutingModule,
        CommonModule,
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
        ProjectsComponent
    ]
})
export class ProjectsModule {

}
