import React, { ReactElement, useState, useEffect } from 'react';

export interface TwitchAuthResponse {
  channelId: string;
  clientId: string;
  token: string;
  userId: string;
}

export interface TwitchAuthObject extends TwitchAuthResponse {
  authorized: boolean;
}

export interface TwitchAuthProviderProps {
  unauthorized?: ReactElement,
  enable?: boolean,
  children: (auth: TwitchAuthObject) => ReactElement
}

interface TwitchContext extends Window {
  [key: string]: any;
  Twitch: {
    [key:string]: any;
    ext: {
      [key:string]: any;
      onAuthorized: (callback: CallableFunction) => void;
    }
  }
}

const TwitchAuthProvider = (props: TwitchAuthProviderProps) => {
  const enable = (typeof props.enable !== 'undefined') ? props.enable : true;
  const unauthorized = props.unauthorized || <div>Unauthorized</div>;
  const [auth, setAuth] = useState({ authorized: false, channelId: '', token: '', clientId: '', userId: '' });

  useEffect(() => {
    const getTwitchExtensionContext = (callback: CallableFunction) => {
      if (enable) {
        const twitchContext = window as TwitchContext;
        const itsTwitch = !!(twitchContext.Twitch && twitchContext.Twitch.ext);
        if (itsTwitch) {
          twitchContext.Twitch.ext.onAuthorized((twitchAuth: TwitchAuthResponse) => {
            callback({ authorized: true, ...twitchAuth })
          });
        }
      } else {
        callback({
          authorized: true,
          channelId: 'disabled',
          clientId: 'disabled',
          token: 'disabled',
          userId: 'disabled',
        });
      }
    }

    getTwitchExtensionContext((twitchAuthObject: TwitchAuthObject) => {
      setAuth(twitchAuthObject);
    });
  }, [enable]);
  
  return auth.authorized
    ? props.children(auth)
    : unauthorized;
}

export default TwitchAuthProvider;