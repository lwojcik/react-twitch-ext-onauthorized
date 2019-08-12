import React from 'react';
import { create } from "react-test-renderer";
import TwitchAuthProvider, { TwitchAuthObject } from '../src';

const TestElement = (twitchAuth: TwitchAuthObject) => <div>TestElement {JSON.stringify(twitchAuth)}</div>;
const UnauthorizedTestElement = () => <div>UnauthorizedTestElement</div>;

// const mockTwitchExtensionContext = () => {
//   (global as any).window = jest.fn();
//   (global as any).window.Twitch = jest.fn();
//   (global as any).window.Twitch.ext = jest.fn();
//   (global as any).window.Twitch.ext.onAuthorized = jest.fn().mockImplementation((callback: CallableFunction) => {
//     console.log('woohoo!');
//     callback({
//       authorized: true,
//       channelId: 'test_channel_id',
//       token: 'test_token',
//       userId: 'test_user_id',
//       clientId: 'test_client_id',
//     });
//   });
// }
  // Object.defineProperty(window, 'Twitch', {
  //   value: {
  //     ext: {
  //       onAuthorized: (callback: Function) => jest.fn().mockImplementation(() => {
  //         console.log('im a mock lol!');
  //         callback({
  //           channelId: 'test_channel_id',
  //           token: 'test_token',
  //           userId: 'test_user_id',
  //           clientId: 'test_client_id',
  //         });
  //       }),
  //     },
  //   },
  //   writable: true,
  // });

// const resetTwitchExtensionContext = () => {
//   delete (window as any).Twitch;
// }

describe('TwitchAuthProvider', () => {
  // let windowSpy;
  it('should render child element inside a Twitch Extension context when no props are passed', () => {
    Object.defineProperty(window, 'Twitch', {
      value: {
        ext: {
          onAuthorized: jest.fn().mockImplementation((callback: Function) => {
            console.log('hello!');
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

    const element = create(
      <TwitchAuthProvider>
        {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
      </TwitchAuthProvider>
    );
  
    expect(element).toMatchSnapshot();
    // element.unmount();
  });
});

// it('renders as unauthorized outside of Twitch Extension context', () => {
//   resetTwitchExtensionContext();

//   const element = create(
//     <TwitchAuthProvider
//       enable={true}
//       unauthorized={<UnauthorizedTestElement />}
//     >
//       {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
//     </TwitchAuthProvider>
//   );

//   expect(element).toMatchSnapshot();
// });

// it('renders child element outside of Twitch Extension context when disabled', () => {
//   resetTwitchExtensionContext();

//   const element = create(
//     <TwitchAuthProvider
//       enable={false}
//       unauthorized={<UnauthorizedTestElement />}
//     >
//       {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
//     </TwitchAuthProvider>
//   );

//   expect(element).toMatchSnapshot();
// });

// it('renders child element inside a Twitch Extension context when enabled', () => {
//   mockTwitchExtensionContext();

//   const element = create(
//     <TwitchAuthProvider
//       enable={true}
//       unauthorized={<UnauthorizedTestElement />}
//     >
//       {(twitchAuth: TwitchAuthObject) => <TestElement {...twitchAuth} />}
//     </TwitchAuthProvider>
//   );

//   expect(element).toMatchSnapshot();
// });

