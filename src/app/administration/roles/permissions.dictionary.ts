import {StatefullProviderService} from '../../common/service/statefull.provider.service';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {getTranslation, TranslatedModel} from '../../common/translated/translated-model';
import {Subscription} from 'rxjs/Subscription';
import {LogService} from 'ngx-log';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export class Permission {
    $key: string;
    name: TranslatedModel;
}

export class PermissionOption {
    constructor(public readonly key: string, public readonly label: string) {}
}

export abstract class PermissionsDictionary implements StatefullProviderService {

    public all = new ReplaySubject<PermissionOption[]>(1);

    abstract start();

    abstract stop();

    abstract getName(key: string);
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
        this.subscription = this.db.list('/perms').subscribe((perms: Permission[]) => {
            this.logger.info('Loaded permissions', perms);
            this.permissions.clear();
            const allList = [];
            perms.forEach(perm => {
               this.permissions.set(perm.$key, perm);
                const option = new PermissionOption(perm.$key, getTranslation(perm.name, this.translateService.currentLang));
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


    getName(key: string) {
        this.logger.info('Get permission by name', key);
        const permission = this.permissions.get(key);
        if (!permission) {
            this.logger.info('Unknown permission', key, true);
            return null;
        }
        const result = getTranslation(permission.name, this.translateService.currentLang);
        this.logger.info('Result', result);
        return result;
    }

}
