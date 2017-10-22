[![Travis build status](http://img.shields.io/travis/1egoman/funnies.svg?style=flat)](https://travis-ci.org/1egoman/funnies)
[![Dependency Status](https://david-dm.org/1egoman/funnies.svg)](https://david-dm.org/1egoman/funnies)
[![devDependency Status](https://david-dm.org/1egoman/funnies/dev-status.svg)](https://david-dm.org/1egoman/funnies#info=devDependencies)

<img src="https://1egoman.github.io/funnies/funnies.svg" width="200" />

# Funnies
A flexible way to add funny loading messages to webapps with optional react support.

# Examples and Demo
As of funnies `1.2.0`, funnies ships with examples. Take a look at
https://1egoman.github.io/funnies/ or build them locally by cloning down this repository, then
running `npm install && gulp example`. This will start up a local server on port 8080.

<br/>
<br/>

# Usage

## Javascript
```javascript
import Funnies from 'funnies';
let funnies = new Funnies();
funnies.message(); // "Reticulating Splines..."
funnies.message(); // "Generating witty dialog..."
funnies.message(); // "Go ahead -- hold your breath!"
```

## React Component
![React rendering](https://raw.githubusercontent.com/1egoman/funnies/master/assets/normal-react.gif)
```jsx
import {FunniesComponent} from 'funnies';
ReactDOM.render(<FunniesComponent />, node);
ReactDOM.render(<FunniesComponent interval={1000} />, node); // a new message every second
ReactDOM.render(<FunniesComponent customMessages={["You're too funny", "Thinking really hard..."]} />, node); // Add a few of your own messages
```

### React Styles
Here's some css to properly animate funnies in the react component. Totally not required!
```css
.funnies-text {
  transition: opacity 250ms ease-in-out;
}
.funnies-text.funnies-enter {
  opacity: 0;
}
.funnies-text.funnies-enter-active {
  opacity: 0;
}
.funnies-text.funnies-leave {
  display: none;
}
.funnies-text.funnies-leave-active {
  opacity: 0;
}
```

## jQuery
Odan wrote a great [jQuery plugin](https://github.com/odan/funnies-jquery-plugin) for Funnies!
```javascript
import $ from 'jquery';
// (include js/jquery.funnies.js)

$('element').funnies();
```


# Troubleshooting/FAQ

- **Does this work in both the client and server-side?**

  Yes. Either include `dist/funnies.min.js` within your page and use `window.Funnies`, or use node/browserify/webpack to require the module.

- **Can I return a funny message within preformatted HTML?**

  Yes, try `funnies.messageHTML()`.

- **I want to add a funny message!**

  Create a fork, add your message to `src/funnies.js`, then create a pull
  request.

- **Something isn't working properly.**
  - Send me a tweet `@rgausnet` and I'll help you out asap.
  - Use Github's issue tracker.

# Areas to improve

- Angular bindings would be great.
