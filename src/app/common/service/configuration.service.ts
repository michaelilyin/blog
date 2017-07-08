import {Injectable} from '@angular/core';
import * as jsyaml from 'js-yaml';
import {Http} from '@angular/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export class Configuration {
    name: string;
    timezone: string;
}

export abstract class ConfigurationService {
    readonly configuration = new ReplaySubject<Configuration>(1);
}

@Injectable()
export class ConfigurationServiceImpl extends ConfigurationService {
    constructor(http: Http) {
        super();
        http.get('assets/config.yml').subscribe(response => {
            const config = jsyaml.load(response.text());
            this.configuration.next(config.config as Configuration);
        });
    }
}
