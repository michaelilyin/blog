import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/empty'
import {TranslatedModel} from '../translated/translated-model';

export class Configuration {
    readonly name: TranslatedModel;
    readonly timezone: string;
}

export interface ConfigData {
    name?: TranslatedModel
    timezone?: TranslatedModel
}

export abstract class ConfigurationService {
    readonly configuration = new ReplaySubject<Configuration>(1);

    abstract loadConfig();

    abstract updateConfig(config: ConfigData): Promise<any>;
}
