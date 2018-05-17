import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import {first} from 'rxjs/operators';

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

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang(environment.defaultLang);
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.getTranslation(this.translateService.currentLang)
      .pipe(first())
      .subscribe(res => {
        this.ready = true;
      }, e => {
        this.broken = true;
      });
  }

}
