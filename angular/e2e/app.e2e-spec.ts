import { FunniesComponentPage } from './app.po';

describe('funnies-component App', function() {
  let page: FunniesComponentPage;

  beforeEach(() => {
    page = new FunniesComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
