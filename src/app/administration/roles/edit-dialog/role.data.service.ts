import {TranslatedModel} from '../../../common/translated/translated-model';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {Injectable} from '@angular/core';
import {LogService} from 'ngx-log';

export class Role {
    $key: string;
    name: TranslatedModel;
    description: TranslatedModel;
}

export abstract class RoleDataService {
    value = new Subject<Role>();

    abstract load(key: string);
}

@Injectable()
export class RoleDataServiceImpl extends RoleDataService {

    private subsctipion: Subscription;

    constructor(private db: AngularFireDatabase,
                private logger: LogService) {
        super();
    }

    load(key: string) {
        this.logger.log('Load role', key);
        if (this.subsctipion) {
            this.logger.log('Clear previous subscription');
            this.subsctipion.unsubscribe();
        }
        this.subsctipion = this.db.object(`/roles/${key}`).subscribe(this.value);
    }
}
