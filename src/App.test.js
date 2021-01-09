import { render, screen } from '@testing-library/react';
import { Analyzer} from './App';

test('expect no type', () => {
  expect((new Analyzer([], "hello")).get_typed_string()).toBe("");
  expect((new Analyzer([["a", 0], ["backspace", 0]], "hello")).get_typed_string()).toBe("");
  expect((new Analyzer([["a", 0], ["backspace", 0], ["b", 1]], "hello")).get_typed_string()).toBe("b");
});

test('expect 0 wpm', () => {
  var a = new Analyzer([], "hello");
  expect((new Analyzer([], "hello")).calculate_speed()).toBe(0);
});

test('expect 2 wpm', () => {
  var a = new Analyzer([["h", 0],["e", 454],["l", 39453],[" ",45678],["l", 53222],["o", 60000]], "hel lo");
  expect(a.get_typed_string()).toBe("hel lo");
  expect(a.get_correctly_typed_words()).toBe(2);
  expect(a.calculate_speed()).toBe(2);
});

test('expect "hel" as fastest wpm', () => {
  var a = new Analyzer([["h", 0],["e", 1],["l", 2],[" ", 3],["l", 7],["o", 11]], "hel lo");
  expect(a.get_typed_string()).toBe("hel lo");
  expect(a.get_correctly_typed_words()).toBe(2);
  expect(a.get_fasted_typed_word()).toBe("hel");
});

test('expect "lo" as slowest wpm', () => {
  var a = new Analyzer([["h", 0],["e", 1],["l", 2],[" ", 3],["l", 7],["o", 11]], "hel lo");
  expect(a.get_typed_string()).toBe("hel lo");
  expect(a.get_correctly_typed_words()).toBe(2);
  expect(a.get_slowest_typed_word()).toBe("lo");
});


test('split "hel" "lo"', () => {
  var a = new Analyzer([["h", 0],["e", 1],["l", 2],[" ", 3],["l", 7],["o", 11]], "hel lo");
  expect(a.get_all_words()).toStrictEqual([[0, 3],[4, 6]]);
});

test('test speed to substring "hel"  in "hello"', () => {
  var a = new Analyzer([["h", 0],["e", 1000],["l", 2000],[" ", 3],["l", 7],["o", 11]], "hel lo");
  expect(a.get_speed_between(0, 3)).toStrictEqual(30);
});
