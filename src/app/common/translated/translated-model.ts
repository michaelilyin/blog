import {environment} from '../../../environments/environment';

export abstract class TranslatedModel {
    [propName: string]: string;
}

export class TranslatedModelImpl extends TranslatedModel {

    constructor(val?: TranslatedModel) {
        super();
        if (val) {
            for (const prop in val) {
                if (val.hasOwnProperty(prop)) {
                    this[prop] = val[prop];
                }
            }
        }
    }

}

export function getTranslation(model: TranslatedModel, lang: string): string {
    return model[lang] ? model[lang] : model[environment.defaultLang];
}

export function translated(val: string): TranslatedModel {
    const data = {};
    data[environment.defaultLang] = val;
    return new TranslatedModelImpl(data);
}
