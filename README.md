# react-twitch-ext-onauthorized

React Higher Order Component performing authorization with Twitch Extension Helper. It passes `auth` object.

# Requirements

* React v16.8 or newer (aka any version supporting [React Hooks](https://reactjs.org/docs/hooks-intro.html))

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

## License

Code is available under MIT license. See [LICENSE](https://raw.githubusercontent.com/lukemnet/react-twitch-ext-onauthorized/master/LICENSE) for more information.
