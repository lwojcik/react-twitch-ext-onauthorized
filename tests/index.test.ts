import useTwitchAuth from '../src/index';

describe('index', () => {
  it('should expose useTwitchAuth custom hook', () => {
    expect(useTwitchAuth).toBeDefined();
  });
});
