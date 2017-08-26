import {Injectable} from '@angular/core';
import {UserProfileService} from './userprofile.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';
import {subscribeOn} from 'rxjs/operator/subscribeOn';

export abstract class PermissionService {
    abstract has(permission: string): boolean;
}
