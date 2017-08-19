import {NgModule} from '@angular/core';
import {ConfigurationService, ConfigurationServiceImpl} from './service/configuration.service';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService, LanguageServiceImpl} from './service/language.service';

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
    exports: [
        HttpModule,
        HttpClientModule,
        ToastModule
    ]
})
export class CommonModule {

}
