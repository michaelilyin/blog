import {TranslatedModel} from '../../common/translated/translated-model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PageEmulationService} from '../../common/service/table/page.emulation.service';

export class RoleRecord {
    $key: string;
    name: TranslatedModel;
    description: TranslatedModel;
}

export abstract class RolesTableService extends PageEmulationService<RoleRecord> {

}

@Injectable()
export class RolesTableServiceImpl extends RolesTableService {

    constructor(db: AngularFireDatabase) {
        super(db);
    }


    protected get source(): string {
        return '/roles';
    }
}
