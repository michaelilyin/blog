export abstract class TranslatedModel {

}

export class TranslatedModelImpl extends TranslatedModel {

    constructor(val: string) {
        super();
        this['en'] = val;
    }

}

export function getTranslation(model: TranslatedModel, lang: string): string {
    return model[lang] ? model[lang] : model['en'];
}
