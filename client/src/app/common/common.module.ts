import {NgModule} from "@angular/core";
import {ConfigurationService, ConfigurationServiceImpl} from "./service/configuration.service";

@NgModule({
    imports: [

    ],
    providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceImpl }
    ]
})
export class CommonModule {

}
