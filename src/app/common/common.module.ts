import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ToastModule} from 'ng2-toastr';
import {HttpClientModule} from '@angular/common/http';
import {TranslatedTextComponent} from './translated/text/translated-text.component';
import {SignInDialogComponent} from './profile/auth/sign-in.dialog.component';
import {CommonModule as NgCommonModule} from '@angular/common';
import {
    MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdMenuModule, MdOptionModule,
    MdProgressSpinnerModule, MdSelectionModule, MdSelectModule
} from '@angular/material';
import {TranslatedInputComponent} from './translated/input/translated-input.component';
import {FormsModule} from '@angular/forms';

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
        MdSelectionModule,
        MdOptionModule,
        ToastModule.forRoot()
    ],
    providers: [],
    declarations: [
        TranslatedTextComponent,
        TranslatedInputComponent,
        SignInDialogComponent
    ],
    entryComponents: [
        SignInDialogComponent
    ],
    exports: [
        HttpModule,
        HttpClientModule,
        ToastModule,
        NgCommonModule,
        TranslatedTextComponent,
        TranslatedInputComponent,
        SignInDialogComponent
    ]
})
export class CommonModule {

}
