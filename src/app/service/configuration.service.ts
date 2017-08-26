import {Injectable} from '@angular/core';
import {Configuration, ConfigurationService} from '../common/service/configuration.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {ToastsManager} from 'ng2-toastr';
import {TranslatedModelImpl} from '../common/translated/translated-model';
import {LogService} from 'ngx-log';

@Injectable()
export class ConfigurationServiceImpl extends ConfigurationService {
    constructor(private db: AngularFireDatabase,
                private toastService: ToastsManager,
                private logger: LogService) {
        super();
        this.logger.info('Create configuration service');
    }

    loadConfig() {
        this.db.object('/application/config')
            .map(object => {
                this.logger.log('Loaded config', object);
                return object as Configuration
            })
            .map(config => this.setDefaults(config))
            .subscribe(this.configuration);
    }

    updateConfig(config: Configuration): Promise<any> {
        this.logger.info('Save config', config);
        return this.db.object('/application/config').update(config) as Promise<any>;
    }

    private setDefaults(config: Configuration): Configuration {
        if (this.isEmpty(config.name)) {
            config.name = new TranslatedModelImpl('Blog application');
        }
        return config;
    }

    private isEmpty(arg: any): boolean {
        return arg === null || arg === undefined;
    }

}
