import {Component} from '@angular/core';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public particles = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    'z-index': -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  public particlesParams = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: false,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
      },
      size: {
        anim: {
          enable: true,
          speed: 1,
          size_min: 0.1,
          sync: false
        },
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1.5
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    }
  };


  public constructor(private scrollToService: ScrollToService) {

  }

  scrollTo(target: string) {
    this.scrollToService.scrollTo({
      target
    })
  }
}
