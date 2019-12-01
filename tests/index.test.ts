import * as index from '../src/index';

describe('index', () => {
  it('should expose useTwitchAuth custom hook', () => {
    expect(index.useTwitchAuth).toBeDefined();
  });
});