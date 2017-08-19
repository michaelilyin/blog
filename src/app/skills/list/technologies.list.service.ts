import {Injectable} from '@angular/core';
import {SkillsDataService} from '../common/skills.data.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export class ListTechnology {
    name: string;
    duration: number;
    skills: ListSkill[];
}

export class ListSkill {
    duration: number;
    name: string;
}

export abstract class TechnologiesListService {
    public readonly technologies = new ReplaySubject<ListTechnology[]>(1);
}

@Injectable()
export class TechnologiesListServiceImpl extends TechnologiesListService {

    constructor(technologiesDataService: SkillsDataService) {
        super();
        technologiesDataService.technologies.subscribe(technologies => {
            technologies.groups.forEach(group => {
               // group.
            });
        });
    }

}
