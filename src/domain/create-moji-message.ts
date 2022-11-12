import { CharacterMatrixMap } from './character-matrix-map';

const CHARACTER_GAP = '\n\n\n';
const EMPTY_CELL_GAP = '     ';

/**
 * Convert a message to a Moji Message.
 * @param message The message to convert.
 * @param emoji The emoji to build the Moji Message from.
 * @returns The converted Moji Message.
 */
export function createMojiMessage(message: string, emoji: string) {
  const messageCharacters = [...message];

  const mojiMessageCharacters = messageCharacters.map((c) => createMojiCharacter(c, emoji));

  const mojiMessage = mojiMessageCharacters.join(CHARACTER_GAP);

  return mojiMessage;
}

/**
 * Convert a message character to a Moji Message character
 * @param character A single character to convert.
 * @param emoji The emoji to build the Moji Message character from.
 * @returns The converted Moji Message character.
 */
function createMojiCharacter(character: string, emoji: string) {
  const upperCaseCharacter = character.toUpperCase();

  const characterMatrix = CharacterMatrixMap[upperCaseCharacter];

  if (!characterMatrix) {
    return '';
  }

  const moijCharacterRows = characterMatrix.map((row) => createMojiCharacterRow(row, emoji));

  return moijCharacterRows.join('\n');
}

/**
 * Convert a character matrix row to the appropiate emoji representation.
 * @param characterMatrixRow The row of character matrix cells.
 * @param emoji The emoji to convert the character matrix to.
 * @returns The converted character matrix row value.
 */
function createMojiCharacterRow(characterMatrixRow: boolean[], emoji: string) {
  const mojiCharacterCells = characterMatrixRow.map((cell) => createMojiCharacterCell(cell, emoji));

  return mojiCharacterCells.join('');
}

/**
 * Convert a character matrix cell to the appropiate emoji representation.
 * @param characterMatrixCell The binary value in the character matrix cell.
 * @param emoji The emoji to convert the character matrix to.
 * @returns The converted character matrix cell value.
 */
function createMojiCharacterCell(characterMatrixCell: boolean, emoji: string) {
  if (!characterMatrixCell) {
    return EMPTY_CELL_GAP;
  }

  return emoji;
}
