import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TranslatedTextComponent} from './translated/text/translated-text.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {CommonModule as NgCommonModule} from '@angular/common';
import {
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdOptionModule,
    MdProgressSpinnerModule,
    MdSelectModule, MdTooltipModule
} from '@angular/material';
import {TranslatedInputComponent} from './translated/input/translated-input.component';
import {FormsModule} from '@angular/forms';
import {LangSelectorComponent} from './translated/lang-selector/lang-selector.component';
import {TranslateModule} from '@ngx-translate/core';
import {TranslatedTextareaComponent} from './translated/textarea/translated-textarea.component';
import {RowMenuComponent} from './row-menu/row-menu.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        NgCommonModule,
        MdProgressSpinnerModule,
        MdInputModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        MdMenuModule,
        MdSelectModule,
        MdOptionModule,
        MdTooltipModule,
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
        RowMenuComponent
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
        RowMenuComponent
    ]
})
export class CommonModule {

}
