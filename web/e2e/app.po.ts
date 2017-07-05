import { browser, by, element } from 'protractor';

export class WebPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('md-toolbar span.header')).getText();
  }
}
