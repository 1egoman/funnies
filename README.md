![Funnies: Turn "Please Wait" into a smile.](https://cdn.rawgit.com/1egoman/funnies/master/assets/funnies.svg)

[![Travis build status](http://img.shields.io/travis/1egoman/funnies.svg?style=flat)](https://travis-ci.org/1egoman/funnies)
[![Code Climate](https://codeclimate.com/github/1egoman/funnies/badges/gpa.svg)](https://codeclimate.com/github/1egoman/funnies)
[![Test Coverage](https://codeclimate.com/github/1egoman/funnies/badges/coverage.svg)](https://codeclimate.com/github/1egoman/funnies)
[![Dependency Status](https://david-dm.org/1egoman/funnies.svg)](https://david-dm.org/1egoman/funnies)
[![devDependency Status](https://david-dm.org/1egoman/funnies/dev-status.svg)](https://david-dm.org/1egoman/funnies#info=devDependencies)

# In Javascript
```javascript
let funnies = new Funnies();
funnies.message(); // "Reticulating Splines..."
funnies.message(); // "Generating witty dialog..."
funnies.message(); // "Go ahead -- hold your breath!"
```

## In JSX
![React rendering](https://raw.githubusercontent.com/1egoman/funnies/master/assets/normal-react.gif)
```jsx
ReactDOM.render(<FunniesComponent />, node);
ReactDOM.render(<FunniesComponent interval={1000} />, node); // a new message every second
ReactDOM.render(<FunniesComponent customMessages={["You're too funny", "Thinking really hard..."]} />, node); // Add a few of your own messages
```
