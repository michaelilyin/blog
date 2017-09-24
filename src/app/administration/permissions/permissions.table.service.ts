import {TranslatedModel} from '../../common/translated/translated-model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PageEmulationService} from '../../common/service/table/page.emulation.service';

export class PermissionRecord {
    name: TranslatedModel;
    description: TranslatedModel;
}

export abstract class PermissionsTableService extends PageEmulationService<PermissionRecord> {

}

@Injectable()
export class PermissionsTableServiceImpl extends PermissionsTableService {

    constructor(db: AngularFireDatabase) {
        super(db);
        super.run();
    }


    protected get source(): string {
        return '/perms';
    }
}
