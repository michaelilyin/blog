import {action} from '@storybook/addon-actions';
import {ModuleWithProviders, Provider, Type} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {CoreModule} from '@app-core/core.module';
import {SharedModule} from '@app-shared/shared.module';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule as NGXLoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {MatBottomSheetRef} from '@angular/material';
import {NgModuleMetadata} from '../../../node_modules/@storybook/angular/dist/client/preview/angular/types';
import {moduleMetadata} from '@storybook/angular';

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

  withRouting(): StoryBookImportsConfigBuilder {
    this.modules.push(
      RouterTestingModule.withRoutes([{
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
        canActivate: ['StoryCanActivate']
      }])
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
      provide: 'StoryCanActivate',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        action('navigation')(route, state);
        return false;
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

export class StorybookDeclarationsConfigBuilder {
  private declarations: Type<any>[] = [];

  withCustom(declarations: Type<any>[]): StorybookDeclarationsConfigBuilder {
    this.declarations.push(...declarations);
    return this;
  }

  build(): Type<any>[] {
    return this.declarations;
  }
}

export function storybookDeclarations(): StorybookDeclarationsConfigBuilder {
  return new StorybookDeclarationsConfigBuilder();
}

export class StorybookModuleMetaConfigBuilder {
  private declarations = storybookDeclarations();
  private imports = storybookImports();
  private providers = storybookProviders();

  constructor(...declarations: Type<any>[]) {
    this.declarations.withCustom(declarations);
  }

  withTranslation(translation: object): StorybookModuleMetaConfigBuilder {
    this.imports.withTranslation(translation);
    return this;
  }

  withRouting(): StorybookModuleMetaConfigBuilder {
    this.imports.withRouting();
    this.providers.withRouting();
    return this;
  }

  withDialog(): StorybookModuleMetaConfigBuilder {
    this.providers.withDialog();
    return this;
  }

  withImports(...imports: (ModuleWithProviders | Type<any>)[]): StorybookModuleMetaConfigBuilder {
    this.imports.withCustom(imports);
    return this;
  }

  withProviders(...providers: Provider[]): StorybookModuleMetaConfigBuilder {
    this.providers.withCustom(providers);
    return this;
  }

  build(): Partial<NgModuleMetadata> {
    return {
      declarations: this.declarations.build(),
      imports: this.imports.build(),
      providers: this.providers.build()
    }
  }

  buildMetadata(): (storyFn: () => any) => any {
    return moduleMetadata(this.build())
  }
}

export function storybookModule(...declarations: Type<any>[]): StorybookModuleMetaConfigBuilder {
  return new StorybookModuleMetaConfigBuilder(...declarations);
}
