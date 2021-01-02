import logo from './logo.svg';
import react from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends react.Component {
  constructor(){
    super();
    this.state = {
      keyPressed : ""
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.focusDiv();
  }

  componentDidUpdate() {
    if(this.state.active)
      this.focusDiv();
  }

  focusDiv() {
    console.log("in focus");
    ReactDOM.findDOMNode(this.refs.mainDiv).focus();
  }

  handleKeyPress(event){
    this.setState ({
      keyPressed : this.state.keyPressed + event.key,
    });
  }


 render(){
  return (
    <>
        <div ref="mainDiv" tabIndex="0" onKeyPress={this.handleKeyPress}> 
          <h2>Welcome to typing expert</h2>
          <span> Type these words </span>
          <br/>
          <span> there you go </span>
          <br/>
          <Keyboard keyPressed={this.state.keyPressed} />
        </div>
    </>
  );
  }
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
    const keys = this.state.keys.slice();
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
