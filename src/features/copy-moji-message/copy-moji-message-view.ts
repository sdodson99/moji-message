export type CopyMojiMessageViewElements = {
  copyMojiMessageButton: HTMLButtonElement;
  mojiMessageOutput: HTMLElement;
  copyReadyDisplay: HTMLElement;
  copySuccessDisplay: HTMLElement;
};

export class CopyMojiMessageView {
  constructor(private elements: CopyMojiMessageViewElements) {}

  addCopyButtonClickListener(listener: () => void) {
    this.elements.copyMojiMessageButton.addEventListener('click', listener);
  }

  getMojiMessageOutput() {
    return this.elements.mojiMessageOutput.textContent;
  }

  showCopySuccess() {
    this.elements.copyReadyDisplay.classList.add('hidden');
    this.elements.copyReadyDisplay.classList.remove('flex');

    this.elements.copySuccessDisplay.classList.add('flex');
    this.elements.copySuccessDisplay.classList.remove('hidden');
  }

  showCopyReady() {
    this.elements.copySuccessDisplay.classList.add('hidden');
    this.elements.copySuccessDisplay.classList.remove('flex');

    this.elements.copyReadyDisplay.classList.add('flex');
    this.elements.copyReadyDisplay.classList.remove('hidden');
  }
}
