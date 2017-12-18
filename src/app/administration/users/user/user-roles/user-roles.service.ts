import {StatefulDataService} from '../../../../common/service/statefull.provider.service';
import {Injectable} from '@angular/core';

export class UserRoles {
    [p: string]: boolean;
}

export abstract class UserRolesService extends StatefulDataService<UserRoles> {

}

@Injectable()
export class UserRolesServiceImpl extends UserRolesService {
    base = '/user-roles';
}
