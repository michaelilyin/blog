import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/empty'
import {TranslatedModel} from '../translated/translated-model';

export class Configuration {
    name: TranslatedModel;
    timezone: string;
}

export abstract class ConfigurationService {
    readonly configuration = new ReplaySubject<Configuration>(1);

    abstract loadConfig();

    abstract updateConfig(config: Configuration): Promise<any>;
}
