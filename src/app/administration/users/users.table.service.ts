import {TranslatedModel} from '../../common/translated/translated-model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {PageEmulationService} from '../../common/service/table/page.emulation.service';

export class UserRecord {
    name: string;
    email: string;
}

export abstract class UsersTableService extends PageEmulationService<UserRecord> {

}

@Injectable()
export class UsersTableServiceImpl extends UsersTableService {

    constructor(db: AngularFireDatabase) {
        super(db);
    }


    protected get source(): string {
        return '/user-list';
    }
}
