import { CharacterMatrixMap } from './character-matrix-map';

export function createMojiMessage(
  message: string,
  messageEmoji: string,
  backgroundEmoji: string
) {
  const messageCharacters = [...message];

  const mojiMessageCharacters = messageCharacters.map((c) =>
    createMojiCharacter(c, messageEmoji, backgroundEmoji)
  );

  const mojiMessage = mojiMessageCharacters.join(
    createCharacterGap(backgroundEmoji)
  );

  return mojiMessage;
}

function createMojiCharacter(
  character: string,
  messageEmoji: string,
  backgroundEmoji: string
) {
  const upperCaseCharacter = character.toUpperCase();

  const characterMatrix = CharacterMatrixMap[upperCaseCharacter];

  if (!characterMatrix) {
    return '';
  }

  const moijCharacterRows = characterMatrix.map((row) =>
    createMojiCharacterRow(row, messageEmoji, backgroundEmoji)
  );

  return moijCharacterRows.join('\n');
}

function createMojiCharacterRow(
  characterMatrixRow: boolean[],
  messageEmoji: string,
  backgroundEmoji: string
) {
  const mojiCharacterCells = characterMatrixRow.map((cell) =>
    createMojiCharacterCell(cell, messageEmoji, backgroundEmoji)
  );

  return mojiCharacterCells.join('');
}

function createMojiCharacterCell(
  characterMatrixCell: boolean,
  messageEmoji: string,
  backgroundEmoji: string
) {
  if (!characterMatrixCell) {
    return backgroundEmoji;
  }

  return messageEmoji;
}

function createCharacterGap(emoji: string) {
  return `\n${emoji.repeat(5)}\n`;
}
