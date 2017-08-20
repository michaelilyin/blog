import {NgModule} from '@angular/core';
import {ConfigurationService, ConfigurationServiceImpl} from './service/configuration.service';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService, LanguageServiceImpl} from './service/language.service';
import {TranslatedTextComponent} from './translated/text/translated-text.component';

@NgModule({
    imports: [
        HttpModule,
        HttpClientModule,
        ToastModule.forRoot()
    ],
    providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl },
        { provide: LanguageService, useClass: LanguageServiceImpl }
    ],
    declarations: [
        TranslatedTextComponent
    ],
    exports: [
        HttpModule,
        HttpClientModule,
        ToastModule,

        TranslatedTextComponent
    ]
})
export class CommonModule {

}
