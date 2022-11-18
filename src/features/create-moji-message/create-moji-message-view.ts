import { PopupPickerController } from '@picmo/popup-picker';

export type EmojiSelectEvent = {
  emoji: string;
};

export type CreateMojiMessageViewElements = {
  createMojiMessageForm: HTMLFormElement;
  messageInput: HTMLInputElement;
  messageInputError: HTMLElement;
  messageEmojiPicker: HTMLButtonElement;
  messageEmojiPickerError: HTMLElement;
  backgroundEmojiPicker: HTMLButtonElement;
  emojiPickerPopup: PopupPickerController;
  mojiMessageOutputSection: HTMLElement;
  mojiMessageOutput: HTMLElement;
};

export class CreateMojiMessageView {
  private isPickingBackgroundEmoji: boolean;

  constructor(private elements: CreateMojiMessageViewElements) {
    this.isPickingBackgroundEmoji = false;

    this.elements.messageEmojiPicker.addEventListener('click', () => {
      this.openEmojiPicker(this.elements.messageEmojiPicker);

      this.isPickingBackgroundEmoji = false;
    });

    this.elements.backgroundEmojiPicker.addEventListener('click', () => {
      this.openEmojiPicker(this.elements.backgroundEmojiPicker);

      this.isPickingBackgroundEmoji = true;
    });
  }

  addFormSubmitListener(listener: (e: Event) => void) {
    this.elements.createMojiMessageForm.addEventListener('submit', listener);
  }

  setFormSubmitted() {
    this.elements.createMojiMessageForm.classList.add('form-submitted');
  }

  focusFirstInvalidInput() {
    const firstInvalidInput = document.querySelectorAll<HTMLElement>(
      '#messageForm .invalid'
    )[0];

    firstInvalidInput?.focus();
  }

  addMessageInputListener(listener: (e: Event) => void) {
    this.elements.messageInput.addEventListener('input', listener);
  }

  getMessageInputValue() {
    return this.elements.messageInput.value;
  }

  addMessageEmojiSelectListener(listener: (e: EmojiSelectEvent) => void) {
    this.addEmojiSelectListener(listener, () => !this.isPickingBackgroundEmoji);
  }

  showSelectedMessageEmoji(emoji: string) {
    this.elements.messageEmojiPicker.replaceChildren(emoji);
  }

  addBackgroundEmojiSelectListener(listener: (e: EmojiSelectEvent) => void) {
    this.addEmojiSelectListener(listener, () => this.isPickingBackgroundEmoji);
  }

  showSelectedBackgroundEmoji(emoji: string) {
    this.elements.backgroundEmojiPicker.replaceChildren(emoji);
  }

  getMessageInputValidity() {
    return this.elements.messageInput.validity;
  }

  setMessageInputValid() {
    this.elements.messageInput.classList.remove('invalid');
  }

  setMessageInputInvalid() {
    this.elements.messageInput.classList.add('invalid');
  }

  setMessageInputErrorMessage(message: string) {
    this.elements.messageInputError.textContent = message;
  }

  clearMessageInputErrorMessage() {
    this.elements.messageInputError.textContent = '';
  }

  setMessageEmojiPickerValid() {
    this.elements.messageEmojiPicker.classList.remove('invalid');
  }

  setMessageEmojiPickerInvalid() {
    this.elements.messageEmojiPicker.classList.add('invalid');
  }

  setMessageEmojiPickerErrorMessage(message: string) {
    this.elements.messageEmojiPickerError.textContent = message;
  }

  clearMessageEmojiPickerErrorMessage() {
    this.elements.messageEmojiPickerError.textContent = '';
  }

  showMojiMessageOutputSection() {
    this.elements.mojiMessageOutputSection.classList.remove('hidden');
  }

  setMojiMessageOutput(content: string) {
    this.elements.mojiMessageOutput.textContent = content;
  }

  private addEmojiSelectListener(
    listener: (e: EmojiSelectEvent) => void,
    shouldFire: () => boolean
  ) {
    this.elements.emojiPickerPopup.addEventListener('emoji:select', (e) => {
      if (!shouldFire()) {
        return;
      }

      listener(e);
    });
  }

  private openEmojiPicker(rootElement: HTMLButtonElement) {
    rootElement?.scrollIntoView?.({
      behavior: 'smooth',
    });

    this.elements.emojiPickerPopup.toggle({
      triggerElement: rootElement,
      referenceElement: rootElement,
    });
  }
}
