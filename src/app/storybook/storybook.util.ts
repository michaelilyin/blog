import {action} from '@storybook/addon-actions';
import {Directive, ModuleWithProviders, Provider, Type} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {CoreModule} from '@app-core/core.module';
import {SharedModule} from '@app-shared/shared.module';
import {Router, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule as NGXLoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {MatBottomSheetRef} from '@angular/material';

export class StoryTranslationLoader implements TranslateLoader {

  constructor(private translation: object) {}

  getTranslation(lang: string): Observable<any> {
    return of(this.translation);
  }
}

export class StoryBookImportsConfigBuilder {
  private modules: (ModuleWithProviders | Type<any>)[] = [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    SharedModule.forRoot(),
    HttpClientModule,
    NGXLoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.OFF
    })
  ];

  withTranslation(translation: object): StoryBookImportsConfigBuilder {
    this.modules.push(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useValue: new StoryTranslationLoader(translation)
        }
      })
    );
    return this;
  }

  build(): (ModuleWithProviders | Type<any>)[] {
    return this.modules;
  }

  withCustom(modules: (ModuleWithProviders | Type<any>)[]) {
    this.modules.push(...modules);
    return this;
  }
}

export function storybookImports(): StoryBookImportsConfigBuilder {
  return new StoryBookImportsConfigBuilder();
}


export class StoryBookProvidersConfigBuilder {
  private providers: Provider[] = [{
    provide: APP_BASE_HREF,
    useValue: '/'
  }];

  withDialog(): StoryBookProvidersConfigBuilder {
    this.providers.push({
      provide: MatBottomSheetRef,
      useValue: {
        dismiss: action('dismiss dialog')
      }
    });
    return this;
  }

  withRouting(): StoryBookProvidersConfigBuilder {
    this.providers.push({
      provide: Router,
      useValue: {

      }
    });
    return this;
  }

  withCustom(providers: Provider[]): StoryBookProvidersConfigBuilder {
    this.providers.push(...providers);
    return this;
  }

  build(): Provider[] {
    return this.providers;
  }
}

export function storybookProviders(): StoryBookProvidersConfigBuilder {
  return new StoryBookProvidersConfigBuilder();
}

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirective {

}

export class StorybookDeclarationsConfigBuilder {
  private declarations: Type<any>[] = [];

  withRouting(): StorybookDeclarationsConfigBuilder {
    this.declarations.push(RouterLinkDirective);
    return this;
  }

  build(): Type<any>[] {
    return this.declarations;
  }
}

export function storybookDeclarations(): StorybookDeclarationsConfigBuilder {
  return new StorybookDeclarationsConfigBuilder();
}
