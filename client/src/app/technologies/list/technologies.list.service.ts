import {Injectable} from "@angular/core";
import {TechnologiesDataService} from "../common/technologies.data.service";

export abstract class TechnologiesListService {

}

@Injectable()
export class TechnologiesListServiceImpl extends TechnologiesListService {

    constructor(technologiesDataService: TechnologiesDataService) {
        super();
        technologiesDataService.technologies.subscribe(technologies => {

        });
    }

}
