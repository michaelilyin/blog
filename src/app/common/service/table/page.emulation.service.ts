import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import {StatefullProviderService} from '../statefull.provider.service';
import {Keyable, mapToKeyable} from '../../keyable';
import {PageData, PageRequest, PageSupportService} from './page.support';

export abstract class PageEmulationService<T> extends PageSupportService<T> implements StatefullProviderService {
    public readonly values = new ReplaySubject<PageData<Keyable<T>>>(1);

    private readonly navigationStream = new Subject<PageRequest>();
    private serverStream: Observable<Keyable<T>[]>;

    private subscription: Subscription;

    public constructor(private readonly db: AngularFireDatabase) {
        super();
    }

    protected abstract get source(): string;

    public start() {
        this.serverStream = this.db.list<T>(this.source)
            .snapshotChanges()
            .map(mapToKeyable<T>());

        this.subscription = Observable.combineLatest(
            this.serverStream,
            this.navigationStream
        ).map((data) => {
            const serverData = data[0] as Keyable<T>[];
            const pageRequest = data[1] as PageRequest;
            const start = pageRequest.page * pageRequest.size;
            const end = start + pageRequest.size;
            const page = serverData.slice(start, end);
            return new PageData(page, serverData.length);
        }).subscribe((data) => {
            setTimeout(() => {
                this.values.next(data);
            });
        });
    }

    public stop() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    refresh(request: PageRequest) {
        setTimeout(() => this.navigationStream.next(request), 0);
    }
}
