import {browser, by, element, ElementFinder, ExpectedConditions} from 'protractor';

export class WebPage {
    navigateTo() {
        return browser.get('/');
    }

    getTitleText() {
        browser.wait(ExpectedConditions.presenceOf(element(by.css('md-toolbar span.header'))), 2000);
        return element(by.css('md-toolbar span.header')).getText();
    }
}
