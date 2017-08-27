import {Component} from '@angular/core';
import {PermissionService} from '../../common/profile/permission.service';
import {TranslatedModel, TranslatedModelImpl} from '../../common/translated/translated-model';
import {Configuration, ConfigurationService} from '../../common/service/configuration.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    templateUrl: 'application-config.component.html'
})
export class ApplicationConfigComponent {

    public appName: TranslatedModel;

    private configSubscription: Subscription;

    constructor(private permissionService: PermissionService,
                private configurationService: ConfigurationService) {
        this.loadData();
    }

    private loadData() {
        if (this.configSubscription) {
            this.configSubscription.unsubscribe();
        }
        this.configSubscription = this.configurationService.configuration.first().subscribe(config => {
            this.appName = new TranslatedModelImpl(config.name);
        });
    }

    update() {
        this.configurationService.updateConfig({
            name: this.appName
        });
    }

    reset() {
        this.loadData();
    }

    access(priv: string) {
        return this.permissionService.has(priv);
    }
}
