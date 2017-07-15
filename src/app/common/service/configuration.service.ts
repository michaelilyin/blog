import {Injectable} from '@angular/core';
import * as jsyaml from 'js-yaml';
import {Http} from '@angular/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty'
import {ToastsManager} from 'ng2-toastr';

export class Configuration {
    name: string;
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
            config.name = 'Blog application';
        }
        return config;
    }

    private isEmpty(arg: any): boolean {
        return arg === null || arg === undefined;
    }

}
