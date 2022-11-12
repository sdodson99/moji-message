import './index.css';
import { createPopup } from '@picmo/popup-picker';
import { createMojiMessage, CreateMojiMessageForm } from './domain';
import {
  CopyMojiMessageController,
  CopyMojiMessageModel,
  CopyMojiMessageView,
} from './features/copy-moji-message';

const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;
const messageInput = document.querySelector<HTMLInputElement>('#message')!;
const messageInputError = document.querySelector<HTMLElement>('#messageError')!;
const mojiOutputSection =
  document.querySelector<HTMLElement>('#mojiOutputSection')!;
const mojiMessageOutput = document.querySelector<HTMLElement>('#mojiOutput')!;

const copyMojiMessageButton =
  document.querySelector<HTMLButtonElement>('#copyMojiMessage')!;
const copyReadyDisplay = document.querySelector<HTMLElement>('#copyPending')!;
const copySuccessDisplay = document.querySelector<HTMLElement>('#copySuccess')!;

const createMessageForm: CreateMojiMessageForm = {
  backgroundEmoji: '◻️',
};

const copyMojiMessageView = new CopyMojiMessageView({
  copyMojiMessageButton,
  mojiMessageOutput,
  copyReadyDisplay,
  copySuccessDisplay,
});

const copyMojiMessageModel = new CopyMojiMessageModel();

new CopyMojiMessageController(copyMojiMessageView, copyMojiMessageModel);

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

  const createMojiMessageRequest = {
    message: createMessageForm.message ?? '',
    messageEmoji: createMessageForm.messageEmoji ?? '',
    backgroundEmoji: createMessageForm.backgroundEmoji ?? '',
  };

  const mojiMessage = createMojiMessage(createMojiMessageRequest);

  mojiMessageOutput.textContent = mojiMessage;

  mojiOutputSection.classList.remove('hidden');

  window.dataLayer?.push({
    event: 'convert_message',
    message_length: createMessageForm.message?.length,
    emoji: createMessageForm.messageEmoji,
    background_emoji: createMessageForm.backgroundEmoji,
  });

  copyMojiMessageModel.currentMojiMessageRequest = createMojiMessageRequest;
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
