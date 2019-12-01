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
  [key: string]: unknown;
  Twitch: {
    [key:string]: unknown;
    ext: {
      [key:string]: unknown;
      onAuthorized: (callback: CallableFunction) => void;
    }
  }
}

const useTwitchAuth = () => {
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
      twitchContext.Twitch.ext.onAuthorized((twitchAuth: TwitchAuthResponse) => {
        setTwitchAuth({ authorized: true, ...twitchAuth })
      });
    }
  }, []);

  return twitchAuth;
}

export default useTwitchAuth;