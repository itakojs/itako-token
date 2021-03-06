// dependencies
import test from 'ava';

// target
import Token from '../src';

// specs
test('token should be initialized with the text type', (t) => {
  const token = new Token;
  t.true(token.type === 'text');
  t.true(token.value === null);
});

test('should be change the properties via the `set*` method', (t) => {
  const token = new Token('text', 'foo');
  t.true(token.type === 'text');
  t.true(token.value === 'foo');

  t.true(token.setType('audio').type === 'audio');
  t.true(token.setValue('bar').value === 'bar');
  t.true(token.setOption('volume', 100).options.volume === 100);
  t.true(token.setMeta('transformer', 'johndue').meta.transformer === 'johndue');
});

test('clone is should be changed meta-information only', (t) => {
  const token = new Token('text', 'foo');
  t.true(token.type === 'text');
  t.true(token.value === 'foo');

  const clonedToken = token.clone({ transformer: 'johndue' });
  t.true(token !== clonedToken);
  t.true(token.type === clonedToken.type);
  t.true(token.value === clonedToken.value);
  t.true(token.meta.transformer === undefined);
  t.true(clonedToken.meta.transformer === 'johndue');
});

test('setOptions: it should override the duplicate key', (t) => {
  const token = new Token('text', 'foo', { pitch: 1 });
  token.setOptions({ volume: 0.5, pitch: 2 });

  t.true(Object.keys(token.options).length === 2);
  t.true(token.options.volume === 0.5);
  t.true(token.options.pitch === 2);
});

test('should expose the property at the JSON.stringify', (t) => {
  const string = JSON.stringify(new Token('text', 'foo'));
  t.true(string === JSON.stringify({ type: 'text', value: 'foo', options: {}, meta: {} }));
});
