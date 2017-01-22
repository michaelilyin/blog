import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../dto/hero';
import {Http, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map(response => response.json().data as Hero[]);
    }

    getHero(id: number): Observable<Hero> {
        return this.http.get(`${this.heroesUrl}/${id}`)
            .map(response => response.json().data as Hero);
    }

    update(hero: Hero): Observable<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .map(() => hero);
    }

    create(name: string): Observable<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .map(response => response.json().data as Hero);
    }

    delete(id: number): Observable<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .map(() => null);
    }

    // private handleError(error: any): Observable<any> {
    //     console.error('An error occurred', error);
    //     new Observable.create()
    //     // return Promise.reject(error.message || error);
    // }
}