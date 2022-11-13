import { CreateMojiMessageRequest } from './create-moji-message-request';

export class CreateMojiMessageStore {
  private _currentMojiMessageRequest?: CreateMojiMessageRequest;

  get currentMojiMessageRequest() {
    return this._currentMojiMessageRequest;
  }

  set currentMojiMessageRequest(value) {
    this._currentMojiMessageRequest = value;
  }
}
