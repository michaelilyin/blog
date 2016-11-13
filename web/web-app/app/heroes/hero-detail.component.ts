import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {Hero} from "../dto/hero";
import {HeroService} from "../services/hero.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: "hero-detail.component.html"
})
export class HeroDetailComponent implements OnInit {

    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id).then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        this.location.back();
    }
}