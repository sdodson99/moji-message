import './index.css';
import { createPopup } from '@picmo/popup-picker';
import {
  CopyMojiMessageController,
  CopyMojiMessageModel,
  CopyMojiMessageView,
} from '../features/copy-moji-message';
import {
  CreateMojiMessageView,
  CreateMojiMessageModel,
  CreateMojiMessageController,
} from '../features/create-moji-message';
import { CreateMojiMessageStore } from '../domain/create-moji-message-store';

const messageForm = document.querySelector<HTMLFormElement>('#messageForm')!;

const messageInput = document.querySelector<HTMLInputElement>('#message')!;
const messageInputError = document.querySelector<HTMLElement>('#messageError')!;

const messageEmojiPicker = document.querySelector<HTMLButtonElement>(
  '#messageEmojiPicker'
)!;
const messageEmojiError =
  document.querySelector<HTMLElement>('#messageEmojiError')!;

const backgroundEmojiPicker = document.querySelector<HTMLButtonElement>(
  '#backgroundEmojiPicker'
)!;

const mojiMessageOutputSection =
  document.querySelector<HTMLElement>('#mojiOutputSection')!;
const mojiMessageOutput = document.querySelector<HTMLElement>('#mojiOutput')!;

const copyMojiMessageButton =
  document.querySelector<HTMLButtonElement>('#copyMojiMessage')!;
const copyReadyDisplay = document.querySelector<HTMLElement>('#copyPending')!;
const copySuccessDisplay = document.querySelector<HTMLElement>('#copySuccess')!;

const emojiPickerPopup = createPopup(
  {},
  {
    position: 'bottom-start',
    className: 'emoji-picker-popup',
  }
);

const createMojiMessageStore = new CreateMojiMessageStore();
const createMojiMessageForm = {
  backgroundEmoji: '◻️',
};

new CreateMojiMessageController(
  new CreateMojiMessageView({
    createMojiMessageForm: messageForm,
    messageInput,
    messageInputError,
    messageEmojiPicker,
    messageEmojiPickerError: messageEmojiError,
    backgroundEmojiPicker,
    emojiPickerPopup,
    mojiMessageOutputSection,
    mojiMessageOutput,
  }),
  new CreateMojiMessageModel(createMojiMessageStore, createMojiMessageForm)
);

new CopyMojiMessageController(
  new CopyMojiMessageView({
    copyMojiMessageButton,
    mojiMessageOutput,
    copyReadyDisplay,
    copySuccessDisplay,
  }),
  new CopyMojiMessageModel(createMojiMessageStore)
);
