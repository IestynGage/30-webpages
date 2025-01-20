
const chessNoationRegex = /^[a-h][1-8][a-h][1-8]/;

/**
 * Checks if a string is in a chess move in full "Disambiguating moves".
 * It's only expected to be given a SINGLE move and not both players.
 * 
 * @returns True if string is a single move in full "".
 * @see https://en.wikipedia.org/wiki/Universal_Chess_Interface
 */
export function validChessNotation(notation:string): boolean {
  return chessNoationRegex.test(notation);
}