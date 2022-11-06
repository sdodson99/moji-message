import './global.css';
import copy from 'copy-to-clipboard';

const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#message');
const emojiInput = document.querySelector('#emoji');
const mojiOutput = document.querySelector('#mojiOutput');
const copyMojiMessage = document.querySelector('#copyMojiMessage');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = messageInput.value;
  const emoji = emojiInput.value;

  const mojiMessage = toMojiMessage(message, emoji);

  mojiOutput.innerText = mojiMessage;
});

copyMojiMessage.addEventListener('click', () => {
  copy(mojiOutput.innerText);
});

/**
 * Convert a message to a Moji Message.
 * @param {string} message The message to convert.
 * @param {string} emoji The emoji to build the Moji Message from.
 * @returns The converted Moji Message.
 */
function toMojiMessage(message, emoji) {
  return [...message].map((c) => toMojiMessageCharacter(c, emoji)).join('\n\n');
}

/**
 * Convert a message character to a Moji Message character
 * @param {string} character A single character to convert.
 * @param {string} emoji The emoji to build the Moji Message character from.
 * @returns The converted Moji Message character.
 */
function toMojiMessageCharacter(character, emoji) {
  if (character.length !== 1) {
    throw new Error('Must provide a single character.');
  }

  const upperCharacter = character.toUpperCase();

  const characterMatrix = CharacterMatrixMap[upperCharacter];

  if (!characterMatrix) {
    return '';
  }

  return characterMatrix
    .map((row) => {
      return row.map((b) => (b ? emoji : '     ')).join('');
    })
    .join('\n');
}

const CharacterMatrixMap = {
  A: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  B: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
  ],
  C: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  D: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 0],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  F: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  G: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  H: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  J: [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  K: [
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  M: [
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  N: [
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 0, 1],
  ],
  O: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  P: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  Q: [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
  ],
  R: [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 0],
    [1, 0, 1],
  ],
  S: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  U: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  V: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
  ],
  W: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  X: [
    [1, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
  Y: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  Z: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  ' ': [[0]],
};
