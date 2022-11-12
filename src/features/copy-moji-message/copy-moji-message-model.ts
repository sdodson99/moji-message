import { CreateMojiMessageRequest } from '../../domain';
import copy from 'copy-to-clipboard';

export class CopyMojiMessageModel {
  private _currentMojiMessageRequest?: CreateMojiMessageRequest;

  set currentMojiMessageRequest(value: CreateMojiMessageRequest) {
    this._currentMojiMessageRequest = value;
  }

  copyMojiMessage(mojiMessageOutput: string) {
    copy(mojiMessageOutput);

    this.logCopyMojiMessageEvent();
  }

  private logCopyMojiMessageEvent() {
    const mojiMessageRequest = this._currentMojiMessageRequest;

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
