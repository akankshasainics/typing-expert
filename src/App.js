import logo from './logo.svg';
import react from 'react';
import './App.css';

function App() {
  return (
    <>
        <span>Welcome to typing expert</span>
        <Keyboard keyPressed={2} />
    </>
  );
}


class Keyboard extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      keys : Array(26).fill(null),
      heighlighted_key : null
    }
  }

  HeighlightKey(key){
    const keys = this.state.keys;
    keys[key] = true
    this.state = {
      keys : keys,
      heighlighted_key : key
    }
    return ( <span> {key} </span>);
  }

  render(){
    return (<span> {this.HeighlightKey(this.props.keyPressed)} </span>);
  }
}


export default App;
