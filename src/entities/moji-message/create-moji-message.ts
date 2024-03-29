import { CharacterMatrixMap } from './character-matrix-map';

export type CreateMojiMessageRequest = {
  message: string;
  messageEmoji: string;
  backgroundEmoji: string;
};

export function createMojiMessage({
  message,
  messageEmoji,
  backgroundEmoji,
}: CreateMojiMessageRequest) {
  const messageCharacters = [...message];

  const mojiMessageCharacters = messageCharacters.map((c) =>
    createMojiCharacter(c, messageEmoji, backgroundEmoji)
  );

  const mojiMessage = mojiMessageCharacters
    .filter(Boolean)
    .join(createCharacterGap(backgroundEmoji));

  if (!mojiMessage) {
    return mojiMessage;
  }

  const paddedMojiMessage = [
    createLine(backgroundEmoji),
    '\n',
    mojiMessage,
    '\n',
    createLine(backgroundEmoji),
  ].join('');

  return paddedMojiMessage;
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

  mojiCharacterCells.unshift(backgroundEmoji);
  mojiCharacterCells.push(backgroundEmoji);

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
  return `\n${createLine(emoji)}\n${createLine(emoji)}\n`;
}

function createLine(emoji: string) {
  return `${emoji.repeat(7)}`;
}
