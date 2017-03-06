import { EstilPage } from './app.po';

describe('estil App', () => {
  let page: EstilPage;

  beforeEach(() => {
    page = new EstilPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
