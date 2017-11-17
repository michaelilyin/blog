import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {BlogComponent} from './blog.component';
import {BlogRoutingModule} from './blog.routing.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '../common/common.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/blog/', '.json');
}

@NgModule({
    imports: [
        BlogRoutingModule,
        MatButtonModule,
        MatCardModule,
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
        BlogComponent
    ]
})
export class BlogModule {

}
