import type { PopupPickerController } from '@picmo/popup-picker';
import {
  CreateMojiMessageController,
  CreateMojiMessageView,
  CreateMojiMessageModel,
} from '..';
import { CreateMojiMessageStore } from '../../../domain';
import {
  CreateMojiMessageViewElements,
  EmojiSelectEvent,
} from '../create-moji-message-view';
import { when } from 'jest-when';

describe('create moji message feature', () => {
  let createMojiMessageStore: CreateMojiMessageStore;
  let elements: CreateMojiMessageViewElements;
  let mockDataLayerPush: jest.Mock;

  let emojiSelectListeners: ((e: EmojiSelectEvent) => void)[];

  const raiseEmojiSelect = (emoji: string) =>
    emojiSelectListeners.forEach((listener) =>
      listener({
        emoji,
      })
    );

  const submitMojiMessageForm = (
    message = 'Hello world',
    messageEmoji = '🌼',
    backgroundEmoji = '⚪️'
  ) => {
    elements.messageInput.value = message;
    elements.messageInput.dispatchEvent(new Event('input'));

    elements.messageEmojiPicker.click();
    raiseEmojiSelect(messageEmoji);

    elements.backgroundEmojiPicker.click();
    raiseEmojiSelect(backgroundEmoji);

    elements.createMojiMessageForm.submit();
  };

  beforeEach(() => {
    createMojiMessageStore = new CreateMojiMessageStore();

    const createMojiMessageForm = document.createElement('form');
    createMojiMessageForm.noValidate = true;
    createMojiMessageForm.id = '#messageForm';

    const messageInput = document.createElement('input');
    messageInput.required = true;

    const emojiPickerPopup = {
      addEventListener: jest.fn(),
      toggle: jest.fn(),
    };

    emojiSelectListeners = [];
    when(emojiPickerPopup.addEventListener)
      .calledWith('emoji:select', expect.anything())
      .mockImplementation((_, listener) => {
        emojiSelectListeners.push(listener);
      });

    elements = {
      createMojiMessageForm,
      messageInput,
      messageInputError: document.createElement('div'),
      messageEmojiPicker: document.createElement('button'),
      messageEmojiPickerError: document.createElement('div'),
      backgroundEmojiPicker: document.createElement('button'),
      emojiPickerPopup: emojiPickerPopup as unknown as PopupPickerController,
      mojiMessageOutputSection: document.createElement('div'),
      mojiMessageOutput: document.createElement('div'),
    };

    mockDataLayerPush = jest.fn();
    window.dataLayer = {
      push: mockDataLayerPush,
    };

    new CreateMojiMessageController(
      new CreateMojiMessageView(elements),
      new CreateMojiMessageModel(createMojiMessageStore)
    );
  });

  it('should output converted moji message', () => {
    submitMojiMessageForm();

    const mojiMessageOutput = elements.mojiMessageOutput.textContent;

    expect(mojiMessageOutput).toMatchSnapshot();
  });

  describe('validation', () => {
    it('should not convert moji message when form invalid', () => {
      submitMojiMessageForm('');

      const mojiMessageOutput = elements.mojiMessageOutput.textContent;

      expect(mojiMessageOutput).toBe('');
    });

    describe('message input', () => {
      it('should display message validation error when no message provided', () => {
        submitMojiMessageForm('');

        expect(elements.messageInputError.textContent).toBe(
          'Please enter a message.'
        );
        expect(elements.messageInput.classList).toContain('invalid');
      });

      it('should hide message validation error when message provided', () => {
        submitMojiMessageForm('');

        submitMojiMessageForm('Hello world');

        expect(elements.messageInputError.textContent).toBe('');
        expect(elements.messageInput.classList).not.toContain('invalid');
      });
    });

    describe('message emoji picker', () => {
      it('should display message emoji validation error when no emoji provided', () => {
        submitMojiMessageForm('Hello world', '');

        expect(elements.messageEmojiPickerError.textContent).toBe(
          'Please select an emoji.'
        );
        expect(elements.messageEmojiPicker.classList).toContain('invalid');
      });

      it('should hide message emoji validation error when emoji provided', () => {
        submitMojiMessageForm('Hello world', '');

        submitMojiMessageForm('Hello world', '🌼');

        expect(elements.messageEmojiPickerError.textContent).toBe('');
        expect(elements.messageEmojiPicker.classList).not.toContain('invalid');
      });
    });
  });

  describe('analytics', () => {
    it('should log convert_message event for moji message inputs', () => {
      submitMojiMessageForm();

      expect(mockDataLayerPush).toBeCalledWith({
        event: 'convert_message',
        message_length: 11,
        emoji: '🌼',
        background_emoji: '⚪️',
      });
    });
  });
});
