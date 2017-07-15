import {NgModule} from '@angular/core';
import {ConfigurationService, ConfigurationServiceImpl} from './service/configuration.service';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';

@NgModule({
    imports: [
        HttpModule,
        ToastModule.forRoot()
    ],
    providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl }
    ],
    exports: [
        ToastModule
    ]
})
export class CommonModule {

}
