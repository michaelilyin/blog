import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import {StatefullProviderService} from '../statefull.provider.service';

export class PageData<T> {
    constructor(public readonly values: T[],
                public readonly total: number) {

    }
}

export class PageRequest {
    constructor(public readonly page: number = 0,
                public readonly size: number = 10) {

    }
}

export abstract class PageEmulationService<T> implements StatefullProviderService {
    public readonly values = new ReplaySubject<PageData<T>>(1);

    private readonly navigationStream = new Subject<PageRequest>();
    private serverStream: Observable<T[]>;

    private subscription: Subscription;

    public constructor(private readonly db: AngularFireDatabase) {

    }

    protected abstract get source(): string;

    public start() {
        this.serverStream = this.db.list(this.source)
            .map(list => {
                return list as T[]
            });

        this.subscription = Observable.combineLatest(
            this.serverStream,
            this.navigationStream
        ).map((data) => {
            const serverData = data[0] as T[];
            const pageRequest = data[1] as PageRequest;
            const start = pageRequest.page * pageRequest.size;
            const end = start + pageRequest.size;
            const page = serverData.slice(start, end);
            return new PageData(page, serverData.length);
        }).subscribe(this.values);
    }

    public stop() {
        this.subscription.unsubscribe();
    }

    refresh(request: PageRequest) {
        setTimeout(() => this.navigationStream.next(request), 0);
    }
}
