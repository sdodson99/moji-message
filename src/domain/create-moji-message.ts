import { CharacterMatrixMap } from './character-matrix-map';

const CHARACTER_GAP = '\n\n\n';
const EMPTY_CELL_GAP = '     ';

export function createMojiMessage(message: string, emoji: string) {
  const messageCharacters = [...message];

  const mojiMessageCharacters = messageCharacters.map((c) =>
    createMojiCharacter(c, emoji)
  );

  const mojiMessage = mojiMessageCharacters.join(CHARACTER_GAP);

  return mojiMessage;
}

function createMojiCharacter(character: string, emoji: string) {
  const upperCaseCharacter = character.toUpperCase();

  const characterMatrix = CharacterMatrixMap[upperCaseCharacter];

  if (!characterMatrix) {
    return '';
  }

  const moijCharacterRows = characterMatrix.map((row) =>
    createMojiCharacterRow(row, emoji)
  );

  return moijCharacterRows.join('\n');
}

function createMojiCharacterRow(characterMatrixRow: boolean[], emoji: string) {
  const mojiCharacterCells = characterMatrixRow.map((cell) =>
    createMojiCharacterCell(cell, emoji)
  );

  return mojiCharacterCells.join('');
}

function createMojiCharacterCell(characterMatrixCell: boolean, emoji: string) {
  if (!characterMatrixCell) {
    return EMPTY_CELL_GAP;
  }

  return emoji;
}
