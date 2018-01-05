import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {ResolveEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';
import {LogService} from 'ngx-log';

@Injectable()
export class TitleProcessingService {

    private sub: Subscription;
    private translationSub: Subscription;

    constructor(private router: Router,
                private translateService: TranslateService,
                private titleService: Title,
                private log: LogService) {

    }

    public start() {
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof ResolveEnd) {
                if (this.translationSub) {
                    this.log.log('Cancel listen previous events');
                    this.translationSub.unsubscribe();
                }
                const resolveEnd = event as ResolveEnd;
                let state = resolveEnd.state.root;
                while (state.firstChild) {
                    state = state.firstChild;
                }
                if (state.data.title) {
                    const key = `COMMON.TITLE.${state.data.title}`;
                    this.translationSub = this.translateService.stream(key).subscribe(value => {
                        this.log.log('Set title', key + '=' + value);
                        if (value !== key) {
                            this.titleService.setTitle(value);
                        } else {
                            this.log.log('Not found in', this.translateService.store);
                        }
                    });
                } else {
                    this.log.log('Current state there is not has title data', event);
                }
            }
        })
    }

    public stop() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
