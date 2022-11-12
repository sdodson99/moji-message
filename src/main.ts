import './index.css';
import copy from 'copy-to-clipboard';
import { createPopup } from '@picmo/popup-picker';
import { createMojiMessage, CreateMojiMessageForm } from './domain';

const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;
const messageInput = document.querySelector<HTMLInputElement>('#message')!;
const messageInputError = document.querySelector<HTMLElement>('#messageError')!;
const mojiOutputSection =
  document.querySelector<HTMLElement>('#mojiOutputSection')!;
const mojiOutput = document.querySelector<HTMLElement>('#mojiOutput')!;

const copyMojiMessage =
  document.querySelector<HTMLButtonElement>('#copyMojiMessage')!;
const copyPending = document.querySelector<HTMLElement>('#copyPending')!;
const copySuccess = document.querySelector<HTMLElement>('#copySuccess')!;

const messageEmojiPicker = document.querySelector<HTMLButtonElement>(
  '#messageEmojiPicker'
)!;
const messageEmojiError =
  document.querySelector<HTMLElement>('#messageEmojiError')!;

const emojiPickerPopup = createPopup(
  {},
  {
    position: 'bottom-start',
    className: 'emoji-picker-popup',
  }
);

messageEmojiPicker.addEventListener('click', () => {
  messageEmojiPicker.scrollIntoView();

  emojiPickerPopup.toggle({
    triggerElement: messageEmojiPicker,
    referenceElement: messageEmojiPicker,
  });
});

const createMessageForm: CreateMojiMessageForm = {};

emojiPickerPopup.addEventListener('emoji:select', ({ emoji }) => {
  emojiPickerPopup.referenceElement?.replaceChildren(emoji);

  if (emojiPickerPopup.referenceElement === messageEmojiPicker) {
    createMessageForm.messageEmoji = emoji;

    validateEmoji();

    return;
  }

  createMessageForm.backgroundEmoji = emoji;
});

const backgroundEmojiPicker = document.querySelector<HTMLButtonElement>(
  '#backgroundEmojiPicker'
)!;

backgroundEmojiPicker.addEventListener('click', () => {
  backgroundEmojiPicker.scrollIntoView();

  emojiPickerPopup.toggle({
    triggerElement: backgroundEmojiPicker,
    referenceElement: backgroundEmojiPicker,
  });
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  messageForm.classList.add('form-submitted');

  if (!validateMessageForm()) {
    const firstInvalidInput = document.querySelectorAll<HTMLElement>(
      '#messageForm .invalid'
    )[0];

    firstInvalidInput?.focus();

    return;
  }

  const mojiMessage = createMojiMessage({
    message: createMessageForm.message ?? '',
    messageEmoji: createMessageForm.messageEmoji ?? '',
    backgroundEmoji: createMessageForm.backgroundEmoji ?? '',
  });

  mojiOutput.textContent = mojiMessage;

  mojiOutputSection.classList.remove('hidden');

  window.dataLayer?.push({
    event: 'convert_message',
    message_length: createMessageForm.message?.length,
    emoji: createMessageForm.messageEmoji,
    background_emoji: createMessageForm.backgroundEmoji,
  });
});

function validateMessageForm() {
  const messageValid = validateMessage();
  const emojiValid = validateEmoji();

  return messageValid && emojiValid;
}

messageInput.addEventListener('input', () => {
  createMessageForm.message = messageInput.value;

  validateMessage();
});

function validateMessage() {
  if (messageInput.validity.valueMissing) {
    messageInput.classList.add('invalid');
    messageInputError.textContent = 'Please enter a message.';
    return false;
  }

  if (!messageInput.validity.valid) {
    messageInput.classList.add('invalid');
    messageInputError.textContent = 'Invalid message.';
    return false;
  }

  messageInput.classList.remove('invalid');
  messageInputError.textContent = '';

  return true;
}

function validateEmoji() {
  if (!createMessageForm.messageEmoji) {
    messageEmojiPicker.classList.add('invalid');
    messageEmojiError.textContent = 'Please select an emoji.';
    return false;
  }

  messageEmojiPicker.classList.remove('invalid');
  messageEmojiError.textContent = '';

  return true;
}

let copySuccessTimeout: number;

copyMojiMessage.addEventListener('click', () => {
  if (!mojiOutput.textContent) {
    return;
  }

  copy(mojiOutput.textContent);

  window.dataLayer?.push({
    event: 'copy_message',
    message_length: createMessageForm.message?.length,
    emoji: createMessageForm.messageEmoji,
    background_emoji: createMessageForm.backgroundEmoji,
  });

  copyPending.classList.add('hidden');
  copyPending.classList.remove('flex');

  copySuccess.classList.add('flex');
  copySuccess.classList.remove('hidden');

  window.clearTimeout(copySuccessTimeout);
  copySuccessTimeout = window.setTimeout(() => {
    copySuccess.classList.add('hidden');
    copySuccess.classList.remove('flex');

    copyPending.classList.add('flex');
    copyPending.classList.remove('hidden');
  }, 2000);
});
