# react-twitch-ext-onauthorized

[![npm (latest)](https://img.shields.io/npm/v/react-twitch-ext-onauthorized/latest.svg)](https://www.npmjs.com/package/react-twitch-ext-onauthorized)
[![Travis Build Status](https://travis-ci.com/lukemnet/react-twitch-ext-onauthorized.svg?branch=master)](https://travis-ci.com/lukemnet/react-twitch-ext-onauthorized)
[![Maintainability](https://api.codeclimate.com/v1/badges/96c28dcc8a308d1d756c/maintainability)](https://codeclimate.com/github/lukemnet/react-twitch-ext-onauthorized/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/96c28dcc8a308d1d756c/test_coverage)](https://codeclimate.com/github/lukemnet/react-twitch-ext-onauthorized/test_coverage)


React hook performing authorization with Twitch Extensions JavaScript Helper. It calls [`twitch.ext.onAuthorized`](https://dev.twitch.tv/docs/extensions/reference/#onauthorized) and returns authorization object.

While [`onAuthorized` is not the only method offered by The Extensions JavaScript Helper](https://dev.twitch.tv/docs/extensions/reference/#helper-extensions), it is one of the most important building blocks of each Twitch Extension.

## Install

```
npm install --save react-twitch-ext-onauthorized
```

## Usage

Example:

```javascript
import useTwitchAuth from 'react-twitch-ext-onauthorized';

const MyElement = () => {
  const twitchAuth = useTwitchAuth();
  return (
    <div>TestElement {JSON.stringify(twitchAuth)}</div>
  );
}
```

When authorization succeeds, ``twitchAuth`` contains the following properties:

```
{
  authorized: true,
  channelId: 'channel id goes here',
  clientId: 'client id goes here',
  token: 'token goes here',
  userId: 'user id goes here',
}
```

When loaded outside of Twitch context, ``twitchAuth`` properties contain empty strings and ``authorized`` property will remain ``false``:

```
{
  authorized: false,
  channelId: '',
  clientId: '',
  token: '',
  userId: '',
}
```

Note that you still have to provide Twitch JavaScript Helper yourself so that ``window.Twitch.ext`` resolves correctly -- see [Twitch docs on adding the Extension Helper](https://dev.twitch.tv/docs/extensions/building/#extension-helper-library).

## TypeScript

`react-twitch-ext-onauthorized` exposes two interfaces which can be used for type checking: `TwitchAuthResponse` and `TwitchAuthObject`.

To import them into your project add

```typescript
import { TwitchAuthResponse } from 'react-twitch-ext-onauthorized';

// OR

import { TwitchAuthObject } from 'react-twitch-ext-onauthorized';

```

### `TwitchAuthResponse`

Represents the shape of authorization object received from Twitch.

```typescript
interface TwitchAuthResponse {
  channelId: string;
  clientId: string;
  token: string;
  userId: string;
}
```

### `TwitchAuthObject`

Contains Twitch authorization object (`TwitchAuthResponse`) and a property `authorized` which denotes whether authorization was successful:

```typescript
interface TwitchAuthObject {
  authorized: boolean;
  channelId: string;
  clientId: string;
  token: string;
  userId: string;
}
```

## Contributions

Contributions of any kind are welcome.

You can contribute to React-twitch-ext-onauthorized by:

* submiting bug reports or feature suggestions
* improving documentation
* submitting pull requests

Before contributing be sure to read [Contributing Guidelines](https://github.com/lukemnet/react-twitch-ext-onauthorized/blob/master/CONTRIBUTING.md) and [Code of Conduct](https://github.com/lukemnet/react-twitch-ext-onauthorized/blob/master/CODE_OF_CONDUCT.md).

## Contributors

To all who contribute code, improve documentation, submit issues or feature requests - thank you for making Twitch-ebs-tools even better!

We maintain an [AUTHORS](https://github.com/lukemnet/react-twitch-ext-onauthorized/blob/master/AUTHORS) file where we keep a list of all project contributors. Please consider adding your name there with your next PR.


## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemnet/react-twitch-ext-onauthorized/master/LICENSE) for more information.

## Legal

This project is not authored, affiliated or endorsed in any way by Twitch.tv.
