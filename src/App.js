import logo from './logo.svg';
import react from 'react';
import ReactDOM from 'react-dom';
import './App.css';


export class Analyzer  {
  constructor(keystrokes, targetString){
    this.keystrokes = keystrokes;
    this.targetString = targetString;
   }
 
  get_typed_string(){
    var typed = "";
    for(var keystroke of this.keystrokes){
      if (keystroke[0]==="backspace" && typed.length >0){
        typed = typed.substring(0, typed.length - 1)
       } else {
         typed += keystroke[0];
       }
    }
    return typed
  }


  calculate_speed() {
      if(this.keystrokes.length <= 1){
        return 0;
      }
      var no_of_right_typed_words = this.get_correctly_typed_words();
      var start = this.keystrokes[0][1];
      var end = this.keystrokes[this.keystrokes.length -1][1];
      var wpmillisecond = no_of_right_typed_words/(end-start);
      var wpm = (wpmillisecond*1000*60).toFixed(2);
      return wpm;
  }

  get_correctly_typed_words() {
      var words = this.targetString.split(" ");
      var typed_words = this.get_typed_string().split(" ");   
      var no_of_right_typed_words = 0;
      var i = 0;
      while(i < typed_words.length && i < words.length){
        if( i === typed_words.length -1){
          no_of_right_typed_words += words[i].includes(typed_words[i]);
        }
        else if(typed_words[i] === words[i]){
          no_of_right_typed_words += 1;
        }
        i += 1;
      }
      return no_of_right_typed_words;
  }
}



class App extends react.Component {
  constructor(props){
    super(props);
    this.state = {
      keystrokes:   [],
      starting_time : (new Date()).getTime(),
      ending_time : Number.POSITIVE_INFINITY,
      position : 0,
      curr_typed: "",
      mis_typed: []
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
      if(this.state.mis_typed.indexOf(i) !== -1 && this.state.curr_typed[i] === this.props.text[i]){
        state = "corrected";
      }

      else if(i === this.state.position){
        state = "focused";
      }

      else if(i > this.state.position){
        state = "un typed";
      }

      else if(this.state.mis_typed.indexOf(i) !== -1){
        state = "wrong typed";
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


 make_characters = () => {
    var current_state = this.get_key_information();
    var characters = [];
    var i = 0;
    for (i=0 ; i < current_state.length; i++) {
        characters.push(<Character character={current_state[i]} />);
    }

    for(i= this.state.position+1; i < this.props.text.length; i++){
        var obj = {}
        var ch = this.props.text[i];
        obj[ch] = "un typed";
        characters.push(<Character character={obj} />);
    }
    return characters;
  }


  onKeyDown = (event) => {
    if (event.key === 'Backspace') {
      var position = Math.max(this.state.position -1, 0);
      this.setState((state) => ({
        position : position,
        keystrokes : state.keystrokes.concat([[event.key, (new Date()).getTime()]]),
        curr_typed: this.state.curr_typed.substring(0, position),
        ending_time: (new Date()).getTime()/1000,
      }));
    }
  }

  handleKeyPress = (event) => {
    this.setState((state) => ({
      keystrokes : state.keystrokes.concat([[event.key, (new Date()).getTime()]]),
      position: state.position + 1,
      curr_typed: state.curr_typed + event.key,
      ending_time: (new Date()).getTime(),
    }));

    if(event.key !== this.props.text[this.state.position]){
      var mis_typed = this.state.mis_typed;
      mis_typed.push(this.state.position);
      this.setState({
        mis_typed: mis_typed,
      });
      return;
    }
  }

  analyze_text = () => {
    var analyzer = new Analyzer(this.state.keystrokes, this.props.text);
    var wpm = analyzer.calculate_speed();
    return wpm;
  }
  
 
  render(){
    var characters = this.make_characters();
    var wpm = this.analyze_text();
    
    if (this.state.position === this.props.text.length) {
      return (<>
        <span> your speed is  {wpm} words/minute. </span>
        </>)
    }
  
    return (
      <>
      <div ref="mainDiv" tabIndex="0" onKeyPress={this.handleKeyPress} onKeyDown={this.onKeyDown}> 
        <progress class="m-10 bg-blue-100 blue h-1 w-11/12" value={this.state.position} max={this.props.text.length}></progress>

        <br/>
        <br/>
          <div>
              <span class="m-auto block w-max"> {characters} </span>
          </div>
            <span> {wpm} </span>
      </div>
      </>
    );
  }
}


class Character extends react.Component {
  constructor(props){
    super(props);
    this.state = {
        character_state : Object.freeze({"right typed":"bg-green-100", "corrected":"bg-yellow-100", "wrong typed":"bg-red-100", "un typed":"bg-gray-50", "focused": "bg-blue-100"}),
    }
  }
  render(){
    for(var i in this.props.character){
      var ch = i;
      var state  = this.props.character[i];
    }
    return (<>
       <span class={`${this.state.character_state[state]} p-1 m-0.5 text-gray-500 text-2xl rounded-sm`}> {ch} </span> 
      </>)
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

