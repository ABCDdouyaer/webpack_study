import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.scss';

import {c2} from './utils.js';



const PI = Math.PI;
console.log(PI);
c2();

class Index extends React.Component{
  render(){
    return <div className={ style.box }>
       <h2>hello webpack</h2>
       <div className={ style.imgBox }></div>
    </div>
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));