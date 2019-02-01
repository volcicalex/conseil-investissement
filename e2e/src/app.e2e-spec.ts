import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create app page', () => {
    page.navigateTo();
    expect(page).toBeDefined();
  });
});
