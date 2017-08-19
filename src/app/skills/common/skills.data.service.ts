import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as jsyaml from 'js-yaml';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';

export class Technologies {
    groups: Group[];
    technologies: Map<string, Technology>;
    skills: Map<string, Skill>;
}

class MainDescriptor {
    datafiles: string[];
    groups: Group[];
}

class TechnologyDescriptor {
    id: string;
    name: string;
    description: string;
    skills: Skill[];
}

export class Group {
    intervals: Intervals[];
    skills: GroupSkill[];
}

export class GroupSkill {
    id: string;
    from: string;
    to: string;
}

export class Intervals {
    from: string;
    to: string;
}

export class Skill {
    id: string;
    name: string;
}

export class Technology {
    id: string;
    name: string;
    description: string;
}

export abstract class SkillsDataService {
    public readonly technologies = new ReplaySubject<Technologies>(1);
}

@Injectable()
export class SkillsDataServiceImpl extends SkillsDataService {
    constructor(http: Http) {
        super();
        http.get('technologies/index.yml').subscribe(response => {
            const descriptors = jsyaml.load(response.text()) as MainDescriptor;
            const defferFiles = descriptors.datafiles.map(file => http.get(`technologies/${file}`));
            Observable.zip(...defferFiles).subscribe(results => {
                const technologies = new Technologies();
                technologies.technologies = new Map<string, Technology>();
                technologies.skills = new Map<string, Skill>();
                results.forEach(value => {
                    const technologyDescriptor = jsyaml.load(value.text()) as TechnologyDescriptor;
                    const technology = new Technology();
                    technology.id = technologyDescriptor.id;
                    technology.name = technologyDescriptor.name;
                    technology.description = technologyDescriptor.description;
                    technologies.technologies.set(technology.id, technology);

                    technologyDescriptor.skills.forEach(skill => {
                       technologies.skills.set(skill.id, skill);
                    });
                });
                technologies.groups = descriptors.groups;
                this.technologies.next(technologies);
            });
        });
    }
}
