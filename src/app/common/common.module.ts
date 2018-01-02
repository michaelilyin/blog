import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TranslatedTextComponent} from './translated/text/translated-text.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {CommonModule as NgCommonModule} from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule, MatChipsModule,
    MatDialogModule, MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatTooltipModule
} from '@angular/material';
import {TranslatedInputComponent} from './translated/input/translated-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LangSelectorComponent} from './translated/lang-selector/lang-selector.component';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedTextareaComponent} from './translated/textarea/translated-textarea.component';
import {RowMenuComponent} from './row-menu/row-menu.component';
import {AppModuleWrapperComponent} from './module-wrapper/app-module-wrapper.component';
import { MulticompleteComponent } from './multicomplete/multicomplete.component';
import { LoadingContentComponent } from './loading-content/loading-content.component';
import { DevStubComponent } from './dev-stub/dev-stub.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
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
        MatAutocompleteModule,
        MatListModule,
        MatFormFieldModule,
        MatChipsModule,
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
        MulticompleteComponent,
        LoadingContentComponent,
        DevStubComponent
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

        AppModuleWrapperComponent,
        MulticompleteComponent,
        LoadingContentComponent,
        DevStubComponent
    ]
})
export class CommonModule {

}
