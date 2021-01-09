import logo from './logo.svg';
import react from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import Lessons from './Lessons';
import { Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';


class Home extends react.Component {
  render(){
    if (nothing_in_url()) {
        return(
          <>
           <div class="center heading"> Welcome to typing expert </div>
            <div class="center">
              <h2 class="element-center">Lessons </h2>
              <ul class="element-center">
                <li>
                  <a href="/Lesson/1"> Lesson 1 </a>
                </li>
                <li>
                  <a href="/Lesson/2"> Lesson 2 </a>
                </li>
                <li>
                  <a href="/Lesson/3"> Lesson 3 </a>
                </li>
                <li>
                  <a href="/Lesson/4"> Lesson 4 </a>
                </li>
                <li>
                  <a href="/Lesson/5"> Lesson 5 </a>
                </li>
              </ul>
            </div>
          </>
        );
    }
    else {
      return(
        <Child />
      );
    }
  }
}

function nothing_in_url(){
  if(window.location.href === 'http://localhost:3000/'){
    return true;
  }
  return false;
}

function extract_id_from_current_url(){
  var id = window.location.href.slice(-1);
  return parseInt(id);
}

function Child() {
  let id = extract_id_from_current_url();
  return (
    <>
      <App text={Lessons[id]} />
    </>
  );
}


export default Home;
