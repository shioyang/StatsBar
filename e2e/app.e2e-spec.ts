import { StatsBarPage } from './app.po';

describe('stats-bar App', function() {
  let page: StatsBarPage;

  beforeEach(() => {
    page = new StatsBarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
