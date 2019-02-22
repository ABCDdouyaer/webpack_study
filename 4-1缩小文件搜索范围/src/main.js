import React, { Component } from 'react';
import { render } from 'react-dom';
let obj = Object.assign({a: 1, b: 2}, {c: 3});
console.log(obj);

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));
