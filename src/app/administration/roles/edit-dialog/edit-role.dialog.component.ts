
import {Component, Inject} from '@angular/core';
import {RoleRecord} from '../roles.table.service';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Role, RoleDataService, RoleDataServiceImpl} from './role.data.service';
import {Subscription} from 'rxjs/Subscription';
import {TranslatedModel, TranslatedModelImpl} from '../../../common/translated/translated-model';

@Component({
    selector: 'app-edit-role-dialog',
    templateUrl: 'edit-role.dialog.component.html',
    providers: [
        { provide: RoleDataService, useClass: RoleDataServiceImpl }
    ]
})
export class EditRoleDialogComponent {

    public options = ['one', 'two', 'three'];

    public roleName: TranslatedModel;
    public roleDescription: TranslatedModel;

    private role: Role;
    private roleSubscription: Subscription;

    constructor(@Inject(MD_DIALOG_DATA) private key: string,
                private roleDataService: RoleDataService,
                private dialogRef: MdDialogRef<EditRoleDialogComponent>) {
        this.roleSubscription = this.roleDataService.value.subscribe(role => {
            this.role = role;
            this.roleName = new TranslatedModelImpl(role.name);
            this.roleDescription = new TranslatedModelImpl(role.description);
        });
        this.roleDataService.load(key);
    }

    save() {
        this.dialogRef.close(true);
    }

    cancel() {
        this.dialogRef.close(false);
    }
}
