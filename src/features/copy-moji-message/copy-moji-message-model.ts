import copy from 'copy-to-clipboard';
import { CreateMojiMessageStore } from '../../domain/create-moji-message-store';

export class CopyMojiMessageModel {
  constructor(private createMojiMessageStore: CreateMojiMessageStore) {}

  copyMojiMessage(mojiMessageOutput: string) {
    copy(mojiMessageOutput);

    this.logCopyMojiMessageEvent();
  }

  private logCopyMojiMessageEvent() {
    const mojiMessageRequest =
      this.createMojiMessageStore.currentMojiMessageRequest;

    if (!mojiMessageRequest) {
      return;
    }

    window.dataLayer?.push({
      event: 'copy_message',
      message_length: mojiMessageRequest.message?.length,
      emoji: mojiMessageRequest.messageEmoji,
      background_emoji: mojiMessageRequest.backgroundEmoji,
    });
  }
}
