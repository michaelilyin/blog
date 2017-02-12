"use strict";
var protractor_1 = require('protractor');
describe('Start page', function () {
    beforeEach(function () {
        protractor_1.browser.get('');
    });
    var expectedMsg = 'Michael Ilyin';
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/../span')).getText()).toEqual(expectedMsg);
    });
    describe('should provide navigation', function () {
        it('to home', function () {
            expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/button[text="Home"]')).isPresent);
        });
        it('to blog', function () {
            expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/button[text="Blog"]')).isPresent);
        });
        it('to technologies', function () {
            expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/button[text="Technologies"]')).isPresent);
        });
        it('to projects', function () {
            expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/button[text="Projects"]')).isPresent);
        });
        it('to about me', function () {
            expect(protractor_1.element(protractor_1.by.xpath('//md-toolbar//nav/button[text="About me"]')).isPresent);
        });
        describe('to administrative settings', function () {
            var adminXpath = '//md-toolbar//nav/button[text="Administrative"]';
            it("via button", function () {
                expect(protractor_1.element(protractor_1.by.xpath(adminXpath)).isPresent);
            });
            it("and render final page", function () {
                protractor_1.element(protractor_1.by.xpath(adminXpath)).click();
                expect(protractor_1.element(protractor_1.by.xpath('//p[text()="Summary"]')).isPresent);
            });
        });
    });
});
//# sourceMappingURL=app.e2e.js.map
