import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//function get_lesson_name() {
//
//}
//function fetch_from_server(lesson) {
//  return {
//    1: "hello",
//    2: "bye"
//  }[lesson]
//}

//curr_lesson = get_lesson_name();
//text = fetch_from_server(curr_lesson)

ReactDOM.render(
  <React.StrictMode>
    <App text="hello"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
