import {NgModule} from '@angular/core';
import {SkillsRoutingModule} from './skills.routing.module';
import {SkillsComponent} from './skills.component';
import {ListComponent} from './list/list.component';
import {TimelineComponent} from './timeline/timeline.component';
import {SkillsDataService, SkillsDataServiceImpl} from './common/skills.data.service';
import {MatTabsModule} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '../common/common.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/skills/', '.json');
}

@NgModule({
    imports: [
        SkillsRoutingModule,
        MatTabsModule,
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
        SkillsComponent,
        ListComponent,
        TimelineComponent
    ],
    providers: [
        { provide: SkillsDataService, useClass: SkillsDataServiceImpl }
    ]
})
export class SkillsModule {

}
