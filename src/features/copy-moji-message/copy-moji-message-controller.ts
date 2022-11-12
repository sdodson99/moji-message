import { CopyMojiMessageModel } from './copy-moji-message-model';
import { CopyMojiMessageView } from './copy-moji-message-view';

const COPY_SUCCESS_DISPLAY_TIMEOUT = 2000;

export class CopyMojiMessageController {
  private copySuccessTimeout?: number;

  constructor(
    private view: CopyMojiMessageView,
    private model: CopyMojiMessageModel
  ) {
    this.view.addCopyButtonClickListener(() => {
      this.handleCopyButtonClick();
    });
  }

  private handleCopyButtonClick() {
    const mojiMessageOutput = this.view.getMojiMessageOutput();

    if (!mojiMessageOutput) {
      return;
    }

    this.model.copyMojiMessage(mojiMessageOutput);

    this.view.showCopySuccess();

    window.clearTimeout(this.copySuccessTimeout);
    this.copySuccessTimeout = window.setTimeout(() => {
      this.view.showCopyReady();
    }, COPY_SUCCESS_DISPLAY_TIMEOUT);
  }
}
