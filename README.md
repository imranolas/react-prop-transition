<h1 align="center">react prop transition</h1>

<p align="center">
  <a title='License' href="https://raw.githubusercontent.com/imranolas/react-prop-transition/master/LICENSE">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a href="https://badge.fury.io/js/react-prop-transition">
    <img src="https://badge.fury.io/js/react-prop-transition.svg" alt="npm version" height="18">
  </a>
</p>

<h4 align="center">
  A component for easing props values
</h4>

<p align="center">
<img height="100" src='https://cloud.githubusercontent.com/assets/4206028/23095996/13e790c0-f60c-11e6-8707-9ac34c15d67a.gif' />
</p>



***

Heavily inspired by React Motion. The `<Transition>` component will proxy
props to a single functional child. When Transition receives new props it
will interpolate values on each animation frame until complete or interrupted.

The props object can be any object permitted by [`d3.interpolateObject`](https://github.com/d3/d3-interpolate#interpolateObject). In practice
this allows for transitions of numbers, arrays, colors (as understood by CSS)
and much more.

## Getting started

Install react-prop-transition using npm.

`npm install react-prop-transition --save`

## Usage

```js
import Transition from 'react-prop-transition';

<Transition props={{number: 0}}
            duration={400}
            easing="cubic" >
  {(props) => <span>{props.number}</span>}
</Transition>
```

## Api

| Props | Description |
|:---|:---|
| `props` | The props object to be eased. Permitted values can be numbers, colors, arrays, dates and strings with a numerical element. #[d3.interpolateObject](https://github.com/d3/d3-interpolate#interpolateObject)  |
| `easing` (optional) | Specifies the easing function as a string. [_Permitted options_](https://github.com/imranolas/react-prop-transition/blob/master/src/easing.js) |
| `duration` (optional) | The easing duration in ms |
