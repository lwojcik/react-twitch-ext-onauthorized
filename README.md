# react-twitch-ext-onauthorized

[![Travis Build Status](https://travis-ci.org/lukemnet/react-twitch-ext-onauthorized.svg?branch=master)](https://travis-ci.org/lukemnet/react-twitch-ext-onauthorized)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/45oqe7ui0tojdbxn/branch/master?svg=true)](https://ci.appveyor.com/project/lwojcik/react-twitch-ext-onauthorized/branch/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/96c28dcc8a308d1d756c/maintainability)](https://codeclimate.com/github/lukemnet/react-twitch-ext-onauthorized/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/96c28dcc8a308d1d756c/test_coverage)](https://codeclimate.com/github/lukemnet/react-twitch-ext-onauthorized/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/lukemnet/react-twitch-ext-onauthorized.svg)](https://greenkeeper.io/)

React Higher Order Component performing authorization with Twitch Extensions JavaScript Helper. It calls [`twitch.ext.onauthorized`](https://dev.twitch.tv/docs/extensions/reference/#onauthorized) and passes received authorization object to a child component as a render prop.

While [`onauthorized` is not the only method offered by The Extensions JavaScript Helper](https://dev.twitch.tv/docs/extensions/reference/#helper-extensions), it is definitely  the most essential building block of each Twitch Extension.

# Requirements

* React v16.8 or newer (any version supporting [React Hooks](https://reactjs.org/docs/hooks-intro.html))

# Install

```
npm install --save react-twitch-ext-onauthorized
```

# Example

```javascript
import TwitchAuthProvider from 'react-twitch-ext-onauthorized';

const MyComponent = <div>My component<div>;

const Unauthorized = <div>This will be used if authorization fails</div>;

 <TwitchAuthProvider enable={true} unauthorized={<Unauthorized />}>
  {(twitchAuth) => <MyComponent />}
</TwitchAuthProvider>

```

Note that you still have to provide Twitch JavaScript Helper yourself at ``window.Twitch.ext``.

# Props

* `enable` - (default: `true`) enables or disables authorization. When set to `false`, component will not attempt to obtain authorization from JavaScript Helper. You can set `enable` to `false` for development or testing purposes.
* `unauthorized` (default: `<div>Unauthorized</div>`) - element to render if Twitch authorization fails (e.g. the extension is open outside of Twitch context)
* `children` (child component) - element which is supposed to be rendered with authorization object received from JavaScript Helper.

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemnet/react-twitch-ext-onauthorized/master/LICENSE) for more information.
