import {StatefullProviderService} from '../../common/service/statefull.provider.service';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {getTranslation, TranslatedModel} from '../../common/translated/translated-model';
import {Subscription} from 'rxjs/Subscription';
import {LogService} from 'ngx-log';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {mapToKeyable} from '../../common/keyable';
import {Option} from '../../common/multicomplete/multicomplete.component';

export class Permission {
    name: TranslatedModel;
}

export class PermissionOption extends Option {

}

export abstract class PermissionsDictionary implements StatefullProviderService {

    public all = new ReplaySubject<PermissionOption[]>(1);

    abstract start();

    abstract stop();

    abstract convert(keys: string[]): PermissionOption[];
}

@Injectable()
export class PermissionsDictionaryImpl extends PermissionsDictionary {

    private permissions = new Map<String, Permission>();

    private subscription: Subscription;

    constructor(private translateService: TranslateService,
                private db: AngularFireDatabase,
                private logger: LogService) {
        super();
    }

    start() {
        this.subscription = this.db.list<Permission>('/perms').snapshotChanges()
            .map(mapToKeyable<Permission>())
            .subscribe((perms) => {
                this.logger.info('Loaded permissions', perms);
                this.permissions.clear();
                const allList = [];
                perms.forEach(perm => {
                    this.permissions.set(perm.key, perm.val);
                    const option = new PermissionOption(perm.key, getTranslation(perm.val.name, this.translateService.currentLang));
                    allList.push(option);
                });
                this.all.next(allList);
                this.logger.info('Processed permissions', this.permissions);
            });
    }

    stop() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }


    get(key: string): Permission {
        this.logger.info('Get permission by name', key);
        const permission = this.permissions.get(key);
        if (!permission) {
            this.logger.info('Unknown permission', key, true);
            return null;
        }
        this.logger.info('Result', permission);
        return permission;
    }

    convert(keys: string[]): PermissionOption[] {
        this.logger.info('Convert permission codes', keys);
        return keys.map(key => {
            const permission = this.permissions.get(key);
            if (!permission) {
                this.logger.info('Unknown permission', key, true);
                return null;
            }
            return new PermissionOption(key, getTranslation(permission.name, this.translateService.currentLang));
        }).filter(p => p !== null);
    }

}
