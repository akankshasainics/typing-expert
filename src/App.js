import logo from './logo.svg';
import react from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class App extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      position : 0,
      wrong_types : [],
      correcting: [],
      corrected : [],
    }
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

  get_key_information = () => {
    var current_state = [];
    for(var i=0; i < this.state.position +1 ; i++){
      var ch = this.props.text[i];
      var state = null;
      if(this.state.corrected.indexOf(i) != -1){
        state = "corrected";
      }

      else if(this.state.wrong_types.indexOf(i) != -1){
        state = "wrong typed";
      }

      else if(i >= this.state.position){
        state = "un typed";
      }

      else{
        state = "right typed";
      }

      var obj = {};
      obj[ch] = state;
      current_state.push(obj);
    }

    return current_state;
  }


  remove_from_wrong_types = () => {
      var index = this.state.wrong_types.indexOf(this.state.position -1);
      var wrong_types = this.state.wrong_types.slice();
      var correcting = this.state.correcting;

      if (index != -1) {
         wrong_types.splice(index, 1);
         correcting.push(this.state.position - 1);
      }

        this.setState({
          wrong_types: wrong_types,
          correcting: correcting
        });

  }

  make_characters = () => {
    var current_state = this.get_key_information();
    var characters = [];

    for (var i=0 ; i < current_state.length; i++) {
        characters.push(<Character character={current_state[i]} />);
    }

    for(var i= this.state.position+1; i < this.props.text.length; i++){
        var obj = {}
        var ch = this.props.text[i];
        obj[ch] = "un typed";
        characters.push(<Character character={obj} />);
    }
    return characters;
  }


  onKeyDown = (event) => {
    if (event.key === 'Backspace') {
      this.remove_from_wrong_types();
      this.setState({
        position : Math.max(this.state.position - 1,0),
      });
    }
  }

  push_to_corrected = () => {
    var index = this.state.correcting.indexOf(this.state.position);
    var correcting = this.state.correcting.slice();
    var corrected = this.state.corrected.slice();

    if (index != -1) {
       correcting.splice(index, 1);
       corrected.push(this.state.position);
    }

    this.setState({
        position : this.state.position + 1,
        correcting : correcting,
        corrected : corrected,
    });
  }


  handleKeyPress = (event) => {
    if(event.key != this.props.text[this.state.position]){
      var wrong_types = this.state.wrong_types;
      wrong_types.push(this.state.position);
      this.setState({
        position: this.state.position + 1,
        wrong_types: wrong_types
      });
      return;
    }
    this.push_to_corrected();
  }


  render(){
    if (this.state.position == this.props.text.length) {
      return (<>
          <h1 style={{color: "green"}}> Done! You are great. Your speed is 7000wpm</h1>
        </>)
    }
    
    var characters = this.make_characters();

        return (
      <>
      <div ref="mainDiv" tabIndex="0" onKeyPress={this.handleKeyPress} onKeyDown={this.onKeyDown}> 
        <span> {this.state.position} </span>
        <br/>
        <br/>
          <div>
              <span> {characters} </span>
          </div>
        <Keyboard Key={this.props.text[this.state.position]} />
      </div>
      </>
    );
  }
}


class Character extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      character_state : Object.freeze({"right typed":"green", "corrected":"yellow", "wrong typed":"red", "un typed":"grey"}),
    }
  }
  render(){
    for(var i in this.props.character){
      var ch = i;
      var state  = this.props.character[i];
    }

    return (<>
       <span class="p-3 text-grey-10" style={{color: this.state.character_state[state]}}> {ch} </span> 
      </>)
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

