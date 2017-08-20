import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/empty'
import {ToastsManager} from 'ng2-toastr';
import {TranslatedModel, TranslatedModelImpl} from '../translated/translated-model';

export class Configuration {
    name: TranslatedModel;
    timezone: string;
}

export abstract class ConfigurationService {
    readonly configuration = new ReplaySubject<Configuration>(1);

    abstract loadConfig();
}

@Injectable()
export class ConfigurationServiceImpl extends ConfigurationService {
    constructor(private db: AngularFireDatabase,
                private toastService: ToastsManager) {
        super();
    }

    loadConfig() {
        this.db.object('/application/config')
            .map(object => object as Configuration)
            .map(config => this.setDefaults(config))
            .subscribe(this.configuration);
    }

    private setDefaults(config: Configuration): Configuration {
        if (this.isEmpty(config.name)) {
            console.debug('use default application name');
            config.name = new TranslatedModelImpl('Blog application');
        }
        return config;
    }

    private isEmpty(arg: any): boolean {
        return arg === null || arg === undefined;
    }

}
