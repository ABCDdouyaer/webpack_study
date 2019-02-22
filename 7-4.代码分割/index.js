import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import style from './common/base.scss';

require('./index.scss');

class App extends React.Component{
  render(){
    return <>
      <div className={ style.box }></div>
      <div className={ style.imgBox }>
          <div></div><div></div><div></div>
      </div> 
    </>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
$('body').append('<h2>jQuery插入在index</h2>');