import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TranslatedTextComponent} from './translated/text/translated-text.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {CommonModule as NgCommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatTooltipModule
} from '@angular/material';
import {TranslatedInputComponent} from './translated/input/translated-input.component';
import {FormsModule} from '@angular/forms';
import {LangSelectorComponent} from './translated/lang-selector/lang-selector.component';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedTextareaComponent} from './translated/textarea/translated-textarea.component';
import {RowMenuComponent} from './row-menu/row-menu.component';
import {AppModuleWrapperComponent} from './module-wrapper/app-module-wrapper.component';
import { MulticompleteComponent } from './multicomplete/multicomplete.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgCommonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatOptionModule,
        MatTooltipModule,
        ToastModule.forRoot(),
        TranslateModule
    ],
    providers: [

    ],
    declarations: [
        LangSelectorComponent,
        TranslatedTextComponent,
        TranslatedTextareaComponent,
        TranslatedInputComponent,
        SignInDialogComponent,
        RowMenuComponent,
        AppModuleWrapperComponent,
        MulticompleteComponent
    ],
    entryComponents: [
        SignInDialogComponent
    ],
    exports: [
        HttpModule,
        HttpClientModule,
        ToastModule,
        NgCommonModule,

        LangSelectorComponent,
        TranslatedTextComponent,
        TranslatedTextareaComponent,
        TranslatedInputComponent,
        SignInDialogComponent,
        RowMenuComponent,

        AppModuleWrapperComponent
    ]
})
export class CommonModule {

}
