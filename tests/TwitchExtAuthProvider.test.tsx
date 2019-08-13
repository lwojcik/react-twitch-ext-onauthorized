import React from 'react';
import { mount } from 'enzyme';
import TwitchExtAuthProvider, { TwitchAuthObject } from '../src';

const TestElement = (twitchAuth: TwitchAuthObject) => <div>TestElement {JSON.stringify(twitchAuth)}</div>;
const UnauthorizedTestElement = () => <div>UnauthorizedTestElement</div>;

const mockTwitchExtensionContext = () => {
  Object.defineProperty(window, 'Twitch', {
    value: {
      ext: {
        onAuthorized: jest.fn().mockImplementation((callback: Function) => {
          callback({
            authorized: true,
            channelId: 'test_channel_id',
            token: 'test_token',
            clientId: 'test_client_id',
            userId: 'test_user_id',
          });
      }),
      },
    },
    writable: true,
  });
}

const resetTwitchExtensionContext = () => {
  (window as any).Twitch = null;
}

describe('TwitchAuthProvider', () => {
  it('should render child element inside a Twitch Extension context when no props are passed', () => {
    mockTwitchExtensionContext();

    const element = mount(
      <TwitchExtAuthProvider>
         {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
       </TwitchExtAuthProvider>
    );
    expect(element).toMatchSnapshot();
  });

  it('should render child element inside a Twitch Extension context when disabled', () => {
    mockTwitchExtensionContext();

    const element = mount(
      <TwitchExtAuthProvider enable={false}>
         {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
       </TwitchExtAuthProvider>
    );
    expect(element).toMatchSnapshot();
  });

  it('should render as unauthorized outside of a Twitch Extension context', () => {
    resetTwitchExtensionContext();
    
    const element = mount(
      <TwitchExtAuthProvider>
         {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
       </TwitchExtAuthProvider>
    );
    expect(element).toMatchSnapshot();
  });

  it('should render custom unauthorized element if passed as a prop outside of a Twitch Extension context', () => {
    resetTwitchExtensionContext();
    
    const element = mount(
      <TwitchExtAuthProvider unauthorized={<UnauthorizedTestElement />}>
         {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
       </TwitchExtAuthProvider>
    );
    expect(element).toMatchSnapshot();
  });
});