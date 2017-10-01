import {TranslatedModel} from '../../../common/translated/translated-model';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {Injectable} from '@angular/core';
import {LogService} from 'ngx-log';
import {Observable} from 'rxjs/Observable';

export class Role {
    $key: string;
    name: TranslatedModel;
    description: TranslatedModel;
    permissions: { [p: string]: boolean };
}

export class Permission {
    $key: string;
    name: TranslatedModel;
}

export abstract class RoleEditService {
    value = new Subject<Role>();

    abstract load(key: string);

    abstract loadPermissions(): Observable<Permission[]>;
}

@Injectable()
export class RoleEditServiceImpl extends RoleEditService {

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
        this.subsctipion = this.db.object(`/roles/${key}`)
            .map(role => {
                this.logger.info('Loaded role', role);
                return role;
            }).subscribe(this.value);
    }


    loadPermissions(): Observable<Permission[]> {
        return this.db.list('/perms').map(perms => {
            this.logger.info('Loaded perms', perms);
            return perms as Permission[];
        });
    }
}
