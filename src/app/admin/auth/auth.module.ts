import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersComponent, RolesComponent],
  exports: [UsersComponent, RolesComponent]
})
export class AuthModule { }
