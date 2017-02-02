import {browser, element, by} from 'protractor';

describe('Start page', () => {

    beforeEach(function () {
        browser.get('');
    });

    const expectedMsg = 'Michael Ilyin';
    it('should display: ' + expectedMsg, () => {
        expect(element(by.xpath('//md-toolbar//nav/../span')).getText()).toEqual(expectedMsg);
    });

    describe('should provide navigation', () => {
        it('to home', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text="Home"]')).isPresent);
        });

        it('to blog', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text="Blog"]')).isPresent);
        });

        it('to technologies', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text="Technologies"]')).isPresent);
        });

        it('to projects', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text="Projects"]')).isPresent);
        });

        it('to about me', () => {
            expect(element(by.xpath('//md-toolbar//nav/button[text="About me"]')).isPresent);
        });

        describe('to administrative settings', () => {
            const adminXpath = '//md-toolbar//nav/button[text="Administrative"]';

            it("via button", () => {
                expect(element(by.xpath(adminXpath)).isPresent);
            });

            it("and render final page", () => {
                element(by.xpath(adminXpath)).click();
                expect(element(by.xpath('//p[text()="Summary"]')).isPresent)
            });
        });
    });

});
