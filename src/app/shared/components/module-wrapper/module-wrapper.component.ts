import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '@app-environment/environment';
import {catchError, first} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-module-wrapper',
  templateUrl: './module-wrapper.component.html',
  styleUrls: ['./module-wrapper.component.scss']
})
export class ModuleWrapperComponent implements OnInit {

  @Input()
  public root: boolean;

  public ready = false;

  public broken = false;

  constructor(private translateService: TranslateService,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang(environment.defaultLang);
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.getTranslation(this.translateService.currentLang)
      .pipe(
        first(),
        catchError(e => {
          this.broken = true;
          return undefined;
        }))
      .subscribe(res => {
        if (res) {
          this.ready = true;
        }
      });
  }

  @ViewChild('container', {read: ViewContainerRef}) set container(container: ViewContainerRef) {
    if (container) {
      this.logger.debug('container', container);
      for (let i = 0; i < container.length; i++) {
        let viewRef = container.get(i);
        this.logger.debug('viewRef', viewRef);
        viewRef.detectChanges();
      }
    }
  }

}
