import {Field, FieldType, Type} from '@app-shared/metamodel/model/metamodel.model';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

const USER_FIELDS: Field[] = [
  {
    key: 'id',
    name: 'MODEL.USER.FIELDS.ID',
    type: FieldType.ID
  }, {
    key: 'username',
    name: 'MODEL.USER.FIELDS.USERNAME',
    type: FieldType.STRING
  }, {
    key: 'email',
    name: 'MODEL.USER.FIELDS.EMAIL',
    type: FieldType.STRING
  }, {
    key: 'firstName',
    name: 'MODEL.USER.FIELDS.FIRST-NAME',
    type: FieldType.STRING
  }, {
    key: 'lastName',
    name: 'MODEL.USER.FIELDS.LAST-NAME',
    type: FieldType.STRING
  }
];

export const USER_META: Type = {
  key: 'user',
  name: 'MODEL.USER.NAME',
  fields: USER_FIELDS
};
