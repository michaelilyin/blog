import {environment} from '../../../environments/environment';

export abstract class TranslatedModel {

}

export class TranslatedModelImpl extends TranslatedModel {

    constructor(val: string) {
        super();
        this[environment.defaultLang] = val;
    }

}

export function getTranslation(model: TranslatedModel, lang: string): string {
    return model[lang] ? model[lang] : model[environment.defaultLang];
}
