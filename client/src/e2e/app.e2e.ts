import {browser, element, by} from 'protractor';

describe('Start page', () => {

    beforeEach(function () {
        browser.get('');
    });

    const expectedMsg = 'Michael Ilyin';
    it('should display: ' + expectedMsg, () => {
        expect(element(by.xpath('//md-toolbar//nav/../a')).getText()).toEqual(expectedMsg);
    });

    describe('should provide navigation', () => {
        it('to blog', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text()="Blog"]')).isPresent);
        });

        it('to technologies', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text()="Technologies"]')).isPresent);
        });

        it('to projects', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text()="Projects"]')).isPresent);
        });
    });

});
