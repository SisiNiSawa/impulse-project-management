import { ElectronProjectManagementPage } from './app.po';

describe('electron-project-management App', () => {
  let page: ElectronProjectManagementPage;

  beforeEach(() => {
    page = new ElectronProjectManagementPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
