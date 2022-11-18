import {
  createMojiMessage as createMojiMessageBase,
  CreateMojiMessageRequest,
  CreateMojiMessageStore,
} from '../../domain';

export type CreateMojiMessageForm = {
  message?: string;
  messageEmoji?: string;
  backgroundEmoji?: string;
};

export class CreateMojiMessageModel {
  get createMessageForm() {
    return this._createMessageForm;
  }

  constructor(
    private createMojiMessageStore: CreateMojiMessageStore,
    private _createMessageForm: CreateMojiMessageForm = {}
  ) {}

  createMojiMessage() {
    const createMojiMessageRequest = {
      message: this.createMessageForm.message ?? '',
      messageEmoji: this.createMessageForm.messageEmoji ?? '',
      backgroundEmoji: this.createMessageForm.backgroundEmoji ?? '',
    };

    const mojiMessage = createMojiMessageBase(createMojiMessageRequest);
    this.logCreateMojiMessageEvent(createMojiMessageRequest);

    this.createMojiMessageStore.currentMojiMessageRequest =
      createMojiMessageRequest;

    return mojiMessage;
  }

  private logCreateMojiMessageEvent(
    createMessageRequest: CreateMojiMessageRequest
  ) {
    window.dataLayer?.push({
      event: 'convert_message',
      message_length: createMessageRequest.message.length,
      emoji: createMessageRequest.messageEmoji,
      background_emoji: createMessageRequest.backgroundEmoji,
    });
  }
}
