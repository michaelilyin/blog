import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {LogService} from 'ngx-log';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {getTranslation, TranslatedModel} from '../../../../common/translated/translated-model';
import {StatefullProviderService} from '../../../../common/service/statefull.provider.service';
import {mapToKeyable} from '../../../../common/keyable';
import {Option} from '../../../../common/multicomplete/multicomplete.component';

export class Role {
    name: TranslatedModel;
}

export class RoleOption extends Option {

}

export abstract class RolesDictionary implements StatefullProviderService {

    public all = new ReplaySubject<RoleOption[]>(1);

    abstract start();

    abstract stop();

    abstract convert(keys: string[]): RoleOption[];
}

@Injectable()
export class RolesDictionaryImpl extends RolesDictionary {

    private roles = new Map<String, Role>();

    private subscription: Subscription;

    constructor(private translateService: TranslateService,
                private db: AngularFireDatabase,
                private logger: LogService) {
        super();
    }

    start() {
        this.subscription = this.db.list<Role>('/roles').snapshotChanges()
            .map(mapToKeyable<Role>())
            .subscribe((roles) => {
                this.logger.info('Loaded roles', roles);
                this.roles.clear();
                const allList = [];
                roles.forEach(role => {
                    this.logger.info('Process role', role);
                    this.roles.set(role.key, role.val);
                    const option = new RoleOption(role.key, getTranslation(role.val.name, this.translateService.currentLang));
                    allList.push(option);
                    this.logger.info('Processed role', role);
                });
                this.logger.info('Send roles to listeners', allList);
                setTimeout(() => {
                    this.all.next(allList);
                });
                this.logger.info('Processed roles', this.roles);
            });
    }

    stop() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }


    get(key: string): Role {
        this.logger.info('Get role by name', key);
        const role = this.roles.get(key);
        if (!role) {
            this.logger.info('Unknown role', key, true);
            return null;
        }
        this.logger.info('Result', role);
        return role;
    }

    convert(keys: string[]): RoleOption[] {
        this.logger.info('Convert role codes', keys);
        return keys.map(key => {
            const role = this.roles.get(key);
            if (!role) {
                this.logger.info('Unknown role', key, true);
                return null;
            }
            return new RoleOption(key, getTranslation(role.name, this.translateService.currentLang));
        }).filter(r => r !== null);
    }

}
