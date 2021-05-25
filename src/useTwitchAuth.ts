import { useState, useEffect } from 'react';

export interface TwitchAuthResponse {
  channelId: string;
  clientId: string;
  token: string;
  userId: string;
}

export interface TwitchAuthObject extends TwitchAuthResponse {
  authorized: boolean;
}

interface TwitchContext extends Window {
  Twitch: {
    ext: {
      onAuthorized: (callback: CallableFunction) => void;
    };
  };
}

export const useTwitchAuth = () => {
  const [twitchAuth, setTwitchAuth] = useState({
    authorized: false,
    channelId: '',
    clientId: '',
    token: '',
    userId: '',
  });

  useEffect(() => {
    const twitchContext = (window as Window) as TwitchContext;
    const itsTwitch = twitchContext.Twitch?.ext;
    if (itsTwitch) {
      twitchContext.Twitch.ext.onAuthorized((twitchResponse: TwitchAuthResponse) => {
        setTwitchAuth({ authorized: true, ...twitchResponse });
      });
    }
  },
  [window]);

  return twitchAuth;
};
