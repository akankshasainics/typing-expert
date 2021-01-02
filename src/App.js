import logo from './logo.svg';
import react from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class App extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      position : 0,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.focusDiv();
  }

  componentDidUpdate() {
    if(this.state.active)
      this.focusDiv();
  }

  focusDiv() {
    ReactDOM.findDOMNode(this.refs.mainDiv).focus();
  }

  onKeyDown(event) {
    if (event.key === 'Backspace') {
      this.setState({
        position : this.state.position - 1,
      });
    }
  }

  handleKeyPress(event){
    if(event.key == this.props.text[this.state.position]){
      this.setState({
        position : this.state.position + 1,
      });
    }
  }


  render(){
    if (this.state.position == this.props.text.length) {
      return (<>
          <h1 style={{color: "green"}}> Done! You are great. Your speed is 7000wpm</h1>
        </>)
    }
    return (
      <>
      <div ref="mainDiv" tabIndex="0" onKeyPress={this.handleKeyPress} onKeyDown={this.onKeyDown}> 
        <span> {this.state.position} </span>
        <br/>
        <span style={{color: "green" , "font-size": 100}}> {this.props.text.substring(0, this.state.position)} </span><span style={{"font-size": 100}}> {this.props.text.substring(this.state.position, this.props.text.length)}</span>
        <br/>
        <Keyboard Key={this.props.text[this.state.position]} />
      </div>
      </>
    );
  }
}

class Analysis extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      wps : 0,
    }
  }
  render(){
    return (
        <span> Your wpm {this.props.wpm}} </span>
    );
  }


}
class Keyboard extends react.Component {
  constructor(props){
    super(props);
  }

 render(){
  return (
    <>
        <span> Press key {this.props.Key} </span>
    </>
  );
  }
}

export default App;

