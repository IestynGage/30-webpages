import test from 'node:test';
import assert from 'node:assert';
import { validChessNotation } from './chess';

test('Return true on valid notations', () => {
  assert.ok(validChessNotation('h4e1'), "Piece h4 moving onto e1");
});