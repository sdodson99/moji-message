import { CreateMojiMessageModel } from './create-moji-message-model';
import {
  CreateMojiMessageView,
  EmojiSelectEvent,
} from './create-moji-message-view';

export class CreateMojiMessageController {
  constructor(
    private createMojiMessageView: CreateMojiMessageView,
    private createMojiMessageModel: CreateMojiMessageModel
  ) {
    this.createMojiMessageView.addFormSubmitListener((e) => {
      this.handleMojiMessageFormSubmit(e);
    });

    this.createMojiMessageView.addMessageInputListener(() => {
      this.handleMessageInput();
    });

    this.createMojiMessageView.addMessageEmojiSelectListener((e) => {
      this.handleMessageEmojiSelect(e);
    });

    this.createMojiMessageView.addBackgroundEmojiSelectListener((e) => {
      this.handleBackgroundEmojiSelect(e);
    });
  }

  private handleMojiMessageFormSubmit(event: Event) {
    event.preventDefault();

    this.createMojiMessageView.setFormSubmitted();

    if (!this.validateMessageForm()) {
      return this.createMojiMessageView.focusFirstInvalidInput();
    }

    const mojiMessage = this.createMojiMessageModel.createMojiMessage();

    this.createMojiMessageView.setMojiMessageOutput(mojiMessage);
    this.createMojiMessageView.showMojiMessageOutputSection();
  }

  private handleMessageInput() {
    this.createMojiMessageModel.createMessageForm.message =
      this.createMojiMessageView.getMessageInputValue();

    this.validateMessage();
  }

  private handleMessageEmojiSelect({ emoji }: EmojiSelectEvent) {
    this.createMojiMessageView.showSelectedMessageEmoji(emoji);

    this.createMojiMessageModel.createMessageForm.messageEmoji = emoji;

    this.validateMessageEmoji();
  }

  private handleBackgroundEmojiSelect({ emoji }: EmojiSelectEvent) {
    this.createMojiMessageView.showSelectedBackgroundEmoji(emoji);
    this.createMojiMessageModel.createMessageForm.backgroundEmoji = emoji;
  }

  private validateMessageForm() {
    const messageValid = this.validateMessage();
    const emojiValid = this.validateMessageEmoji();

    return messageValid && emojiValid;
  }

  private validateMessage() {
    const messageInputValidity =
      this.createMojiMessageView.getMessageInputValidity();

    if (messageInputValidity.valueMissing) {
      this.createMojiMessageView.setMessageInputInvalid();
      this.createMojiMessageView.setMessageInputErrorMessage(
        'Please enter a message.'
      );
      return false;
    }

    if (!messageInputValidity.valid) {
      this.createMojiMessageView.setMessageInputInvalid();
      this.createMojiMessageView.setMessageInputErrorMessage(
        'Invalid message.'
      );
      return false;
    }

    this.createMojiMessageView.setMessageInputValid();
    this.createMojiMessageView.clearMessageInputErrorMessage();

    return true;
  }

  private validateMessageEmoji() {
    if (!this.createMojiMessageModel.createMessageForm.messageEmoji) {
      this.createMojiMessageView.setMessageEmojiPickerInvalid();
      this.createMojiMessageView.setMessageEmojiPickerErrorMessage(
        'Please select an emoji.'
      );
      return false;
    }

    this.createMojiMessageView.setMessageEmojiPickerValid();
    this.createMojiMessageView.clearMessageEmojiPickerErrorMessage();

    return true;
  }
}
