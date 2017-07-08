import { WebPage } from './app.po';

describe('web App', () => {
  let page: WebPage;

  beforeEach(() => {
    page = new WebPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitleText()).not.toEqual('');
  });
});
