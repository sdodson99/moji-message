import copy from 'copy-to-clipboard';
import { CreateMojiMessageStore } from '../../domain';

const MARKETING_SUFFIX =
  '🚀 Powered by Moji Message (https://emoji.seandodson.com)';

export class CopyMojiMessageModel {
  constructor(private createMojiMessageStore: CreateMojiMessageStore) {}

  copyMojiMessage(mojiMessageOutput: string) {
    const mojiMessageCopyText =
      this.createMojiMessageCopyText(mojiMessageOutput);

    copy(mojiMessageCopyText);

    this.logCopyMojiMessageEvent();
  }

  private createMojiMessageCopyText(mojiMessageOutput: string) {
    return `${mojiMessageOutput}\n\n${MARKETING_SUFFIX}`;
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
