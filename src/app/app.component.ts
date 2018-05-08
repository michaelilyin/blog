import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private progressService: NgProgress) {

  }

  ngOnInit(): void {
    this.initRouter();
  }

  private initRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressService.start();
      } else if (event instanceof NavigationCancel
        || event instanceof NavigationEnd
        || event instanceof NavigationError) {
        this.progressService.done();
      }
    });
  }

  onTitleClick() {
    this.router.navigate(['home']);
  }
}
