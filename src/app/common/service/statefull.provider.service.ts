import {ReplaySubject} from 'rxjs/ReplaySubject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import {Injectable} from '@angular/core';

export interface StatefullProviderService {
    start();
    stop();
}

@Injectable()
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

    save(key: string, data: T): Observable<any> {
        return Observable.fromPromise(this.db.object(`${this.base}/${key}`).set(data));
    }

    abstract get base();
}
