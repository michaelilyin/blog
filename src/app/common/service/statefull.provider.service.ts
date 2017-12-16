import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

export interface StatefullProviderService {
    start();
    stop();
}

export abstract class StatefulDataService<T> {

    value = new ReplaySubject<T>(1);

    private sub: Subscription;

    constructor(private db: AngularFireDatabase) {

    }

    load(key: string) {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.db.object(`${this.base}/${key}`).valueChanges().subscribe(this.value);
    }

    abstract get base();
}
