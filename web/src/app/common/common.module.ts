import {NgModule} from '@angular/core';
import {ConfigurationService, ConfigurationServiceImpl} from './service/configuration.service';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl }
    ]
})
export class CommonModule {

}
