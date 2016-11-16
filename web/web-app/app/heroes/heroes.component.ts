import {Component, OnInit} from "@angular/core";
import {Hero} from "../dto/hero";
import {HeroService} from "../services/hero.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "my-heroes",
    templateUrl: 'heroes.component.html',
    styleUrls: [ 'heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(private router: Router,
                private heroService: HeroService) { }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/heroes', this.selectedHero.id]);
    }
}