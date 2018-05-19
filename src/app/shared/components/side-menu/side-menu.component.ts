import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SideMenuGroup} from '@app-components/side-menu/side-menu-item';
import {NGXLogger} from 'ngx-logger';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribe} from '@app-shared/utils/rxjs';
import {MatDrawer} from '@angular/material';

class SideMenuGroupView {
  title: string;
  items: SideMenuItemView[];
}

class SideMenuItemView {
  title: string;
  routerLink: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {

  @Input()
  public items: SideMenuGroup[];

  public mode = 'side';
  public opened = true;

  public viewItems: SideMenuGroupView[];

  private xsSub: Subscription;

  constructor(private logger: NGXLogger,
              private breakPoint: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.logger.debug('Side menu initialization');
    this.viewItems = this.items.map(group => ({
      title: group.title,
      items: group.items.map(item => ({
        title: item.title,
        routerLink: item.commands.join('/')
      }))
    }));

    this.breakPoint.observe(Breakpoints.XSmall)
      .subscribe(res => {
        this.logger.debug('XS matches for menu', res.matches);
        this.opened = !res.matches;
        if (res.matches) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
      });
  }

  ngOnDestroy(): void {
    unsubscribe(this.xsSub);
  }

  linkClick() {
    if (this.mode === 'over') {
      this.opened = false;
    }
  }
}
