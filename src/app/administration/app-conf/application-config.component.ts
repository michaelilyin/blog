import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {TranslatedModel, TranslatedModelImpl} from '../../common/translated/translated-model';
import {Configuration, ConfigurationService} from '../../common/service/configuration.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    templateUrl: 'application-config.component.html'
})
export class ApplicationConfigComponent {

    public configuration: Configuration;

    private configSubscription: Subscription;

    constructor(private permissionService: PermissionService,
                private configurationService: ConfigurationService) {
        this.configSubscription = this.configurationService.configuration.subscribe(config => {
           this.configuration = config;
        });
    }

    update() {
        this.configurationService.updateConfig(this.configuration);
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
