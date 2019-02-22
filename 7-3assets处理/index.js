import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.scss';
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