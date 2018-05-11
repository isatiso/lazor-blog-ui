import { ButlerModule } from './butler.module';

describe('ButlerModule', () => {
  let butlerModule: ButlerModule;

  beforeEach(() => {
    butlerModule = new ButlerModule();
  });

  it('should create an instance', () => {
    expect(butlerModule).toBeTruthy();
  });
});
