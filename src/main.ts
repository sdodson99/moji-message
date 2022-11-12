import './index.css';
import copy from 'copy-to-clipboard';
import { createPopup } from '@picmo/popup-picker';
import { createMojiMessage } from './domain';

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

const emojiPicker = document.querySelector<HTMLButtonElement>('#emojiPicker')!;
const emojiError = document.querySelector<HTMLElement>('#emojiError')!;

const emojiPickerPopup = createPopup(
  {},
  {
    triggerElement: emojiPicker,
    referenceElement: emojiPicker,
    position: 'bottom-start',
    className: 'emoji-picker-popup',
  }
);

emojiPicker.addEventListener('click', () => {
  emojiPickerPopup.toggle();
});

let selectedEmoji: string;

emojiPickerPopup.addEventListener('emoji:select', (e) => {
  emojiPicker.replaceChildren(e.emoji);

  selectedEmoji = e.emoji;

  validateEmoji();
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

  const message = messageInput.value;
  const emoji = selectedEmoji;

  const mojiMessage = createMojiMessage(message, emoji);

  mojiOutput.textContent = mojiMessage;

  mojiOutputSection.classList.remove('hidden');

  window.dataLayer?.push({
    event: 'convert_message',
    message_length: message.length,
    emoji,
  });
});

function validateMessageForm() {
  const messageValid = validateMessage();
  const emojiValid = validateEmoji();

  return messageValid && emojiValid;
}

messageInput.addEventListener('input', () => {
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
  if (!selectedEmoji) {
    emojiPicker.classList.add('invalid');
    emojiError.textContent = 'Please select an emoji.';
    return false;
  }

  emojiPicker.classList.remove('invalid');
  emojiError.textContent = '';

  return true;
}

let copySuccessTimeout: number;

copyMojiMessage.addEventListener('click', () => {
  if (!mojiOutput.textContent) {
    return;
  }

  copy(mojiOutput.textContent);

  const message = messageInput.value;
  const emoji = selectedEmoji;

  window.dataLayer?.push({
    event: 'copy_message',
    message_length: message.length,
    emoji,
  });

  copyPending.classList.add('hidden');
  copyPending.classList.remove('flex');

  copySuccess.classList.add('flex');
  copySuccess.classList.remove('hidden');

  clearTimeout(copySuccessTimeout);
  copySuccessTimeout = setTimeout(() => {
    copySuccess.classList.add('hidden');
    copySuccess.classList.remove('flex');

    copyPending.classList.add('flex');
    copyPending.classList.remove('hidden');
  }, 2000);
});
