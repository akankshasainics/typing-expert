import { render, screen } from '@testing-library/react';
import { Analyzer} from './App';

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('expect no type', () => {
  expect((new Analyzer([], "hello")).get_typed_string()).toBe("");
  expect((new Analyzer([["a", 0], ["backspace", 0]], "hello")).get_typed_string()).toBe("");
  expect((new Analyzer([["a", 0], ["backspace", 0], ["b", 1]], "hello")).get_typed_string()).toBe("b");
});

test('expect 0 wpm', () => {
  var a = new Analyzer([], "hello");
  expect((new Analyzer([], "hello")).calculate_speed()).toBe(0);
});

test('expect 1 wpm', () => {
  var a = new Analyzer([["h", 0],["e", 454],["l", 39453],[" ",45678],["l", 53222],["o", 60000]], "hel lo");
  expect(a.get_typed_string()).toBe("hel lo");
  expect(a.get_correctly_typed_words()).toBe(2);
  expect(a.calculate_speed()).toBe("2.00");
});
